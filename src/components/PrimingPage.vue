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

    <v-layout justify-center column class="priming-form2">
      <p class="test-title">SPT-priming</p>
      <table class="priming-table">
        <tr>
            <td colspan="4" class="priming-table-header" style="border-radius: 21px 0px 0px 0px"></td>
            <td colspan="8" class="priming-table-header">정반응 여부</td>
            <td class="priming-table-header" style="border-radius: 0px 21px 0px 0px"></td>
        </tr>
        <tr>
            <td colspan="4" class="priming-table-header"></td>
            <td colspan="2" class="priming-table-header1" style="border-right: 1px solid #C9C9C9">A_C</td>
            <td colspan="2" class="priming-table-header1" style="border-right: 1px solid #C9C9C9">A_NC</td>
            <td colspan="2" class="priming-table-header1" style="border-right: 1px solid #C9C9C9">P_C</td>
            <td colspan="2" class="priming-table-header1">P_NC</td>
            <td class="priming-table-header"></td>
        </tr>
        <tr>
            <td class="priming-table-header" style="border-radius: 0px 0px 0px 21px">번호</td>
            <td class="priming-table-header">점화문자</td>
            <td class="priming-table-header">목표반응</td>
            <td class="priming-table-header">대상자 반응</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">반복</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">반복</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">반복</td>
            <td class="priming-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
            <td class="priming-table-header2">반복</td>
            <td class="priming-table-header" style="border-radius: 0px 0px 21px 0px">파일</td>
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="priming-form3">
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
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>
.priming-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.priming-form3 {
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

table.priming-table {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  margin-right: 60px;
  border-radius: 21px;
}

td.priming-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.priming-table-header1 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  border-bottom: 1px solid #C9C9C9;
}

td.priming-table-header2 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
}
</style>