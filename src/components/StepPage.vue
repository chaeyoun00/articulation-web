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

		<v-layout justify-center column class="step-form2">
			<p class="test-title">절차 설명하기</p>
			<table class="step-table">
				<tr>
					<td class="step-table-title1">
						라면 끓이기
						<audio
							id="0"
							controls
							controlsList="nodownload noplaybackrate"
						></audio>
					</td>
					<td class="step-table-text">
						<textarea
							name="content1"
							class="step-table-content"
							placeholder="환자 발화 입력"
							v-model="image[0]"
						></textarea>
					</td>
				</tr>
				<tr>
					<td class="step-table-title2">
						양치질하기
						<audio
							id="1"
							controls
							controlsList="nodownload noplaybackrate"
						></audio>
					</td>
					<td class="step-table-text">
						<textarea
							name="content2"
							class="step-table-content"
							placeholder="환자 발화 입력"
							v-model="image[1]"
						></textarea>
					</td>
				</tr>
			</table>
		</v-layout>

		<v-layout justify-center class="step-form3">
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
			image: [],
			stepAnswer: [],
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
						'/api/answerPapers?type=Explain_Procedure&examId=' +
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
						//console.log(this.audioURL)
					})
					.catch((error) => {
						console.log(error.response);
					});

				const configSummary = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/languageSummary?type=Explain_Procedure&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.stepAnswer = response.data.data;
						this.image = this.stepAnswer[0].lg_answer
							.slice(1, -1)
							.split(',');
						this.validated = 0;
					})
					.catch((error) => {
						this.image = [];
						this.validated = 1;
					});
			},
			save() {
				const data = {
					id: this.stepAnswer[0].lg_summery_id,
					answers: '[' + this.image + ']',
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
						'/api/answerPapers?type=Explain_Procedure&examId=' +
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
						'/api/languageSummary?type=Explain_Procedure&userId=' +
						this.user[0].u_id +
						'&resId=' +
						this.resId,
				};

				await axios(configSummary)
					.then((response) => {
						this.picAnswer = response.data.data;
						this.image = this.picAnswer[0].lg_answer
							.slice(1, -1)
							.split(',');
						this.validated = 0;
					})
					.catch((error) => {
						this.image = [];
						this.validated = 1;
					});
			},
		},
	};
</script>

<style>
	.step-form2 {
		padding-top: 48px;
		padding-left: 177px;
		padding-right: 178px;
	}

	.step-form3 {
		padding-top: 90px;
		padding-left: 177px;
		padding-right: 178px;
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

	table.step-table {
		border-radius: 21px;
		border-style: hidden;
		box-shadow: 0 0 0 1px #c9c9c9;
		border-collapse: collapse;
		width: 1044px;
		height: 1333px;
	}

	td.step-table-title1 {
		background-color: #e8e8e8;
		border-radius: 21px 21px 0px 0px;
		width: 209px;
		text-align: center;
		color: #678fff;
		border-bottom: 1px solid #c9c9c9;
		font-family: 'Noto Sans KR Medium';
		font-size: 25px;
		letter-spacing: 0px;
	}

	td.step-table-title2 {
		background-color: #e8e8e8;
		border-radius: 0px 0px 21px 21px;
		text-align: center;
		color: #678fff;
		font-family: 'Noto Sans KR Medium';
		font-size: 25px;
		letter-spacing: 0px;
	}

	td.step-table-text {
		border-bottom: 1px solid #c9c9c9;
	}

	textarea.step-table-content {
		width: 95%;
		height: 93%;
		margin-top: 10px;
		margin-left: 20px;
		resize: none;
		font-family: 'Noto Sans KR Regular';
		font-size: 25px;
		letter-spacing: 0px;
	}

	textarea:focus.step-table-content {
		outline: none;
	}

	audio {
		width: 250px;
	}

	audio::-webkit-media-controls-panel {
		background-color: #e8e8e8;
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
