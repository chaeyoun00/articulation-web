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

    <v-layout justify-center column class="cowat-form2">
      <p class="test-title">COWAT</p>
      <v-row>
        <table class="cowat-table1">
          <tr>
            <td colspan="4" class="cowat-table-header1">Semantic (category) word fluency</td>
          </tr>
          <tr>
            <td colspan="2" class="cowat-table-header2" style="border-radius: 0px 0px 0px 21px">동물</td>
            <td colspan="2"  class="cowat-table-header2" style="border-radius: 0px 0px 21px 0px">가게 물건</td>
          </tr>
          <tr v-for="i in 30" v-bind:key="i">
            <td class="cowat-table-tag">1</td>
            <td class="cowat-table-content">
              <div class="cowat-answer">
                <input type="text" placeholder="단어 입력">
              </div>
            </td>
            <td class="cowat-table-tag">1</td>
            <td class="cowat-table-content">
              <div class="cowat-answer">
                <input type="text" placeholder="단어 입력">
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="cowat-table-total">
              <div class="cowat-score">
                <input type="text" id="textarea" placeholder="0">
                <label for="textarea">/ 30</label>
              </div>
            </td>
            <td colspan="2" class="cowat-table-total">
              <div class="cowat-score">
                <input type="text" id="textarea" placeholder="0">
                <label for="textarea">/ 30</label>
              </div>
            </td>
          </tr>
        </table>

        <table class="cowat-table2">
          <tr>
            <td colspan="6" class="cowat-table-header3">Phonemic (letter) word fluency</td>
          </tr>
          <tr>
            <td colspan="2" class="cowat-table-header2" style="border-radius: 0px 0px 0px 21px">ㄱ</td>
            <td colspan="2" class="cowat-table-header2">ㅇ</td>
            <td colspan="2" class="cowat-table-header2" style="border-radius: 0px 0px 21px 0px">ㅅ</td>
          </tr>
          <tr v-for="i in 30" v-bind:key="i">
            <td class="cowat-table-tag">1</td>
            <td class="cowat-table-content">
              <div class="cowat-answer">
                <input type="text" placeholder="단어 입력">
              </div>
            </td>
            <td class="cowat-table-tag">1</td>
            <td class="cowat-table-content">
              <div class="cowat-answer">
                <input type="text" placeholder="단어 입력">
              </div>
            </td>
            <td class="cowat-table-tag">1</td>
            <td class="cowat-table-content">
              <div class="cowat-answer">
                <input type="text" placeholder="단어 입력">
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="cowat-table-total">
              <div class="cowat-score">
                <input type="text" id="textarea" placeholder="0">
                <label for="textarea">/ 30</label>
              </div>
            </td>
            <td colspan="2" class="cowat-table-total">
              <div class="cowat-score">
                <input type="text" id="textarea" placeholder="0">
                <label for="textarea">/ 30</label>
              </div>
            </td>
            <td colspan="2" class="cowat-table-total">
              <div class="cowat-score">
                <input type="text" id="textarea" placeholder="0">
                <label for="textarea">/ 30</label>
              </div>
            </td>
          </tr>
        </table>
      </v-row>
    </v-layout>

    <v-layout justify-center class="cowat-form3">
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
.cowat-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.cowat-form3 {
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

table.cowat-table1 {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 386px;
  margin-right: 60px;
  border-radius: 21px;
}

td.cowat-table-header1 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  width: 386px;
  height: 35px;
  border-radius: 21px 21px 0px 0px;
  border-bottom: 1px solid #C9C9C9;
  text-align: center;
}

td.cowat-table-header2 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  width: 386px;
  height: 50px;
  text-align: center;
}

td.cowat-table-tag {
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  height: 50px;
  width: 20px;
  text-align: center;
  border-bottom: 1px solid #C9C9C9;
  background-color: #FAFAFA;
}

td.cowat-table-content {
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid #C9C9C9;
}

td.cowat-table-total {
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
  height: 50px;
  text-align: center;
}

table.cowat-table2 {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 579px;
  border-radius: 21px;
}

td.cowat-table-header3 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  width: 579px;
  height: 35px;
  border-radius: 21px 21px 0px 0px;
  border-bottom: 1px solid #C9C9C9;
  text-align: center;
}

.cowat-answer input[type=text] {
  text-align: center;
  width: 120px;
}

.cowat-answer input[type=text]:focus {
  outline: none;
}

.cowat-score input[type=text] {
  text-align: center;
  width: 27px;
}

.cowat-score input[type=text]:focus {
  outline: none;
}
</style>