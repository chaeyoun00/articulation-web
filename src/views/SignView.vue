<template>
  <v-container>
    <v-layout class="signup-form">
      <v-btn 
        text
        @click="ToMain()"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>
    <v-layout justify-center>
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
      >
        <form @submit.prevent="Submit" class="signup-form1">
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
                class="input-text"
                solo
                flat
                label="아이디"
                v-model="id"
                :error-messages="errors"                
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>비밀번호</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                class="input-text"
                solo
                flat
                label="비밀번호"
                v-model="pw"
                :error-messages="errors"
                type="password"             
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>비밀번호 재확인</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                class="input-text"
                solo
                flat
                label="비밀번호 재확인"
                v-model="pw_re"
                :error-messages="errors" 
                type="password"               
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>이름</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                class="input-text"
                solo
                flat
                label="이름"
                v-model="name"
                :error-messages="errors"                
              ></v-text-field>
            </validation-provider>
          </v-flex>
          <v-layout justify-center class="signup-form2">
            <v-btn       
              :disabled="invalid"
              depressed
              @click="Submit()"
              class="submit-btn"
            >가입하기</v-btn>
          </v-layout>
        </form>
      </validation-observer>
    </v-layout>
  </v-container>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import axios from 'axios'

extend('required', {
  ...required,
  message: '필수입력 항목입니다',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    id: '',
    pw: '',
    pw_re: '',
    name: '',
  }),
  methods: {
    ToMain() {
      Object.assign(this.$data, this.$options.data())
      //this.$router.push('/main')
      this.$router.go(-1)
    },
    Submit() {
        if (this.pw != this.pw_re) {
          this.pw_re = ''
        }
        else {
          const data = {
            'id': this.id,
            'pw': this.pw,
            'name': this.name
          }

          var config = {
            method: 'post',
            url: 'http://49.50.172.137:3000/api/members',
            headers: {
              'memberId': localStorage.getItem("Id"),
              //'Content-Type': 'application/x-www-form-urlencoded'
            },
              data: data
          }

          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          this.ToMain()
        }
    }
  }
}
</script>

<style>
.signup-form {
  padding-left: 468px;
  padding-top: 52px;
}

.signup-form1 {
  padding-top: 69px;
}

.signup-form2 {
  padding-top: 286px;
}

.input-label {
  padding-top: 6px;
  padding-left: 12px;
  padding-bottom: 5px;
  font-family: 'Noto Sans KR Bold';
  font-size: 16px;
  letter-spacing: 0px;
}

.v-application p.require-label {
  color: #E21414;
  padding-left: 3px;
}

.v-application .error--text .v-text-field__details {
  color: #E21414 !important;
  caret-color: #E21414 !important;
  font-family: 'Noto Sans KR Regular';
  font-size: 12px;
  letter-spacing: 0px; 
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding-left: 0px;
  padding-bottom: 9px;
}

.input-text.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  height: 50px;
  width: 453px;
  background: #F0F0F0;
  border-radius: 8px;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
}

.input-text label.v-label.theme--light {
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  color: #909090;
}

.submit-btn.theme--light.v-btn.v-btn--has-bg {
  width: 218px;
  height: 64px;
  background: #678FFF;
  border-radius: 30px;
  color: #ffffff;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  margin-right: 5px
}

.submit-btn.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #A2A2A2 !important;
  color: #FFFFFF !important;
}
</style>