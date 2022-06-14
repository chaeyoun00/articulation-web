<template>
  <v-container>
    <v-layout class="back-form">
      <v-btn 
        text
        @click="ToTest()"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>

    <v-layout justify-center column class="patient-card">
      <v-card class="patient-inform" style="width: 1044px">
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

    </v-layout>

    <v-divider></v-divider>

    <v-layout justify-center column class="ins-form2">
      <p class="test-title">SCT-INS</p>
      <table class="ins-table">
        <thead>
          <tr>
            <td colspan="7" class="ins-table-header" style="border-radius: 21px 0px 0px 0px"></td>
            <td colspan="6"  class="ins-table-header" style="border-radius: 0px 21px 0px 0px">반응기록</td>
          </tr>
          <tr>
            <td class="ins-table-header" style="border-radius: 0px 0px 0px 21px">번호</td>
            <td class="ins-table-header">Condition</td>
            <td class="ins-table-header">Reversibility</td>
            <td class="ins-table-header">Plausibility</td>
            <td class="ins-table-header">Canonicity</td>
            <td class="ins-table-header">목표문장</td>
            <td class="ins-table-header">정답</td>
            <td class="ins-table-header1" style="border-right: 1px solid #C9C9C9">Cond1-C</td>
            <td class="ins-table-header1" style="border-right: 1px solid #C9C9C9">Cond1-NC</td>
            <td class="ins-table-header1" style="border-right: 1px solid #C9C9C9">Cond2-C</td>
            <td class="ins-table-header1" style="border-right: 1px solid #C9C9C9">Cond2-NC</td>
            <td class="ins-table-header1" style="border-right: 1px solid #C9C9C9">Cond3-C</td>
            <td class="ins-table-header1" style="border-radius: 0px 0px 21px 0px">Cond3-NC</td>
          </tr>
        </thead>

        <tbody v-for="i in questions.length" v-bind:key="i">
          <tr class="ins-table-content">
            <td>{{ num[i - 1] }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ questions[i - 1].q_body }}</td>
            <td>{{ answers[i - 1] }}</td>
            <td><div class="ins-radio"><input type="radio" value="1" v-model="picked[i - 1]"></div></td>
            <td><div class="ins-radio"><input type="radio" value="2" v-model="picked[i - 1]"></div></td>
            <td><div class="ins-radio"><input type="radio" value="3" v-model="picked[i - 1]"></div></td>
            <td><div class="ins-radio"><input type="radio" value="4" v-model="picked[i - 1]"></div></td>
            <td><div class="ins-radio"><input type="radio" value="5" v-model="picked[i - 1]"></div></td>
            <td><div class="ins-radio"><input type="radio" value="6" v-model="picked[i - 1]"></div></td>
          </tr>
        </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="ins-form3">
      <v-btn
        depressed
        class="submit-btn"
      >저장</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    user: [{
      u_id: '',
    }],
    resId: '',
    picked: [],
    questions: [],
    num: [],
    qtype: [],
    answers: [],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    ToTest() {
      Object.assign(this.$data, this.$options.data())
      //this.$router.push('/main')
      this.$router.go(-1)
    },
    async initialize () {
      await axios.get('/api/examReservations/recent?userId=' + this.$route.query.patient)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        this.resId = response.data.data.e_id;
        //console.log(this.resId)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/examUsers?id=' + this.$route.query.patient)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.user = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/questions/question?type=SCT-INS')
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.questions = response.data.data
        
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].q_body = this.questions[i].q_body.replace(/,/g, " ")
          this.questions[i].q_data = String.fromCharCode(...this.questions[i].q_data.data)
          this.qtype[i] = JSON.parse(this.questions[i].q_data)["type_of_question"]
          if (this.qtype[i] === "ex") {
            this.num[i] = "P" + JSON.parse(this.questions[i].q_data)["no"].replace('0', '')
          }
          else {
            this.num[i] = JSON.parse(this.questions[i].q_data)["no"].replace('0', '')
          }
        }
        //console.log(this.questions)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/languageSummary?type=SCT-INS&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.answers = response.data.data[0].lg_answer.split(',').splice(1);
        //console.log(this.antAnswer[0].lg_answer)
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i] === '0') {
            this.answers[i] = ''
          }
        }
        console.log(this.answers)
      })
      .catch(error => {
        alert("해당 검사를 하지 않은 환자입니다. 다시 확인해주세요.")
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style>

.ins-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.ins-form3 {
  padding-top: 90px;
  padding-left: 177px;
  padding-right: 178px;
  padding-bottom: 90px;
}

.language-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 495px;
  height: 46px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}

table.ins-table {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  margin-right: 60px;
  border-radius: 21px;
}

td.ins-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.ins-table-header1 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

tr.ins-table-content {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 12px;
  letter-spacing: 0px;
  height: 60px;
  text-align: center;
}

div.ins-radio {
  display: inline-flex;
  align-items: center
}

.ins-radio input[type=radio] {
  appearance: none;
}

.ins-radio input[type=radio] {
  display: inline;
  width: 33px;
  height: 33px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #E8E8E8;
  margin-left: 12px;
}

.ins-radio input[type=radio]:checked {
  appearance: none;
}

.ins-radio input[type=radio]:checked {
  width: 33px;
  height: 33px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}
</style>