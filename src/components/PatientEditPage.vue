<template>
	<v-container>
		<v-layout>
			<v-btn text @click="ToMain()" class="mt-12 ml-5"
				><img :src="backIcon" width="45px" />
			</v-btn>
		</v-layout>

		<v-layout justify-center>
			<validation-observer ref="observer" v-slot="{ invalid }">
				<form @submit.prevent="Submit" class="patientform">
					<v-flex>
						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>아이디</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_id"
								:error-messages="errors"
								label="아이디"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>성명</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_name"
								:error-messages="errors"
								label="성명"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>성별</p>
								<p class="require-label">*</p>
							</v-row>
							<br />
							<input
								type="radio"
								id="male"
								name="sex"
								value="male"
								v-model="user[0].u_sex"
								:error-messages="errors"
								class="patientedit-radio"
							/>
							<label for="male">남성</label>
							<input
								type="radio"
								id="female"
								name="sex"
								value="female"
								v-model="user[0].u_sex"
								:error-messages="errors"
								class="patientedit-radio"
							/>
							<label for="female">여성</label>
							<br />
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>생년월일</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_birth"
								:error-messages="errors"
								label="YYYYMMDD"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>전화번호</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_telephone"
								:error-messages="errors"
								label="010-XXXX-XXXX"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<v-row class="input-label">
							<p>병록번호</p>
						</v-row>
						<v-text-field
							v-model="user[0].u_chart_number"
							label="111111"
							solo
							flat
							required
							class="input-text"
						></v-text-field>

						<v-row class="input-label">
							<p>유입</p>
						</v-row>
						<v-text-field
							v-model="user[0].u_enter_path"
							label="유입"
							solo
							flat
							required
							class="input-text"
						></v-text-field>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>인지검사일</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_cog_test"
								:error-messages="errors"
								label="YYYY-MM-DD"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<v-row class="input-label">
							<p>KBASE2</p>
						</v-row>
						<br />
						<input
							type="radio"
							id="ture"
							name="kbase"
							value="ture"
							v-model="user[0].u_kbase_test"
							class="patientedit-radio"
						/>
						<label for="ture">동의</label>
						<input
							type="radio"
							id="false"
							name="kbase"
							value="false"
							v-model="user[0].u_kbase_test"
							class="patientedit-radio"
						/>
						<label for="false">비동의</label>
						<br />

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>청각검사일</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_listen_test"
								:error-messages="errors"
								label="YYYY-MM-DD"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>언어검사일</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_lang_test"
								:error-messages="errors"
								label="YYMMDD"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							rules="required"
						>
							<v-row class="input-label">
								<p>학력(교육연수)</p>
								<p class="require-label">*</p>
							</v-row>
							<v-text-field
								v-model="user[0].u_study_year"
								:error-messages="errors"
								label="1"
								solo
								flat
								required
								class="input-text"
							></v-text-field>
						</validation-provider>

						<v-row class="input-label">
							<p>비고</p>
						</v-row>
						<v-text-field
							v-model="user[0].u_blank"
							label="비고"
							solo
							flat
							required
							class="input-text"
						></v-text-field>
					</v-flex>
					<v-layout justify-center class="registbtn">
						<v-btn
							depressed
							class="submit-btn"
							:disabled="invalid"
							@click="Edit(), ToMain()"
						>
							수정
						</v-btn>
					</v-layout>
				</form>
			</validation-observer>
		</v-layout>
	</v-container>
</template>

<script>
	import { required } from 'vee-validate/dist/rules';
	import {
		extend,
		ValidationObserver,
		ValidationProvider,
	} from 'vee-validate';
	import axios from 'axios';
	import qs from 'qs';

	extend('required', {
		...required,
		message: '필수 입력항목입니다',
	});

	export default {
		components: {
			ValidationObserver,
			ValidationProvider,
		},
		data: () => ({
			user: [
				{
					u_id: '',
				},
			],
			backIcon: require('../assets/back_icon.svg')
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			initialize() {
				const config = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/examUsers?id=' +
						this.$route.query.data,
				};
				axios(config)
					.then((response) => {
						//console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
						//console.log(response.data.data)
						this.user = response.data.data;
					})
					.catch((error) => {
						console.log(error.response);
					});
			},
			ToMain() {
				Object.assign(this.$data, this.$options.data());
				this.$router.push('/main');
			},
			Edit() {
				var datas = {
					id: this.user[0].u_id,
					name: this.user[0].u_name,
					sex: this.user[0].u_sex,
					birth: this.user[0].u_birth,
					telephone: this.user[0].u_telephone,
					chartNumber: this.user[0].u_chart_number,
					enterPath: this.user[0].u_enter_path,
					cogTest: this.user[0].u_cog_test,
					kbaseTest: this.user[0].u_kbase_test,
					listenTest: this.user[0].u_listen_test,
					langTest: this.user[0].u_lang_test,
					studyYear: this.user[0].u_study_year,
					blank: this.user[0].u_blank,
				};

				if (datas.blank == '') {
					datas.blank = '비고없음';
				}

				datas = qs.stringify(datas);

				var config = {
					method: 'put',
					url: this.$API_SERVER + '/api/examUsers',
					headers: {
						memberId: localStorage.getItem('Id'),
						//'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: datas,
				};

				axios(config)
					.then(function (response) {
						console.log(JSON.stringify(response.data));
					})
					.catch(function (error) {
						console.log(error);
					});
			},
		},
	};
</script>

<style>
	input[type='radio'] {
		display: none;
		margin: 10px;
	}

	input[type='radio'] + label {
		display: inline-block;
		text-align: center;
		padding-top: 11px;
		margin-right: 20px;
		margin-bottom: 30px;
		background-color: #dbdbdb;
		border: 3px solid #dbdbdb;
		color: #5f5f5f;
		width: 217px;
		height: 50px;
		border-radius: 8px;
	}

	input[type='radio']:checked + label {
		background-color: #ffffff;
		color: #678fff;
		border: 3px solid #678fff;
		width: 217px;
		height: 50px;
	}

	.leftflex {
		margin-right: 138px;
	}

	.patientform {
		margin-top: 75px;
	}

	.registbtn {
		margin-top: 164px;
	}
</style>
