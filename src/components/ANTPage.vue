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

		<v-layout justify-center column class="ant-form2">
			<p class="test-title">ANT</p>
			<table class="ant-table">
				<colgroup>
					<col width="10%" />
					<col width="15%" />
					<col width="15%" />
					<col width="10%" />
					<col width="10%" />
					<col width="10%" />
					<col width="10%" />
					<col width="20%" />
				</colgroup>
				<thead>
					<tr>
						<td
							class="ant-table-header"
							style="border-radius: 21px 0px 0px 21px"
							>#</td
						>
						<td class="ant-table-header" style="width: 80px"
							>논항</td
						>
						<td class="ant-table-header" style="width: 200px"
							>목표동사</td
						>
						<td
							class="ant-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>IE</td
						>
						<td
							class="ant-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>IU</td
						>
						<td
							class="ant-table-header1"
							style="border-right: 1px solid #c9c9c9"
							>2</td
						>
						<td class="ant-table-header1">3</td>
						<td
							class="ant-table-header"
							style="border-radius: 0px 21px 21px 0px"
							>파일</td
						>
					</tr>
				</thead>

				<tbody v-for="i in questions.length" v-bind:key="i">
					<tr style="border-bottom: 1px solid #c9c9c9">
						<td
							class="ant-table-content"
							style="background-color: #fafafa"
							>{{ i }}</td
						>
						<td
							class="ant-table-content"
							style="background-color: #fafafa"
						>
							{{ num[i - 1] }}
						</td>
						<td
							class="ant-table-content"
							style="background-color: #fafafa"
							>{{ questions[i - 1].q_body }}</td
						>
						<td v-if="questions[i - 1].questiontype === '1'">
							<div class="ant-check" style="width: 100%"
								><input
									style="display: none"
									type="checkbox"
									:id="i"
									@change="calculate(i)" /><label
									:for="i"
								></label
							></div> </td
						><td v-else class="ant-table-blank"></td>
						<td v-if="questions[i - 1].questiontype === '2'">
							<div class="ant-check" style="width: 100%"
								><input
									style="display: none"
									type="checkbox"
									:id="i"
									@change="calculate(i)" /><label
									:for="i"
								></label
							></div> </td
						><td v-else class="ant-table-blank"></td>
						<td v-if="questions[i - 1].questiontype === '3'">
							<div class="ant-check" style="width: 100%"
								><input
									style="display: none"
									type="checkbox"
									:id="i"
									@change="calculate(i)" /><label
									:for="i"
								></label
							></div> </td
						><td v-else class="ant-table-blank"></td>
						<td v-if="questions[i - 1].questiontype === '4'">
							<div class="ant-check" style="width: 100%"
								><input
									style="display: none"
									type="checkbox"
									:id="i"
									@change="calculate(i)" /><label
									:for="i"
								></label
							></div> </td
						><td v-else class="ant-table-blank"></td>
						<td class="ant-table-content" style="width: 300px">
							<audio
								:id="questions[i - 1].q_id"
								controls
								controlsList="nodownload noplaybackrate"
								class="ant-audio"
							></audio>
						</td>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td class="ant-table-end" colspan="3">논항 별 합계</td>
						<td class="ant-table-end1"
							><p id="score1" style="display: inline"></p> /
							{{ scores[0] }}</td
						>
						<td class="ant-table-end1"
							><p id="score2" style="display: inline"></p> /
							{{ scores[1] }}</td
						>
						<td class="ant-table-end1"
							><p id="score3" style="display: inline"></p> /
							{{ scores[2] }}</td
						>
						<td class="ant-table-end1"
							><p id="score4" style="display: inline"></p> /
							{{ scores[3] }}</td
						>
						<td></td>
					</tr>
					<tr>
						<td
							class="ant-table-end"
							colspan="3"
							style="border-radius: 0px 0px 0px 21px"
							>총합</td
						>
						<td class="ant-table-end2" colspan="4"
							><p id="score5" style="display: inline"></p> /
							{{ count }}</td
						>
						<td
							class="ant-table-end2"
							style="border-radius: 0px 0px 21px 0px"
						></td>
					</tr>
				</tbody>
			</table>
		</v-layout>

		<v-layout justify-center class="ant-form3">
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

	export default {
		data: () => ({
			user: [
				{
					u_id: '',
				},
			],
			count: '',
			questions: [],
			picked: [],
			num: [],
			resId: '',
			antAnswer: [],
			score: [0, 0, 0, 0],
			scores: [0, 0, 0, 0],
			date: [],
			latest: '',
			idList: [],
			validated: '',
			backIcon: require('../assets/back_icon.svg'),
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			async initialize() {
				const config = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/examReservations/recent?userId=' +
						this.$route.query.patient,
				};
				await axios(config)
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
						this.user = response.data.data;
						//console.log(this.user)
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configNoImage = {
					method: 'get',
					url: this.$API_SERVER + '/api/questions/noimage?type=ANT',
				};
				await axios(configNoImage)
					.then((response) => {
						//console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
						//console.log(response.data.data)
						this.count = 0;
						this.questions = response.data.data;
						for (let i = 0; i < this.questions.length; i++) {
							this.questions[i].q_data = String.fromCharCode(
								...this.questions[i].q_data.data
							);
							if (
								JSON.parse(this.questions[i].q_data)[
									'type_of_question'
								] === 'word'
							) {
								this.questions.splice(i, 1);
								i -= 1;
								continue;
							}

							this.questions[i].questiontype =
								String.fromCharCode(
									...[this.questions[i].q_data3.data[3]]
								);
							if (
								JSON.parse(this.questions[i].q_data)[
									'type_of_question'
								] === 'ex'
							) {
								this.num[i] =
									'P' +
									JSON.parse(this.questions[i].q_data)[
										'no'
									].replace(/(^0+)/, '');
							} else {
								this.num[i] = JSON.parse(
									this.questions[i].q_data
								)['no'].replace(/(^0+)/, '');
								this.scores[
									this.questions[i].questiontype - 1
								] += 1;
								this.count += 1;
							}
						}
						//console.log(String.fromCharCode(...this.questions[0].q_data.data).split("\"")[11])
					})
					.catch((error) => {
						console.log(error);
					});

				const configAnswer = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=ANT&examId=' +
						this.resId,
				};
				await axios(configAnswer)
					.then((response) => {
						var uint8;
						var audio;
						for (let i = 0; i < response.data.data.length; i++) {
							uint8 = new Uint8Array(
								response.data.data[i].a_data.data
							);
							var blob = new Blob([uint8], { type: 'audio' });
							var blobUrl = URL.createObjectURL(blob);
							audio = document.getElementById(
								response.data.data[i].a_question_id
							);
							audio.src = blobUrl;
							this.idList.push(
								response.data.data[i].a_question_id
							);
						}
					})
					.catch((error) => {
						//console.log(error.response)
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=ANT&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};
				await axios(configSummary)
					.then((response) => {
						this.antAnswer = response.data.data;
						//console.log(this.antAnswer[0].lg_answer)
						this.picked = this.antAnswer[0].lg_answer
							.slice(1, -1)
							.split(',');
						for (let i = 1; i < this.picked.length; i++) {
							if (this.picked[i] === '1') {
								document.getElementById(i).checked = true;
								this.score[
									this.questions[i - 1].questiontype - 1
								] += 1;
							} else if (this.picked[i] === '0') {
								document.getElementById(i).checked = false;
							}
						}
						this.validated = 0;
					})
					.catch((error) => {
						this.validated = 1;
					});

				document.getElementById('score1').innerText = this.score[0];
				document.getElementById('score2').innerText = this.score[1];
				document.getElementById('score3').innerText = this.score[2];
				document.getElementById('score4').innerText = this.score[3];
				document.getElementById('score5').innerText =
					this.score[0] +
					this.score[1] +
					this.score[2] +
					this.score[3];
			},
			toTest() {
				Object.assign(this.$data, this.$options.data());
				this.$router.push('/language');
			},
			save() {
				for (let i = 1; i <= this.questions.length; i++) {
					if (document.getElementById(i) === null) {
						this.picked[i] = '-1';
					} else if (document.getElementById(i).checked) {
						this.picked[i] = '1';
					} else this.picked[i] = '0';
				}
				//console.log(this.picked)
				const data = {
					id: this.antAnswer[0].lg_summery_id,
					answers: '[' + this.picked + ']',
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
			calculate(item) {
				if (document.getElementById(item).checked) {
					this.score[this.questions[item - 1].questiontype - 1] += 1;
					if (this.questions[item - 1].questiontype === '1') {
						document.getElementById('score1').innerText =
							this.score[0];
					} else if (this.questions[item - 1].questiontype === '2') {
						document.getElementById('score2').innerText =
							this.score[1];
					} else if (this.questions[item - 1].questiontype === '3') {
						document.getElementById('score3').innerText =
							this.score[2];
					} else {
						document.getElementById('score4').innerText =
							this.score[3];
					}
					document.getElementById('score5').innerText =
						this.score[0] +
						this.score[1] +
						this.score[2] +
						this.score[3];
				} else {
					this.score[this.questions[item - 1].questiontype - 1] -= 1;
					if (this.questions[item - 1].questiontype === '1') {
						document.getElementById('score1').innerText =
							this.score[0];
					} else if (this.questions[item - 1].questiontype === '2') {
						document.getElementById('score2').innerText =
							this.score[1];
					} else if (this.questions[item - 1].questiontype === '3') {
						document.getElementById('score3').innerText =
							this.score[2];
					} else {
						document.getElementById('score4').innerText =
							this.score[3];
					}
					document.getElementById('score5').innerText =
						this.score[0] +
						this.score[1] +
						this.score[2] +
						this.score[3];
				}
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
				const configPaper = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=ANT&examId=' +
						this.resId,
				};
				await axios(configPaper)
					.then((response) => {
						var uint8;
						var audio;
						for (let j = 0; j < this.idList.length; j++) {
							audio = document.getElementById(this.idList[j]);
							audio.src = '';
						}
						this.idList = [];

						for (let i = 0; i < response.data.data.length; i++) {
							uint8 = new Uint8Array(
								response.data.data[i].a_data.data
							);
							var blob = new Blob([uint8], { type: 'audio' });
							var blobUrl = URL.createObjectURL(blob);
							audio = document.getElementById(
								response.data.data[i].a_question_id
							);
							audio.src = blobUrl;
							this.idList.push(
								response.data.data[i].a_question_id
							);
						}
					})
					.catch((error) => {});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=ANT&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};
				await axios(configSummary)
					.then((response) => {
						this.antAnswer = response.data.data;

						this.score = [0, 0, 0, 0];
						console.log(this.picked);
						for (let i = 0; i < this.picked.length; i++) {
							if (this.picked[i] === '1') {
								document.getElementById(i).checked = false;
							}
						}

						this.picked = this.antAnswer[0].lg_answer
							.slice(1, -1)
							.split(',');
						console.log(this.picked);
						for (let i = 1; i < this.picked.length; i++) {
							if (this.picked[i] === '1') {
								document.getElementById(i).checked = true;
								this.score[
									this.questions[i - 1].questiontype - 1
								] += 1;
							} else if (this.picked[i] === '0') {
								document.getElementById(i).checked = false;
							}
						}
						this.validated = 0;
					})
					.catch((error) => {
						this.validated = 1;
					});

				document.getElementById('score1').innerText = this.score[0];
				document.getElementById('score2').innerText = this.score[1];
				document.getElementById('score3').innerText = this.score[2];
				document.getElementById('score4').innerText = this.score[3];
				document.getElementById('score5').innerText =
					this.score[0] +
					this.score[1] +
					this.score[2] +
					this.score[3];
			},
		},
	};
</script>

<style>
	.ant-form2 {
		padding-top: 48px;
		padding-left: 165px;
		padding-right: 166px;
	}

	.ant-form3 {
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

	table.ant-table {
		border-radius: 21px;
		border-style: hidden;
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 1044px;
	}

	td.ant-table-header {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
		height: 68px;
	}

	td.ant-table-header1 {
		background-color: #fafafa;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		text-align: center;
		height: 68px;
	}

	td.ant-table-content {
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		letter-spacing: 0px;
		height: 60px;
		text-align: center;
	}

	td.ant-table-blank {
		background-color: #f4f4f4;
	}

	td.ant-table-end {
		background-color: #e8e8e8;
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
		height: 60px;
	}

	td.ant-table-end1 {
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
		height: 60px;
	}

	td.ant-table-end2 {
		background-color: #f4f4f4;
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		text-align: center;
		height: 60px;
	}

	.ant-input input[type='text'] {
		text-align: center;
	}

	.ant-input input[type='text']:focus {
		outline: none;
	}

	.ant-check input[type='checkbox'] {
		visibility: hidden;
	}

	.ant-check label {
		border: 0.5px solid #e2e2e2;
		height: 36px;
		width: 36px;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
		display: block;
		left: 32px;
	}

	.ant-check input[type='checkbox']:checked + label {
		background-color: #707070;
		border-color: #707070;
	}

	.ant-check input[type='checkbox']:checked + label:after {
		opacity: 1;
	}
	.ant-check {
		height: 36px;
	}

	audio {
		width: 250px;
	}

	.ant-audio::-webkit-media-controls-panel {
		background-color: #ffffff;
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
