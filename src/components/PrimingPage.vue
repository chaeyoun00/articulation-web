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

		<v-layout justify-center column class="priming-form2">
			<p class="test-title">SPT-priming</p>
			<table class="priming-table">
				<thead class="priming-table-header">
					<tr style="height: 68px">
						<td style="border-radius: 21px 0px 0px 21px">번호</td>
						<td>점화문장</td>
						<td>목표 반응</td>
						<td>대상자 반응</td>
						<td style="border-radius: 0px 21px 21px 0px">파일</td>
					</tr>
				</thead>
				<tbody v-for="i in questions.length" v-bind:key="i">
					<tr
						v-if="qtype[i - 1] !== 'word' && i != questions.length"
						class="priming-table-body"
						style="border-bottom: 1px solid #c9c9c9"
					>
						<td>{{ num[i - 1] }}</td>
						<td>{{ questions[i - 1].q_body }}</td>
						<td>{{ answers[i - 1] }}</td>
						<td style="background-color: #ffffff">
							<div class="priming-table-text">
								<input
									type="text"
									id="textarea"
									placeholder="입력"
									v-model="text[i - 1]"
								/>
							</div>
						</td>
						<td>
							<audio
								:id="questions[i - 1].q_id"
								controls
								controlsList="nodownload noplaybackrate"
								class="priming-audio"
							></audio>
						</td>
					</tr>
					<tr
						v-else-if="qtype[i - 1] !== 'word'"
						class="priming-table-body"
					>
						<td>{{ num[i - 1] }}</td>
						<td>{{ questions[i - 1].q_body }}</td>
						<td>{{ answers[i - 1] }}</td>
						<td style="background-color: #ffffff">
							<div class="priming-table-text">
								<input
									type="text"
									id="textarea"
									placeholder="입력"
									v-model="text[i - 1]"
								/>
							</div>
						</td>
						<td>
							<audio
								:id="questions[i - 1].q_id"
								controls
								controlsList="nodownload noplaybackrate"
								class="priming-audio"
							></audio>
						</td>
					</tr>
				</tbody>
			</table>
		</v-layout>

		<v-layout justify-center class="priming-form3">
			<v-btn
				depressed
				class="submit-btn"
				@click="save(), toTest()"
				:disabled="validated == 1"
				>저장</v-btn
			>
		</v-layout>
	</v-container>
</template>

<script>
	var axios = require('axios');
	const iconv = require('iconv-lite');

	export default {
		data: () => ({
			user: [
				{
					u_id: '',
				},
			],
			resId: '',
			questions: [],
			num: [],
			qtype: [],
			text: [],
			answers: [],
			primingAnswer: [],
			date: [],
			latest: '',
			idList: [],
			validated: '',
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

				const configNoImage = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/questions/noimage?type=SPT-priming',
				};

				await axios(configNoImage)
					.then((response) => {
						//console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
						//console.log(response.data.data)
						this.questions = response.data.data;
						let contents;
						for (let i = 0; i < this.questions.length; i++) {
							this.questions[i].q_body = this.questions[
								i
							].q_body.replace(/,/g, ' ');
							contents = iconv.decode(
								this.questions[i].q_data.data,
								'UTF-8'
							);
							this.qtype[i] =
								JSON.parse(contents)['type_of_question'];
							this.answers[i] = JSON.parse(contents)['answer'];
							if (this.qtype[i] === 'ex') {
								this.num[i] =
									'P' +
									JSON.parse(contents)['no'].replace(
										/(^0+)/,
										''
									);
							} else {
								this.num[i] = JSON.parse(contents)[
									'no'
								].replace(/(^0+)/, '');
							}
						}
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configAnswer = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=SPT-priming&examId=' +
						this.resId,
				};

				await axios(configAnswer)
					.then((response) => {
						let array = [];
						let index = [];
						array.push(response.data.data[0].a_question_id);
						index.push(0);
						for (let i = 0; i < response.data.data.length; i++) {
							var top = array[array.length - 1];
							if (top === response.data.data[i].a_question_id) {
								array.pop();
								index.pop();
							}
							array.push(response.data.data[i].a_question_id);
							index.push(i);
						}

						var uint8;
						var audio;
						for (let i = 0; i < index.length; i++) {
							uint8 = new Uint8Array(
								response.data.data[index[i]].a_data.data
							);
							var blob = new Blob([uint8], { type: 'audio' });
							var blobUrl = URL.createObjectURL(blob);
							audio = document.getElementById(
								response.data.data[index[i]].a_question_id
							);
							audio.src = blobUrl;
							this.idList.push(
								response.data.data[index[i]].a_question_id
							);
						}
						//console.log(this.audioURL)
					})
					.catch((error) => {});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=SPT-priming&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.primingAnswer = response.data.data;
						this.text = response.data.data[0].lg_answer
							.slice(1, -1)
							.split(',');
						this.validated = 0;
					})
					.catch((error) => {
						this.validated = 1;
					});
			},
			save() {
				for (let i = 0; i < this.text.length; i++) {
					if (!this.text[i]) {
						this.text[i] = '';
					}
				}

				//console.log(this.text)

				const data = {
					id: this.primingAnswer[0].lg_summery_id,
					answers: '[' + this.text + ']',
				};

				var config = {
					method: 'put',
					url: this.$API_SERVER + '/api/languageSummary',
					headers: {
						memberId: localStorage.getItem('Id'),
						//'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: data,
				};

				axios(config)
					.then(function (response) {
						console.log(JSON.stringify(response.data));
					})
					.catch(function (error) {
						console.log(error);
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

				const configAnswer = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=SPT-priming&examId=' +
						this.resId,
				};

				await axios(configAnswer)
					.then((response) => {
						console.log(response.data.data);
						let array = [];
						let index = [];
						array.push(response.data.data[0].a_question_id);
						index.push(0);
						for (let i = 0; i < response.data.data.length; i++) {
							var top = array[array.length - 1];
							if (top === response.data.data[i].a_question_id) {
								array.pop();
								index.pop();
							}
							array.push(response.data.data[i].a_question_id);
							index.push(i);
						}

						var uint8;
						var audio;

						for (let j = 0; j < this.idList.length; j++) {
							audio = document.getElementById(this.idList[j]);
							audio.src = '';
						}
						this.idList = [];

						for (let i = 0; i < index.length; i++) {
							uint8 = new Uint8Array(
								response.data.data[index[i]].a_data.data
							);
							var blob = new Blob([uint8], { type: 'audio' });
							var blobUrl = URL.createObjectURL(blob);
							audio = document.getElementById(
								response.data.data[index[i]].a_question_id
							);
							audio.src = blobUrl;
							this.idList.push(
								response.data.data[index[i]].a_question_id
							);
						}
						//console.log(this.audioURL)
					})
					.catch((error) => {
						var audio;
						for (let j = 0; j < this.idList.length; j++) {
							audio = document.getElementById(this.idList[j]);
							audio.src = '';
						}
						this.idList = [];
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=SPT-priming&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.primingAnswer = response.data.data;
						this.text = response.data.data[0].lg_answer
							.slice(1, -1)
							.split(',');
						this.validated = 0;
					})
					.catch((error) => {
						this.text = [];
						this.validated = 1;
					});
			},
		},
	};
</script>

<style>
	.priming-form2 {
		padding-top: 48px;
		padding-left: 165px;
		padding-right: 166px;
	}

	.priming-form3 {
		padding-top: 90px;
		padding-left: 165px;
		padding-right: 166px;
		padding-bottom: 90px;
	}

	table.priming-table {
		background-color: #fafafa;
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 1044px;
		margin-right: 60px;
		border-radius: 21px;
	}

	thead.priming-table-header {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
	}

	tr.priming-table-body {
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 18px;
		letter-spacing: 0px;
		text-align: center;
		height: 68px;
	}

	.priming-table-text input[type='text'] {
		text-align: center;
		width: 240px;
	}

	.priming-table-text input[type='text']:focus {
		outline: none;
	}

	.priming-audio {
		width: 220px;
	}

	.priming-audio::-webkit-media-controls-panel {
		background-color: #fafafa;
		padding-left: 0px;
		padding-right: 0px;
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
