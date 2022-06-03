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
      <v-card class="patient-inform" style="width: 1044px;">
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

    <v-layout justify-center column class="ap-form2">
      <p class="test-title">SCT-AP</p>
      <table class="ap-table">
        <tr>
          <td colspan="3" class="ap-table-header" style="border-radius: 21px 0px 0px 0px"></td>
          <td colspan="12" class="ap-table-header" style="border-radius: 0px 21px 0px 0px">대상자 반응</td>
        </tr>
        <tr>
          <td colspan="3" class="ap-table-header"></td>
          <td colspan="2" class="ap-table-header1" style="border-right: 1px solid #C9C9C9; border-bottom: 1px solid #C9C9C9;">A2_C</td>
          <td colspan="2" class="ap-table-header1" style="border-right: 1px solid #C9C9C9; border-bottom: 1px solid #C9C9C9;">A2_NC</td>
          <td colspan="2" class="ap-table-header1" style="border-right: 1px solid #C9C9C9; border-bottom: 1px solid #C9C9C9;">A3_C</td>
          <td colspan="2" class="ap-table-header1" style="border-right: 1px solid #C9C9C9; border-bottom: 1px solid #C9C9C9;">A3_NC</td>
          <td colspan="2" class="ap-table-header1" style="border-right: 1px solid #C9C9C9; border-bottom: 1px solid #C9C9C9;">P_C</td>
          <td colspan="2" class="ap-table-header1" style="border-bottom: 1px solid #C9C9C9;">P_NC</td>
        </tr>
        <tr>
          <td class="ap-table-header" style="border-radius: 0px 0px 0px 21px">번호</td>
          <td class="ap-table-header">문장</td>
          <td class="ap-table-header">정답</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">1st</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">반복</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">1st</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">반복</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">1st</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">반복</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">1st</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">반복</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">1st</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">반복</td>
          <td class="ap-table-header1" style="border-right: 1px solid #C9C9C9;">1st</td>
          <td class="ap-table-header1" style="border-radius: 0px 0px 21px 0px">반복</td>
        </tr>

        <tbody v-for="question in questions" v-bind:key="question.q_id">
          <tr class="ap-table-body" v-if="splitType(question) != 'word'">
            <td></td>
            <td>{{ question.q_body }}</td>
            <td>{{ question.q_data.split('"')[11] }}</td>
            <td>
              
            </td>
          </tr>
        </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="ap-form3">
      <v-btn
        depressed
        class="submit-btn"
      >저장</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
var axios = require('axios');

export default {
  data: () => ({
    user: [{
      u_id: '',
    }],
    questions: [],
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
    initialize () {
      axios.get('/api/examUsers?id=' + this.$route.query.patient)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.user = response.data.data
        //console.log(this.user)
      })
      .catch(error => {
        console.log(error.response)
      })

      axios.get('/api/questions/question?type=SCT-AP')
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.questions = response.data.data
        for (let i = 0; i < this.questions.length; i++){
          this.questions[i].q_body = this.questions[i].q_body.replace(/,/g, " ")
          this.questions[i].q_data = String.fromCharCode(...this.questions[i].q_data.data)
        }
        console.log(this.questions)
        //console.log(String.fromCharCode(...this.questions[0].q_data.data).split("\"")[11])
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    splitType(item) {
      console.log(item.q_data.split("\"")[3])
      return item.q_data.split("\"")[3]
    }
  }
}
</script>

<style>
.ap-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.ap-form3 {
  padding-top: 90px;
  padding-left: 165px;
  padding-right: 166px;
  padding-bottom: 90px;
}

.language-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 495px;
  height: 46px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}

table.ap-table {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  margin-right: 60px;
  border-radius: 21px;
}

td.ap-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.ap-table-header1 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
}

tr.ap-table-body {
  background-color: #FFFFFF;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}
</style>