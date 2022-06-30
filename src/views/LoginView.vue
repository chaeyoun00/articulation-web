<template>
	<v-container fill-height>
		<v-layout align-center>
			<v-card class="mx-auto login-card">
				<v-form class="login-form">
					<v-card-text class="login-card-text">
						<v-text-field
							class="login-text"
							solo
							flat
							label="아이디"
							v-model="id"
						></v-text-field>

						<v-text-field
							class="login-text"
							solo
							flat
							label="비밀번호"
							v-model="pw"
							type="password"
						></v-text-field>
					</v-card-text>

					<v-layout justify-center>
						<v-card-actions class="login-action-btn">
							<v-btn
								type="submit"
								class="login-btn"
								@click="Login()"
								>로그인</v-btn
							>
						</v-card-actions>
					</v-layout>

					<div class="check">
						<input
							type="checkbox"
							id="checkbox"
							v-model="checkbox"
							value="check"
						/>
						<label for="checkbox"></label>
						<span class="check-text">아이디 저장</span>
					</div>

					<v-card-actions class="login-action-set">
						<v-layout justify-center>
							<v-btn
								disabled
								text
								class="login-sign-btn"
								@click="Sign()"
							></v-btn>
						</v-layout>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-layout>
	</v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		data: () => ({
			id: '',
			pw: '',
			checkbox: '',
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			async Login() {
				const configLogin = {
					method: 'get',
					url:
						this.$API_SERVER +
						'/api/members/login?id=' +
						this.id +
						'&pw=' +
						this.pw,
				};

				axios(configLogin)
					.then((res) => {
						if (res.data.data === 'success') {
							localStorage.setItem('Id', this.id);
							this.$router.push('/main');
							if (this.checkbox != '') {
								localStorage.setItem('check', this.id);
							} else {
								localStorage.removeItem('check');
							}
						} else {
							throw res;
						}
					})
					.catch((err) => {
						console.error(err);
						this.$dialog.error({
							text: '계정 정보를 확인해주세요.',
							title: '로그인 실패',
						});
					});
			},
			Sign() {
				this.$router.push('/sign');
			},
			initialize() {
				if (localStorage.getItem('check') != null) {
					this.id = localStorage.getItem('check');
					checkbox.checked = true;
					this.checkbox = 'true';
				}
			},
		},
	};
</script>

<style>
	@font-face {
		font-family: 'Noto Sans KR Medium';
		font-style: normal;
		font-weight: 500;
		src: local('NotoSans'),
			url('../assets/font/NotoSansKR-Medium.otf') format('opentype');
	}

	@font-face {
		font-family: 'Noto Sans KR Regular';
		font-style: normal;
		font-weight: 400;
		src: local('NotoSans'),
			url('../assets/font/NotoSansKR-Regular.otf') format('opentype');
	}

	@font-face {
		font-family: 'Noto Sans KR Bold';
		font-style: normal;
		font-weight: 700;
		src: local('NotoSans'),
			url('../assets/font/NotoSansKR-Bold.otf') format('opentype');
	}

	.login-card {
		width: 631px;
		height: 721px;
	}

	.login-text.theme--light.v-text-field--solo
		> .v-input__control
		> .v-input__slot {
		height: 64px;
		background: #f0f0f0;
		margin-bottom: 2px;
		border-radius: 8px;
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		letter-spacing: 0px;
	}

	.login-text label.v-label.theme--light {
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		color: #909090;
		letter-spacing: 0px;
	}

	.login-card.v-sheet.v-card:not(.v-sheet--outlined) {
		box-shadow: 0px 1px 6px #0000004d;
		border-radius: 60px;
	}

	.login-form {
		margin-top: 161px;
		margin-left: 89px;
		margin-right: 89px;
		margin-bottom: 159px;
	}

	.v-card__text.login-card-text {
		padding: 0px;
	}

	.v-card__actions.login-action-btn {
		padding-top: 13px;
		padding-left: 0px;
		padding-right: 0px;
		padding-bottom: 0px;
	}

	.login-btn.theme--light.v-btn.v-btn--has-bg {
		width: 453px;
		height: 64px;
		border-radius: 30px;
		background: #678fff;
		color: #ffffff;
		border: 0.5px solid #e2e2e2;
		box-shadow: none;
		font-family: 'Noto Sans KR Medium';
		font-size: 25px;
		letter-spacing: 0px;
		margin-right: 5px;
	}

	.check {
		position: relative;
		padding-top: 7px;
		padding-left: 2px;
		padding-bottom: 30px;
	}

	.check-text {
		padding-left: 39px;
		color: #5f5f5f;
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		letter-spacing: 0px;
	}

	.check label {
		border: 0.5px solid #e2e2e2;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		cursor: pointer;
		position: absolute;
		margin-top: 5px;
	}

	.check label:after {
		border: 1px solid #ffffff;
		border-top: none;
		border-right: none;
		content: '';
		height: 6px;
		width: 10px;
		left: 4px;
		opacity: 0;
		position: absolute;
		top: 5px;
		transform: rotate(-45deg);
	}

	.check input[type='checkbox'] {
		visibility: hidden;
	}

	.check input[type='checkbox']:checked + label {
		background-color: #678fff;
		border-color: #678fff;
	}

	.check input[type='checkbox']:checked + label:after {
		opacity: 1;
	}

	.login-line.v-divider.theme--light {
		width: 423px;
		margin-left: 13px;
	}

	.v-card__actions.login-action-set {
		padding-top: 30px;
		padding-left: 40px;
		padding-right: 39px;
	}

	.login-sign-btn.theme--light.v-btn {
		color: #5f5f5f;
		font-family: 'Noto Sans KR Regular';
		font-size: 20px;
		letter-spacing: 0px;
	}
</style>
