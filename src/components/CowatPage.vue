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

		<v-layout justify-center column class="cowat-form2">
			<p class="test-title">COWAT</p>
			<v-row>
				<table class="cowat-table1">
					<tr>
						<td colspan="6" class="cowat-table-header1"
							>Semantic (category) word fluency</td
						>
					</tr>
					<tr>
						<td colspan="2" class="cowat-table-header2">동물</td>
						<td colspan="2" class="cowat-table-header2"
							>가게 물건</td
						>
						<td colspan="2" class="cowat-table-header2"
							>옷의 종류</td
						>
					</tr>
					<tr>
						<td
							colspan="2"
							class="cowat-table-header2"
							style="border-radius: 0px 0px 0px 21px"
						>
							<audio
								class="cowat-audio"
								controls
								controlsList="nodownload noplaybackrate"
								id="0"
							></audio>
						</td>
						<td colspan="2" class="cowat-table-header2">
							<audio
								class="cowat-audio"
								controls
								controlsList="nodownload noplaybackrate"
								id="1"
							></audio>
						</td>
						<td
							colspan="2"
							class="cowat-table-header2"
							style="border-radius: 0px 0px 21px 0px"
						>
							<audio
								class="cowat-audio"
								controls
								controlsList="nodownload noplaybackrate"
								id="2"
							>
							</audio
						></td>
					</tr>
					<tr v-for="i in 30" v-bind:key="i">
						<td class="cowat-table-tag">{{ i }}</td>
						<td class="cowat-table-content">
							<div class="cowat-answer">
								<input
									type="text"
									placeholder="단어 입력"
									@change="input(0, i)"
									v-model="text0[i - 1]"
								/>
							</div>
						</td>
						<td class="cowat-table-tag">{{ i }}</td>
						<td class="cowat-table-content">
							<div class="cowat-answer">
								<input
									type="text"
									placeholder="단어 입력"
									@change="input(1, i)"
									v-model="text1[i - 1]"
								/>
							</div>
						</td>
						<td class="cowat-table-tag">{{ i }}</td>
						<td class="cowat-table-content">
							<div class="cowat-answer">
								<input
									type="text"
									placeholder="단어 입력"
									@change="input(2, i)"
									v-model="text2[i - 1]"
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" class="cowat-table-total"
							><p id="score0" style="display: inline"></p> /
							30</td
						>
						<td colspan="2" class="cowat-table-total"
							><p id="score1" style="display: inline"></p> /
							30</td
						>
						<td colspan="2" class="cowat-table-total"
							><p id="score2" style="display: inline"></p> /
							30</td
						>
					</tr>
				</table>

				<table class="cowat-table2">
					<tr>
						<td colspan="6" class="cowat-table-header3"
							>Phonemic (letter) word fluency</td
						>
					</tr>
					<tr>
						<td colspan="2" class="cowat-table-header2">ㄱ</td>
						<td colspan="2" class="cowat-table-header2">ㅇ</td>
						<td colspan="2" class="cowat-table-header2">ㅅ</td>
					</tr>
					<tr>
						<td
							colspan="2"
							class="cowat-table-header2"
							style="border-radius: 0px 0px 0px 21px"
						>
							<audio
								class="cowat-audio"
								controls
								controlsList="nodownload noplaybackrate"
								id="3"
							></audio>
						</td>
						<td colspan="2" class="cowat-table-header2">
							<audio
								class="cowat-audio"
								controls
								controlsList="nodownload noplaybackrate"
								id="4"
							></audio>
						</td>
						<td
							colspan="2"
							class="cowat-table-header2"
							style="border-radius: 0px 0px 21px 0px"
						>
							<audio
								class="cowat-audio"
								controls
								controlsList="nodownload noplaybackrate"
								id="5"
							></audio>
						</td>
					</tr>
					<tr v-for="i in 30" v-bind:key="i">
						<td class="cowat-table-tag">{{ i }}</td>
						<td class="cowat-table-content">
							<div class="cowat-answer">
								<input
									type="text"
									placeholder="단어 입력"
									@change="input(3, i)"
									id="text3"
									v-model="text3[i - 1]"
								/>
							</div>
						</td>
						<td class="cowat-table-tag">{{ i }}</td>
						<td class="cowat-table-content">
							<div class="cowat-answer">
								<input
									type="text"
									placeholder="단어 입력"
									@change="input(4, i)"
									id="text4"
									v-model="text4[i - 1]"
								/>
							</div>
						</td>
						<td class="cowat-table-tag">{{ i }}</td>
						<td class="cowat-table-content">
							<div class="cowat-answer">
								<input
									type="text"
									placeholder="단어 입력"
									@change="input(5, i)"
									id="text5"
									v-model="text5[i - 1]"
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" class="cowat-table-total"
							><p id="score3" style="display: inline"></p> /
							30</td
						>
						<td colspan="2" class="cowat-table-total"
							><p id="score4" style="display: inline"></p> /
							30</td
						>
						<td colspan="2" class="cowat-table-total"
							><p id="score5" style="display: inline"></p> /
							30</td
						>
					</tr>
				</table>
			</v-row>
		</v-layout>

		<v-layout justify-center class="cowat-form3">
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
			resId: '',
			count: [0, 0, 0, 0, 0, 0],
			text0: [],
			text1: [],
			text2: [],
			text3: [],
			text4: [],
			text5: [],
			cowatAnswer: [],
			answers: [],
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
						this.user = response.data.data;
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configAnswer = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/answerPapers?type=COWAT&examId=' +
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
							audio = document.getElementById(i);
							audio.src = blobUrl;
							this.idList.push(i);
						}
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=COWAT&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.cowatAnswer = response.data.data;

						if (this.cowatAnswer[0].lg_answer !== '') {
							this.answers = this.cowatAnswer[0].lg_answer
								.slice(1, -1)
								.split('|');

							this.text0 = this.answers[0].split(',');
							this.count[0] = this.text0.length;
							this.text1 = this.answers[1].split(',');
							this.count[1] = this.text1.length;
							this.text2 = this.answers[2].split(',');
							this.count[2] = this.text2.length;
							this.text3 = this.answers[3].split(',');
							this.count[3] = this.text3.length;
							this.text4 = this.answers[4].split(',');
							this.count[4] = this.text4.length;
							this.text5 = this.answers[5].split(',');
							this.count[5] = this.text5.length;
						}
						this.validated = 0;
					})
					.catch((error) => {
						this.validated = 1;
					});

				document.getElementById('score0').innerText = this.count[0];
				document.getElementById('score1').innerText = this.count[1];
				document.getElementById('score2').innerText = this.count[2];
				document.getElementById('score3').innerText = this.count[3];
				document.getElementById('score4').innerText = this.count[4];
				document.getElementById('score5').innerText = this.count[5];
			},
			save() {
				for (let i = 0; i < 30; i++) {
					if (this.text0[i] === null) {
						this.text0[i] = '';
					} else if (this.text1[i] === null) {
						this.text1[i] = '';
					} else if (this.text2[i] === null) {
						this.text2[i] = '';
					} else if (this.text3[i] === null) {
						this.text3[i] = '';
					} else if (this.text4[i] === null) {
						this.text4[i] = '';
					} else if (this.text5[i] === null) {
						this.text5[i] = '';
					}
				}

				const data = {
					id: this.cowatAnswer[0].lg_summery_id,
					answers:
						'[' +
						this.text0 +
						'|' +
						this.text1 +
						'|' +
						this.text2 +
						'|' +
						this.text3 +
						'|' +
						this.text4 +
						'|' +
						this.text5 +
						']',
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
			input(item, i) {
				if (item === 0) {
					if (this.text0[i - 1] === '') this.count[0] -= 1;
					else this.count[0] += 1;
					document.getElementById('score0').innerText = this.count[0];
				} else if (item === 1) {
					if (this.text1[i - 1] === '') this.count[1] -= 1;
					else this.count[1] += 1;
					document.getElementById('score1').innerText = this.count[1];
				} else if (item === 2) {
					if (this.text2[i - 1] === '') this.count[2] -= 1;
					else this.count[2] += 1;
					document.getElementById('score2').innerText = this.count[2];
				} else if (item === 3) {
					if (this.text3[i - 1] === '') this.count[3] -= 1;
					else this.count[3] += 1;
					document.getElementById('score3').innerText = this.count[3];
				} else if (item === 4) {
					if (this.text4[i - 1] === '') this.count[4] -= 1;
					else this.count[4] += 1;
					document.getElementById('score4').innerText = this.count[4];
				} else if (item === 5) {
					if (this.text5[i - 1] === '') this.count[5] -= 1;
					else this.count[5] += 1;
					document.getElementById('score5').innerText = this.count[5];
				}
			},
			async handleChange(event) {
				this.text0 = [];
				this.text1 = [];
				this.text2 = [];
				this.text3 = [];
				this.text4 = [];
				this.text5 = [];
				this.count = [0, 0, 0, 0, 0, 0];

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
						'/api/answerPapers?type=COWAT&examId=' +
						this.resId,
				};

				await axios(configAnswer)
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
							audio = document.getElementById(i);
							audio.src = blobUrl;
							this.idList.push(i);
						}
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=COWAT&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.cowatAnswer = response.data.data;

						if (this.cowatAnswer[0].lg_answer !== '') {
							this.answers = this.cowatAnswer[0].lg_answer
								.slice(1, -1)
								.split('|');

							this.text0 = this.answers[0].split(',');
							this.count[0] = this.text0.length;
							this.text1 = this.answers[1].split(',');
							this.count[1] = this.text1.length;
							this.text2 = this.answers[2].split(',');
							this.count[2] = this.text2.length;
							this.text3 = this.answers[3].split(',');
							this.count[3] = this.text3.length;
							this.text4 = this.answers[4].split(',');
							this.count[4] = this.text4.length;
							this.text5 = this.answers[5].split(',');
							this.count[5] = this.text5.length;
						}
						this.validated = 0;
					})
					.catch((error) => {
						this.validated = 1;
					});

				document.getElementById('score0').innerText = this.count[0];
				document.getElementById('score1').innerText = this.count[1];
				document.getElementById('score2').innerText = this.count[2];
				document.getElementById('score3').innerText = this.count[3];
				document.getElementById('score4').innerText = this.count[4];
				document.getElementById('score5').innerText = this.count[5];
			},
		},
	};
</script>

<style>
	.cowat-form2 {
		padding-top: 48px;
		padding-left: 150px;
		padding-right: 150px;
	}

	.cowat-form3 {
		padding-top: 90px;
		padding-left: 150px;
		padding-right: 150px;
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

	table.cowat-table1 {
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 520px;
		margin-right: 60px;
		border-radius: 21px;
	}

	td.cowat-table-header1 {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		height: 35px;
		border-radius: 21px 21px 0px 0px;
		border-bottom: 1px solid #c9c9c9;
		text-align: center;
	}

	td.cowat-table-header2 {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		width: 386px;
		height: 50px;
		text-align: center;
	}

	td.cowat-table-tag {
		color: #333333;
		font-family: 'Noto Sans KR Medium';
		font-size: 20px;
		letter-spacing: 0px;
		height: 50px;
		width: 30px;
		text-align: center;
		border-bottom: 1px solid #c9c9c9;
		background-color: #fafafa;
	}

	td.cowat-table-content {
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		letter-spacing: 0px;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #c9c9c9;
	}

	td.cowat-table-total {
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		letter-spacing: 0px;
		height: 50px;
		text-align: center;
	}

	table.cowat-table2 {
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 500px;
		border-radius: 21px;
	}

	td.cowat-table-header3 {
		background-color: #e8e8e8;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 16px;
		letter-spacing: 0px;
		height: 35px;
		border-radius: 21px 21px 0px 0px;
		border-bottom: 1px solid #c9c9c9;
		text-align: center;
	}

	.cowat-answer input[type='text'] {
		text-align: center;
		width: 120px;
	}

	.cowat-answer input[type='text']:focus {
		outline: none;
	}

	.cowat-score input[type='text'] {
		text-align: center;
		width: 27px;
	}

	.cowat-score input[type='text']:focus {
		outline: none;
	}

	.cowat-audio {
		width: 160px;
	}

	.cowat-audio::-webkit-media-controls-panel {
		background-color: #e8e8e8;
		padding-left: 0px;
		padding-right: 0px;
	}

	.cowat-audio::-webkit-media-controls-time-remaining-display {
		display: none;
	}

	.cowat-audio::-webkit-media-controls-current-time-display {
		display: none;
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
