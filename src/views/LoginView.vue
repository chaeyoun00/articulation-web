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
                class="login-btn"
                @click="Login()"             
              >로그인</v-btn>            
            </v-card-actions>   
          </v-layout>

          <div class="check">
            <input type="checkbox" id="checkbox" v-model="checkbox" value="check"/>           
            <label for="checkbox"></label>
            <span class="check-text">아이디 저장</span>
          </div>

          <v-divider class="login-line"></v-divider>

          <v-card-actions class="login-action-set">
            <v-layout justify-center>
              <v-btn
                text
                class="login-sign-btn"
                @click="Sign()"
              >회원가입</v-btn>
            </v-layout>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    id: '',
    pw: '',
    checkbox: '',
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    Login() {
      const config = {
        method: 'get',
        url: 'http://49.50.172.137:3000/api/members/login?id=' + this.id + '&pw=' + this.pw
      }

      const vm = this;
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.data == "success") {
          localStorage.setItem("Id", vm.id);
          vm.$router.push('/main')

          console.log(vm.checkbox)
          if (vm.checkbox != '') {
            localStorage.setItem("check", vm.id);
          }
          else {
            localStorage.removeItem("check");
          }
        }
        else {
          Object.assign(vm.$data, vm.$options.data())
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('아이디 또는 비밀번호가 틀렸습니다.')
        Object.assign(vm.$data, vm.$options.data())
      });      
    },
    Sign() {
      this.$router.push('/sign');
    },
    initialize () {
      if (localStorage.getItem("check") != null) {
        this.id = localStorage.getItem("check");
        checkbox.checked = true;
        this.checkbox = 'true';
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Noto Sans KR Medium';
  font-style: normal;
  font-weight: 500;
  src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'), url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'), url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR Regular';
  font-style: normal;
  font-weight: 400;
  src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'), url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'), url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans KR Bold';
  font-style: normal;
  font-weight: 700;
  src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'), url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'), url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');
}

.login-card {
  width: 631px;
  height: 721px;
}

.login-text.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  height: 64px;
  background: #F0F0F0;
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
  box-shadow: 0px 1px 6px #0000004D;
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
  background: #678FFF;
  color: #FFFFFF;
  border: 0.5px solid #E2E2E2;
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
  color: #5F5F5F;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
}

.check label {
  border: 0.5px solid #E2E2E2;
  height: 20px; width: 20px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  margin-top: 5px;
}

.check label:after {
  border: 1px solid #FFFFFF;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  width: 10px;
  left: 4px;
  opacity: 0;
  position: absolute;
  top: 5px;
  transform: rotate(-45deg);
}

.check input[type="checkbox"] {
  visibility: hidden;
}

.check input[type="checkbox"]:checked + label {
  background-color: #678FFF;
  border-color: #678FFF;
}

.check input[type="checkbox"]:checked + label:after {
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
  color: #5F5F5F;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
}
</style>