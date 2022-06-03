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
              <td>{{ u_name }}</td>
              <td>{{ u_sex }}</td>
              <td>{{ u_birth }}</td>
              <td>{{ u_telephone }}</td>
              <td>{{ u_chart_number }}</td>
              <td>{{ u_enter_path }}</td>
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
              <td>{{ u_cog_test }}</td>
              <td>{{ u_kbase_test }}</td>
              <td>{{ u_listen_test }}</td>
              <td>{{ u_lang_test }}</td>
              <td>{{ u_study_year }}</td>
              <td>{{ u_blank }}</td>
            </tr>
          </table>
        </v-card-text>
      </v-card>

      
    </v-layout>

    <v-divider></v-divider>

    <v-layout justify-center column class="image-form2">
      <p class="test-title">그림 설명하기</p>
      <table class="image-table">
        <tr>
          <td class="image-table-title1">해변가 그림</td>
          <td class="image-table-table">
            <textarea name="content1" class="image-table-content" placeholder="환자 발화 입력"></textarea>
          </td>         
        </tr>
        <tr>
          <td class="image-table-title2">Cat Rescue</td>
          <td class="image-table-table">
            <textarea name="content2" class="image-table-content" placeholder="환자 발화 입력"></textarea>
          </td>         
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="image-form3">
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
    u_id: '',
    u_name: '',
    u_sex: null,
    u_birth: '',
    u_telephone: '',
    u_chart_number: '',
    u_enter_path: '',
    u_cog_test: '',
    u_kbase_test: null,
    u_listen_test: '',
    u_lang_test: '',
    u_study_year: '',
    u_blank: '',
    testitems: ['All', '인지검사', '언어검사 - 이해과제', '언어검사 - 표현과제'],
    languageitems: ['SCT-AP'],
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
      this.u_id = this.$route.query.patient.u_id
      this.u_name = this.$route.query.patient.u_name
      this.u_sex = this.$route.query.patient.u_sex
      this.u_birth = this.$route.query.patient.u_birth
      this.u_telephone = this.$route.query.patient.u_telephone
      this.u_chart_number = this.$route.query.patient.u_chart_number
      this.u_enter_path = this.$route.query.patient.u_enter_path
      this.u_cog_test = this.$route.query.patient.u_cog_test
      this.u_kbase_test = this.$route.query.patient.u_kbase_test
      this.u_listen_test = this.$route.query.patient.u_listen_test
      this.u_lang_test = this.$route.query.patient.u_lang_test
      this.u_study_year = this.$route.query.patient.u_study_year
      this.u_blank = this.$route.query.patient.u_blank

      axios.get('/api/answerPapers?type=Explain_Picture&userId=' + this.u_id)
      .then(response => {
        console.log(JSON.stringify(response.data));
        //this.items.push(response.data.data)
        //this.items = response.data.data
        //console.log(this.items)
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>

.image-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.image-form3 {
  padding-top: 172px;
  padding-left: 177px;
  padding-right: 178px;
  padding-bottom: 171px;
}

.language-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 495px;
  height: 46px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}

table.image-table {
  border-radius: 21px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  height: 1333px;
}

td.image-table-title1 {
  background-color: #E8E8E8;
  border-radius: 21px 21px 0px 0px;
  width: 209px;
  text-align: center;
  color: #678FFF;
  border-bottom: 1px solid #C9C9C9;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
}

td.image-table-title2 {
  background-color: #E8E8E8;
  border-radius: 0px 0px 21px 21px;
  text-align: center;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
}

td.image-table-table {
  border-bottom: 1px solid #C9C9C9;
}

textarea.image-table-content {
  width: 95%;
  height: 93%;
  margin-top: 10px;
  margin-left: 20px;
  resize: none;
  font-family: 'Noto Sans KR Regular';
  font-size: 25px;
  letter-spacing: 0px;
}

textarea:focus.image-table-content {
  outline: none;
}
</style>