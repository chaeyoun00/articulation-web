<template>
	<v-container>
		<v-layout class="back-form">
			<v-btn text @click="toTest()"
				><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
			</v-btn>
		</v-layout>

		<v-layout justify-center column class="patient-card">
			<v-card
				class="patient-inform"
				style="width: 1044px; margin-bottom: 50px"
			>
				<v-card-text>
					<table class="patient-table">
						<tr class="patient-table-header">
							<td>성명</td>
							<td>성별</td>
							<td>생년월일 </td>
							<td>전화번호</td>
							<td>병록번호</td>
							<td>유입</td>
						</tr>
						<tr class="patient-table-body">
							<td>{{ user[0].u_name }}</td>
							<td>{{ user[0].u_sex }}</td>
							<td>{{ user[0].u_birth }}</td>
							<td>{{ user[0].u_telephone }}</td>
							<td>{{ user[0].u_chart_number }}</td>
							<td>{{ user[0].u_enter_path }}</td>
						</tr>
						<tr class="patient-table-header">
							<td>인지검사일</td>
							<td>KBASE2</td>
							<td>청각검사일 </td>
							<td>언어검사일</td>
							<td>학력</td>
							<td>비고</td>
						</tr>
						<tr class="patient-table-body">
							<td>{{ user[0].u_cog_test }}</td>
							<td>{{ user[0].u_kbase_test }}</td>
							<td>{{ user[0].u_listen_test }}</td>
							<td>{{ user[0].u_lang_test }}</td>
							<td>{{ user[0].u_study_year }}</td>
							<td>{{ user[0].u_blank }}</td>
						</tr>
					</table>
				</v-card-text>
			</v-card>

			<v-select
				solo
				flat
				class="date-select"
				:label="latest"
				:items="date"
				@change="handleChange"
			>
			</v-select>
		</v-layout>

		<v-divider></v-divider>

		<v-layout justify-center column class="com-form2">
			<p class="test-title">SCT-COM</p>
			<table class="com-table">
				<tr>
					<td
						class="com-table-header"
						style="border-radius: 21px 0px 0px 21px"
						>ID</td
					>
					<td class="com-table-header">Sentence</td>
					<td class="com-table-header">Answer</td>
					<td
						class="com-table-header"
						style="border-radius: 0px 21px 21px 0px"
						>Score</td
					>
				</tr>

				<tbody v-for="i in questions.length" v-bind:key="i">
					<tr
						v-if="qtype[i - 1] !== 'word' && i != questions.length"
						style="border-bottom: 1px solid #c9c9c9"
					>
						<td class="com-table-content">{{ num[i - 1] }}</td>
						<td
							class="com-table-content"
							style="background-color: #f5f5f5"
							>{{ questions[i - 1].q_body }}</td
						>
						<td class="com-table-content">{{
							questions[i - 1].answers
						}}</td>
						<td class="com-table-content">{{
							questions[i - 1].score
						}}</td>
					</tr>
					<tr v-else-if="qtype[i - 1] !== 'word'">
						<td class="com-table-content">{{ num[i - 1] }}</td>
						<td
							class="com-table-content"
							style="background-color: #f5f5f5"
							>{{ questions[i - 1].q_body }}</td
						>
						<td class="com-table-content">{{
							questions[i - 1].answers
						}}</td>
						<td class="com-table-content">{{
							questions[i - 1].score
						}}</td>
					</tr>
				</tbody>
				<tbody>
					<td colspan="3" class="com-table-end1">총점</td>
					<td class="com-table-end2">{{ score }} / {{ count }}</td>
				</tbody>
			</table>
		</v-layout>

		<v-layout justify-center class="com-form3">
			<v-btn depressed class="submit-btn" @click="toTest()">확인</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		data: () => ({
			user: [
				{
					u_id: '',
				},
			],
			resId: '',
			count: '',
			score: '',
			picked: [],
			questions: [],
			num: [],
			qtype: [],
			comAnswers: [],
			date: [],
			latest: '',
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			toTest() {
				Object.assign(this.$data, this.$options.data());
				this.$router.push('/language');
			},
			async initialize() {
				const configRecent = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/examReservations/recent?userId=' +
						this.$route.query.patient,
				};
				await axios(configRecent)
					.then((response) => {
						this.resId =
							response.data.data[
								response.data.data.length - 1
							].e_id;
						for (let i = 0; i < response.data.data.length; i++) {
							this.date.push(response.data.data[i].e_date);
						}
						this.latest = this.date[this.date.length - 1];
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configUser = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/examUsers?id=' +
						this.$route.query.patient,
				};
				await axios(configUser)
					.then((response) => {
						//console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
						//console.log(response.data.data)
						this.user = response.data.data;
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=SCT-COM&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.comAnswers = response.data.data[0].lg_answer
							.split(',')
							.splice(1);
					})
					.catch((error) => {
						this.comAnswers = [];
					});

				const configNoImage = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/questions/noimage?type=SCT-COM',
				};
				await axios(configNoImage)
					.then((response) => {
						this.questions = response.data.data;
						//console.log(this.questions)

						let j = 0;
						this.count = 0;
						this.score = 0;
						for (let i = 0; i < this.questions.length; i++) {
							this.questions[i].q_body = this.questions[
								i
							].q_body.replace(/,/g, ' ');
							this.questions[i].q_data = String.fromCharCode(
								...this.questions[i].q_data.data
							);
							this.qtype[i] = JSON.parse(
								this.questions[i].q_data
							)['type_of_question'];
							if (this.qtype[i] === 'ex') {
								this.num[i] =
									'P' +
									JSON.parse(this.questions[i].q_data)[
										'no'
									].replace(/(^0+)/, '');
								this.questions[i].answers = this.comAnswers[j];
								if (
									JSON.parse(this.questions[i].q_data)[
										'answer'
									] === this.comAnswers[j]
								) {
									this.questions[i].score = '1';
								} else {
									this.questions[i].score = '0';
								}
								j += 1;
							} else if (this.qtype[i] === 'qt') {
								this.count += 1;
								this.num[i] = JSON.parse(
									this.questions[i].q_data
								)['no'].replace(/(^0+)/, '');
								this.questions[i].answers = this.comAnswers[j];
								if (
									JSON.parse(this.questions[i].q_data)[
										'answer'
									] === this.comAnswers[j]
								) {
									this.questions[i].score = '1';
									this.score += 1;
								} else {
									this.questions[i].score = '0';
								}
								j += 1;
							}
						}
					})
					.catch((error) => {
						console.log(error.response);
					});
			},
			async handleChange(event) {
				const configRecent = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/examReservations/recent?userId=' +
						this.$route.query.patient +
						'&date=' +
						event,
				};
				await axios(configRecent)
					.then((response) => {
						this.resId = response.data.data[0].e_id;
					})
					.catch((error) => {
						console.log(error);
					});
				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=SCT-COM&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};
				await axios(configSummary)
					.then((response) => {
						this.comAnswers = response.data.data[0].lg_answer
							.split(',')
							.splice(1);
					})
					.catch((error) => {
						this.comAnswers = [];
					});
				const configNoImage = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/questions/noimage?type=SCT-COM',
				};
				await axios(configNoImage)
					.then((response) => {
						this.questions = response.data.data;
						//console.log(this.questions)

						let j = 0;
						this.count = 0;
						this.score = 0;
						for (let i = 0; i < this.questions.length; i++) {
							this.questions[i].q_body = this.questions[
								i
							].q_body.replace(/,/g, ' ');
							this.questions[i].q_data = String.fromCharCode(
								...this.questions[i].q_data.data
							);
							this.qtype[i] = JSON.parse(
								this.questions[i].q_data
							)['type_of_question'];
							if (this.qtype[i] === 'ex') {
								this.num[i] =
									'P' +
									JSON.parse(this.questions[i].q_data)[
										'no'
									].replace(/(^0+)/, '');
								this.questions[i].answers = this.comAnswers[j];
								if (
									JSON.parse(this.questions[i].q_data)[
										'answer'
									] === this.comAnswers[j]
								) {
									this.questions[i].score = '1';
								} else {
									this.questions[i].score = '0';
								}
								j += 1;
							} else if (this.qtype[i] === 'qt') {
								this.count += 1;
								this.num[i] = JSON.parse(
									this.questions[i].q_data
								)['no'].replace(/(^0+)/, '');
								this.questions[i].answers = this.comAnswers[j];
								if (
									JSON.parse(this.questions[i].q_data)[
										'answer'
									] === this.comAnswers[j]
								) {
									this.questions[i].score = '1';
									this.score += 1;
								} else {
									this.questions[i].score = '0';
								}
								j += 1;
							}
						}
					})
					.catch((error) => {
						console.log(error.response);
					});
			},
		},
	};
</script>

<style>
	.com-form2 {
		padding-top: 48px;
		padding-left: 177px;
		padding-right: 178px;
	}

	.com-form3 {
		padding-top: 90px;
		padding-left: 177px;
		padding-right: 178px;
		padding-bottom: 90px;
	}

	table.com-table {
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 1044px;
		margin-right: 60px;
		border-radius: 21px;
	}

	td.com-table-header {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
		height: 68px;
	}

	td.com-table-content {
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
		height: 60px;
	}

	td.com-table-end1 {
		background-color: #e8e8e8;
		color: #333333;
		font-family: 'Noto Sans KR Bold';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
		height: 68px;
		border-radius: 0px 0px 0px 21px;
	}

	td.com-table-end2 {
		background-color: #f4f4f4;
		color: #333333;
		font-family: 'Noto Sans KR Bold';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
		height: 68px;
		border-radius: 0px 0px 21px 0px;
	}

	.date-select.theme--light.v-text-field--solo
		> .v-input__control
		> .v-input__slot {
		width: 453px;
		height: 49px;
		border: 2px solid #e2e2e2;
		border-radius: 8px;
	}
</style>
