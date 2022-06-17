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
      <v-card class="patient-inform">
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

    <v-layout justify-center column class="cmpt-form2">
      <p class="test-title">CMPT</p>
      <table class="cmpt-table">
         <thead>
          <tr>
            <td colspan="3" class="cmpt-table-header1" style="border-radius: 21px 0px 0px 0px"></td>
            <td colspan="6" class="cmpt-table-header1" style="border-radius: 0px 21px 0px 0px">문장유형</td>
          </tr>
          <tr>
            <td class="cmpt-table-header1" style="border-radius: 0px 0px 0px 21px">번호</td>
            <td class="cmpt-table-header1">목표문장</td>
            <td class="cmpt-table-header1">대상자 반응</td>
            <td class="cmpt-table-header2" style="border-right: 1px solid #C9C9C9">A2_C</td>
            <td class="cmpt-table-header2" style="border-right: 1px solid #C9C9C9">A2_NC</td>
            <td class="cmpt-table-header2" style="border-right: 1px solid #C9C9C9">A3_C</td>
            <td class="cmpt-table-header2" style="border-right: 1px solid #C9C9C9">A3_NC</td>
            <td class="cmpt-table-header2" style="border-right: 1px solid #C9C9C9">P_C</td>
            <td class="cmpt-table-header2" style="border-radius: 0px 0px 21px 0px">P_NC</td>
          </tr>
         </thead>
         <tbody v-for="i in questions.length" v-bind:key="i">
          <tr v-if="qtype[i - 1] !== 'word' && i != questions.length">
            <td>{{ num[i - 1] }}</td>
            <td>{{ answers[i - 1] }}</td>
            <td>{{ cmptAnswer[i - 1] }}</td>
          </tr>
         </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="cmpt-form3">
      <v-btn
        depressed
        class="submit-btn"
      >저장</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
var axios = require('axios');
const iconv = require('iconv-lite')

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
    cmptAnswer: [],
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

      await axios.get('/api/answerPapers?type=CMPT&examId=' + this.resId)
      .then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.cmptAnswer[i] = response.data.data[i].a_answer.replace("  ", " ")
        }
        console.log(this.cmptAnswer)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/questions/question?type=CMPT')
      .then(response => {
        this.questions = response.data.data
        let contents;
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].q_body = this.questions[i].q_body.replace(/,/g, " ")
          contents = iconv.decode(this.questions[i].q_data.data, "UTF-8")
          this.qtype[i] = JSON.parse(contents)["type_of_question"]
          this.answers[i] = JSON.parse(contents)["answer"].replace(/,/g, " ")
          if (this.qtype[i] === "ex") {
            this.num[i] = "P" + JSON.parse(contents)["no"].replace(/(^0+)/, "");
          }
          else {
            this.num[i] = JSON.parse(contents)["no"].replace(/(^0+)/, "");
          }
        }
      })
      .catch(error => {
        console.log(error.response)
      })

    }
  }
}
</script>

<style>
.cmpt-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.cmpt-form3 {
  padding-top: 90px;
  padding-left: 177px;
  padding-right: 178px;
  padding-bottom: 90px;
}

table.cmpt-table {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  margin-right: 60px;
  border-radius: 21px;
}

thead.cmpt-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 18px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.cmpt-table-header1 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 18px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.cmpt-table-header2 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 18px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

div.cmpt-radio {
  display: inline-flex;
  align-items: center
}

.cmpt-radio input[type=radio] {
  appearance: none;
}

.cmpt-radio input[type=radio] {
  display: inline;
  width: 25px;
  height: 25px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #E8E8E8;
  margin-left: 2px;
}

.cmpt-radio input[type=radio]:checked {
  appearance: none;
}

.cmpt-radio input[type=radio]:checked {
  width: 25px;
  height: 25px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}

.cmpt-audio {
  width: 136px;
}

.cmpt-audio::-webkit-media-controls-panel {
  background-color: #FAFAFA;
  padding-left: 0px;
  padding-right: 0px;
}
</style>