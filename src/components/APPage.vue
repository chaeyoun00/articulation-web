<template>
	<v-container>
		<v-layout class="back-form">
			<v-btn text @click="toTest()"
				><img :src="backIcon" width="45px" />
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

		<v-layout justify-center column class="ap-form2">
			<p class="test-title">SCT-AP</p>
			<table class="ap-table">
				<thead>
					<tr>
						<td
							colspan="3"
							class="ap-table-header"
							style="border-radius: 21px 0px 0px 0px"
						></td>
						<td
							colspan="12"
							class="ap-table-header"
							style="border-radius: 0px 21px 0px 0px"
							>대상자 반응</td
						>
					</tr>
					<tr>
						<td colspan="3" class="ap-table-header"></td>
						<td
							colspan="2"
							class="ap-table-header1"
							style="
								border-right: 1px solid #c9c9c9;
								border-bottom: 1px solid #c9c9c9;
							"
							>A2_C</td
						>
						<td
							colspan="2"
							class="ap-table-header1"
							style="
								border-right: 1px solid #c9c9c9;
								border-bottom: 1px solid #c9c9c9;
							"
							>A2_NC</td
						>
						<td
							colspan="2"
							class="ap-table-header1"
							style="
								border-right: 1px solid #c9c9c9;
								border-bottom: 1px solid #c9c9c9;
							"
							>A3_C</td
						>
						<td
							colspan="2"
							class="ap-table-header1"
							style="
								border-right: 1px solid #c9c9c9;
								border-bottom: 1px solid #c9c9c9;
							"
							>A3_NC</td
						>
						<td
							colspan="2"
							class="ap-table-header1"
							style="
								border-right: 1px solid #c9c9c9;
								border-bottom: 1px solid #c9c9c9;
							"
							>P_C</td
						>
						<td
							colspan="2"
							class="ap-table-header1"
							style="border-bottom: 1px solid #c9c9c9"
							>P_NC</td
						>
					</tr>
					<tr>
						<td
							class="ap-table-header"
							style="border-radius: 0px 0px 0px 21px"
							>번호</td
						>
						<td class="ap-table-header" style="width: 310px"
							>문장</td
						>
						<td class="ap-table-header">정답</td>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>1st</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>반복</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>1st</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>반복</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>1st</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>반복</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>1st</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>반복</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>1st</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>반복</td
						>
						<td
							class="ap-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>1st</td
						>
						<td
							class="ap-table-header1"
							style="border-radius: 0px 0px 21px 0px"
							>반복</td
						>
					</tr>
				</thead>

				<tbody v-for="i in questions.length" v-bind:key="i">
					<tr style="border-bottom: 1px solid #c9c9c9">
						<td class="ap-table-content">{{ num[i - 1] }}</td>
						<td class="ap-table-content">{{
							questions[i - 1].q_body
						}}</td>
						<td class="ap-table-content">{{ apAnswer[i - 1] }}</td>
						<td
							v-if="questions[i - 1].questiontype === '1'"
							class="ap-table-content1"
						>
							{{ first[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '1'"
							class="ap-table-content1"
						>
							{{ repeat[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '2'"
							class="ap-table-content1"
						>
							{{ first[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '2'"
							class="ap-table-content1"
						>
							{{ repeat[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '3'"
							class="ap-table-content1"
						>
							{{ first[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '3'"
							class="ap-table-content1"
						>
							{{ repeat[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '4'"
							class="ap-table-content1"
						>
							{{ first[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '4'"
							class="ap-table-content1"
						>
							{{ repeat[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '5'"
							class="ap-table-content1"
						>
							{{ first[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '5'"
							class="ap-table-content1"
						>
							{{ repeat[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '6'"
							class="ap-table-content1"
						>
							{{ first[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
						<td
							v-if="questions[i - 1].questiontype === '6'"
							class="ap-table-content1"
						>
							{{ repeat[i - 1] }} </td
						><td v-else class="ap-table-blank"></td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td class="ap-table-end" colspan="3"
							>문장유형별 점수</td
						>
						<td class="ap-table-content1"
							>{{ score[0] }} / {{ scores[0] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[1] }} / {{ scores[1] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[2] }} / {{ scores[2] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[3] }} / {{ scores[3] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[4] }} / {{ scores[4] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[5] }} / {{ scores[5] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[6] }} / {{ scores[6] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[7] }} / {{ scores[7] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[8] }} / {{ scores[8] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[9] }} / {{ scores[9] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[10] }} / {{ scores[10] }}</td
						>
						<td class="ap-table-content1"
							>{{ score[11] }} / {{ scores[11] }}</td
						>
					</tr>
					<tr>
						<td class="ap-table-end" colspan="3">총점</td>
						<td class="ap-table-end1" colspan="12"
							>{{ firstscore }} / {{ count }}</td
						>
					</tr>
					<tr>
						<td
							class="ap-table-end"
							colspan="3"
							style="border-radius: 0px 0px 0px 21px"
							>반복포함 총점</td
						>
						<td
							class="ap-table-end1"
							colspan="12"
							style="border-radius: 0px 0px 21px 0px"
							>{{ totalscore }} / {{ count }}</td
						>
					</tr>
				</tbody>
			</table>
		</v-layout>

		<v-layout justify-center class="ap-form3">
			<v-btn depressed class="submit-btn" @click="toTest()">확인</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
	var axios = require('axios');

	export default {
		data: () => ({
			user: [
				{
					u_id: '',
				},
			],
			resId: '',
			count: '',
			firstscore: '',
			totalscore: '',
			questions: [],
			num: [],
			qtype: [],
			picked: [],
			apAnswer: [],
			scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			first: [],
			repeat: [],
			date: [],
			latest: '',
			backIcon: require('../assets/back_icon.svg')
		}),
		created() {
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
						//console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
						console.log(response.data.data);
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
						console.log(error);
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
						this.user = response.data.data;
						//console.log(this.user)
					})
					.catch((error) => {
						console.log(error);
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=SCT-AP&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.apAnswer = response.data.data[0].lg_answer
							.split(',')
							.splice(1);
					})
					.catch((error) => {
						this.apAnswer = [];
					});

				const configNoImage = {
					method: 'get',
					url:
						this.$API_SERVER + '/api/questions/noimage?type=SCT-AP',
				};

				await axios(configNoImage)
					.then((response) => {
						this.questions = response.data.data;

						this.count = 0;
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
							if (this.qtype[i] === 'word') {
								this.questions.splice(i, 1);
								i -= 1;
								continue;
							}

							this.questions[i].questiontype =
								String.fromCharCode(
									...[this.questions[i].q_data3.data[3]]
								);
							if (this.qtype[i] === 'ex') {
								this.num[i] =
									'P' +
									JSON.parse(this.questions[i].q_data)[
										'no'
									].replace(/(^0+)/, '');
							} else if (this.qtype[i] === 'qt') {
								this.scores[
									this.questions[i].questiontype * 2 - 1
								] += 1; // 1, 3, 5, 7, 9, 11
								this.scores[
									this.questions[i].questiontype * 2 - 2
								] += 1; // 0, 2, 4, 6, 8, 10
								this.count += 1;
								this.num[i] = JSON.parse(
									this.questions[i].q_data
								)['no'].replace(/(^0+)/, '');
							}
							if (
								JSON.parse(this.questions[i].q_data)[
									'answer'
								] === this.apAnswer[i]
							) {
								this.questions[i].score = '1';
							} else {
								this.questions[i].score = '0';
							}
						}
					})
					.catch((error) => {
						console.log(error);
					});

				const configAnswer = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=SCT-AP&userId=' +
						this.user[0].u_id +
						'&examId=' +
						this.resId,
				};

				await axios(configAnswer)
					.then((response) => {
						let j = 0;
						let array = [];

						this.firstscore = 0;
						this.totalscore = 0;
						this.score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						array.push(response.data.data[0].a_question_id);
						for (let i = 1; i < response.data.data.length; i++) {
							var top = array[array.length - 1];
							if (top !== response.data.data[i].a_question_id) {
								if (this.questions[j].score === '1') {
									this.first.push('1');
									if (this.qtype[j] === 'qt') {
										this.score[
											this.questions[j].questiontype * 2 -
												2
										] += 1;
										this.firstscore += 1;
										this.totalscore += 1;
									}
								} else this.first.push('0');
								this.repeat.push('');
								j += 1;

								array.push(response.data.data[i].a_question_id);
								if (i === response.data.data.length - 1) {
									if (this.questions[j].score === '1') {
										this.first.push('1');
										if (this.qtype[j] === 'qt') {
											this.score[
												this.questions[j].questiontype *
													2 -
													2
											] += 1;
											this.firstscore += 1;
											this.totalscore += 1;
										}
									} else this.first.push('0');
									this.repeat.push('');
								}
							} else {
								if (this.questions[j].score === '1') {
									this.repeat.push('1');
									if (this.qtype[j] === 'qt') {
										this.score[
											this.questions[j].questiontype * 2 -
												1
										] += 1;
										this.totalscore += 1;
									}
								} else this.repeat.push('0');
								this.first.push('');
								j += 1;
							}
						}
					})
					.catch((error) => {
						//console.log(error)
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
						'/api/languageSummary?type=SCT-AP&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.apAnswer = response.data.data[0].lg_answer
							.split(',')
							.splice(1);
					})
					.catch((error) => {
						this.apAnswer = [];
					});
				const configNoImage = {
					method: 'get',
					url:
						this.$API_SERVER + '/api/questions/noimage?type=SCT-AP',
				};
				await axios(configNoImage)
					.then((response) => {
						this.questions = response.data.data;

						this.count = 0;
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
							if (this.qtype[i] === 'word') {
								this.questions.splice(i, 1);
								i -= 1;
								continue;
							}

							this.questions[i].questiontype =
								String.fromCharCode(
									...[this.questions[i].q_data3.data[3]]
								);
							if (this.qtype[i] === 'ex') {
								this.num[i] =
									'P' +
									JSON.parse(this.questions[i].q_data)[
										'no'
									].replace(/(^0+)/, '');
							} else if (this.qtype[i] === 'qt') {
								this.count += 1;
								this.num[i] = JSON.parse(
									this.questions[i].q_data
								)['no'].replace(/(^0+)/, '');
							}
							if (
								JSON.parse(this.questions[i].q_data)[
									'answer'
								] === this.apAnswer[i]
							) {
								this.questions[i].score = '1';
							} else {
								this.questions[i].score = '0';
							}
						}
					})
					.catch((error) => {
						console.log(error);
					});

				const configAnswer = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=SCT-AP&userId=' +
						this.user[0].u_id +
						'&examId=' +
						this.resId,
				};

				await axios(configAnswer)
					.then((response) => {
						let j = 0;
						let array = [];

						this.first = [];
						this.repeat = [];
						this.firstscore = 0;
						this.totalscore = 0;
						this.score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						array.push(response.data.data[0].a_question_id);
						for (let i = 1; i < response.data.data.length; i++) {
							var top = array[array.length - 1];
							if (top !== response.data.data[i].a_question_id) {
								if (this.questions[j].score === '1') {
									this.first.push('1');
									if (this.qtype[j] === 'qt') {
										this.score[
											this.questions[j].questiontype * 2 -
												2
										] += 1;
										this.firstscore += 1;
										this.totalscore += 1;
									}
								} else this.first.push('0');
								this.repeat.push('');
								j += 1;

								array.push(response.data.data[i].a_question_id);
								if (i === response.data.data.length - 1) {
									if (this.questions[j].score === '1') {
										this.first.push('1');
										if (this.qtype[j] === 'qt') {
											this.score[
												this.questions[j].questiontype *
													2 -
													2
											] += 1;
											this.firstscore += 1;
											this.totalscore += 1;
										}
									} else this.first.push('0');
									this.repeat.push('');
								}
							} else {
								if (this.questions[j].score === '1') {
									this.repeat.push('1');
									if (this.qtype[j] === 'qt') {
										this.score[
											this.questions[j].questiontype * 2 -
												1
										] += 1;
										this.totalscore += 1;
									}
								} else this.repeat.push('0');
								this.first.push('');
								j += 1;
							}
						}
					})
					.catch((error) => {
						//console.log(error)
					});
			},
		},
	};
</script>

<style>
	.ap-form2 {
		padding-top: 48px;
		padding-left: 165px;
		padding-right: 166px;
	}

	.ap-form3 {
		padding-top: 90px;
		padding-left: 165px;
		padding-right: 166px;
		padding-bottom: 90px;
	}

	.language-select.theme--light.v-text-field--solo
		> .v-input__control
		> .v-input__slot {
		width: 495px;
		height: 46px;
		border: 2px solid #e2e2e2;
		border-radius: 8px;
	}

	table.ap-table {
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 1044px;
		margin-right: 60px;
		border-radius: 21px;
	}

	td.ap-table-header {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
		height: 50px;
	}

	td.ap-table-header1 {
		background-color: #fafafa;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
	}

	td.ap-table-content {
		background-color: #fafafa;
		font-family: 'Noto Sans KR Regular';
		font-size: 16px;
		letter-spacing: 0px;
		height: 60px;
		text-align: center;
	}

	td.ap-table-content1 {
		font-family: 'Noto Sans KR Regular';
		font-size: 16px;
		letter-spacing: 0px;
		height: 60px;
		text-align: center;
	}

	td.ap-table-end {
		background-color: #e8e8e8;
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
		height: 60px;
	}

	td.ap-table-end1 {
		background-color: #f4f4f4;
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
		height: 60px;
	}

	td.ap-table-blank {
		background-color: #f4f4f4;
	}

	div.ap-radio {
		display: inline-flex;
		align-items: center;
	}

	.ap-radio input[type='radio'] {
		appearance: none;
	}

	.ap-radio input[type='radio'] {
		display: inline;
		width: 33px;
		height: 33px;
		margin-top: 8px;
		border-radius: 50%;
		border: 1px solid #e8e8e8;
		margin-left: 12px;
	}

	.ap-radio input[type='radio']:checked {
		appearance: none;
	}

	.ap-radio input[type='radio']:checked {
		width: 33px;
		height: 33px;
		border: 1px solid #707070;
		border-radius: 50%;
		background-color: #707070;
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
