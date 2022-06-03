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

    <v-layout justify-center column class="ant-form2">
      <p class="test-title">ANT</p>
      <table class="ant-table">
        <tr>
          <td class="ant-table-header" style="border-radius: 21px 0px 0px 21px">#</td>
          <td class="ant-table-header">논항</td>
          <td class="ant-table-header">목표동사</td>
          <td class="ant-table-header1" style="border-right: 1px solid #C9C9C9">IE</td>
          <td class="ant-table-header1" style="border-right: 1px solid #C9C9C9">IU</td>
          <td class="ant-table-header1" style="border-right: 1px solid #C9C9C9">2</td>
          <td class="ant-table-header1">3</td>
          <td class="ant-table-header" style="border-radius: 0px 21px 21px 0px">파일</td>
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="ant-form3">
      <v-btn
        depressed
        class="submit-btn"
      >저장</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
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
    headers: [
     { text: '#', sortable: false, align: 'center'},
     { text: '논항', sortable: false, align: 'center'},
     { text: '목표동사', sortable: false, align: 'center'},
     { text: 'IE', sortable: false, align: 'center'},
     { text: 'IU', sortable: false, align: 'center'},
     { text: '2', value: '2', sortable: false, align: 'center'},
     { text: '3', sortable: false, align: 'center'},
     { text: '파일', sortable: false, align: 'center'},
   ],
   items: [],
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
    }
  }
}
</script>

<style>
.ant-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.ant-form3 {
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

table.ant-table {
  border-radius: 21px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
}

td.ant-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.ant-table-header1 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}
</style>