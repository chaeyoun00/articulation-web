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

    <v-layout justify-center column class="com-form2">
      <p class="test-title">SCT-COM</p>
        <table class="com-table">
          <tr>
            <td class="com-table-header" style="border-radius: 21px 0px 0px 21px">ID</td>
            <td class="com-table-header">Sentence</td>
            <td class="com-table-header">Answer</td>
            <td class="com-table-header" style="border-radius: 0px 21px 21px 0px">Score</td>
          </tr>

          <tbody v-for="i in questions.length" v-bind:key="i">
            <tr v-if="qtype[i - 1] !== 'word'">
              <td class="com-table-content">{{ num[i - 1] }}</td>
              <td class="com-table-content" style="background-color: #F5F5F5">{{ questions[i - 1].q_body }}</td>
              <td class="com-table-content">
                <div class="com-table-text">
                  <input type="text" id="textarea" placeholder="입력" v-model="text[i]">
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <td colspan="3" class="com-table-end1">총점</td>
            <td class="com-table-end2">/</td>
          </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="com-form3">
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
    text: []
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
      await axios.get('/api/examUsers?id=' + this.$route.query.patient)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.user = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/questions/question?type=SCT-COM')
      .then(response => {
        this.questions = response.data.data
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].q_body = this.questions[i].q_body.replace(/,/g, " ")
          this.questions[i].q_data = String.fromCharCode(...this.questions[i].q_data.data)
          this.qtype[i] = JSON.parse(this.questions[i].q_data)["type_of_question"]
          if (this.qtype[i] === "ex") {
            this.num[i] = "P" + JSON.parse(this.questions[i].q_data)["no"].replace(/(^0+)/, "");
          }
          else {
            this.num[i] = JSON.parse(this.questions[i].q_data)["no"].replace(/(^0+)/, "");
          }
        }
        
        // var inform;
        // for (let i = 0; i < response.data.data.length; i++) {
        //   inform = { q_body: '', q_type: '' };
        //   if (JSON.parse(String.fromCharCode(...response.data.data[i].q_data.data))["type_of_question"] !== "word") {
        //     inform.q_body = response.data.data[i].q_body.replace(/,/g, " ")
        //     if (JSON.parse(String.fromCharCode(...response.data.data[i].q_data.data))["type_of_question"] === "ex"){
        //       inform.q_type = "P" + JSON.parse(String.fromCharCode(...response.data.data[i].q_data.data))["no"].replace(/(^0+)/, "");
        //     }
        //     else {
        //       inform.q_type = JSON.parse(String.fromCharCode(...response.data.data[i].q_data.data))["no"].replace(/(^0+)/, "");
        //     }
        //     this.questions[i] = inform
        //   }
        // }
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>
.com-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.com-form3 {
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

table.com-table {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  margin-right: 60px;
  border-radius: 21px;
}

td.com-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.com-table-content {
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
  height: 60px;
}

td.com-table-end1 {
  background-color: #E8E8E8;
  color: #333333;
  font-family: 'Noto Sans KR Bold';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
  border-radius: 0px 0px 0px 21px;
}

td.com-table-end2 {
  background-color: #F4F4F4;
  color: #333333;
  font-family: 'Noto Sans KR Bold';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
  border-radius: 0px 0px 21px 0px;
}

.com-table-text input[type=text] {
  text-align: center;
  width: 50px;
}

.com-table-text input[type=text]:focus {
  outline: none;
}
</style>