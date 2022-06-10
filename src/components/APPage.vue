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
        <thead>
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
            <td class="ap-table-header" style="width: 310px">문장</td>
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
        </thead>

        <tbody v-for="i in questions.length" v-bind:key="i">
          <tr v-if="qtype[i - 1] !== 'word'"> 
            <td class="ap-table-content" >{{ num[i - 1] }}</td>
            <td class="ap-table-content">{{ questions[i - 1].q_body }}</td>
            <td class="ap-table-content">{{ answers[0][i - 1] }}</td>
            <td><div class="ap-radio"><input type="radio" value="1" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="2" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="3" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="4" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="5" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="6" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="7" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="8" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="9" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="10" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="11" v-model="picked[i - 1]"></div></td>
            <td><div class="ap-radio"><input type="radio" value="12" v-model="picked[i - 1]"></div></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colspan="2">문장유형별 점수</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">총점</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">문장유형별 점수</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="ap-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="Save(), Totest()"
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
    resId: '',
    questions: [],
    num: [],
    qtype: [],
    answers: [],
    picked: [],
    apAnswer: [],
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
        //console.log(this.user)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/questions/question?type=SCT-AP')
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.questions = response.data.data
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].q_body = this.questions[i].q_body.replace(/,/g, " ")
          this.questions[i].q_data = String.fromCharCode(...this.questions[i].q_data.data)
          this.qtype[i] = JSON.parse(this.questions[i].q_data)["type_of_question"]
          if (JSON.parse(this.questions[i].q_data)["type_of_question"] === "ex") {
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

      await axios.get('/api/languageSummary?type=SCT-AP&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.apAnswer = response.data.data[0]
        this.answers = response.data.data[0].lg_answer.split('[');
        this.answers[0] = this.answers[0].split(',').splice(1)
        for (let i = 0; i < this.answers[0].length; i++) {
          if (this.answers[0][i] === '0') {
            this.answers[0][i] = ''
          }
        }

        this.answers[1] = this.answers[1].split(',').splice(1)
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    Save() {
      const data = {
        'id': this.apAnswer.lg_summery_id,
        'answers': this.apAnswer.lg_answer + '[' + this.picked + ']'
      }
      console.log(data)
      var config = {
        method: 'put',
        url: 'http://49.50.172.137:3000/api/languageSummary',
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

td.ap-table-content {
  background-color: #FAFAFA;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
  height: 60px;
  text-align: center;
  
}

div.ap-radio {
  display: inline-flex;
  align-items: center;
}

.ap-radio input[type=radio] {
  appearance: none;
}

.ap-radio input[type=radio] {
  display: inline;
  width: 33px;
  height: 33px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #E8E8E8;
  margin-left: 12px;
}

.ap-radio input[type=radio]:checked {
  appearance: none;
}

.ap-radio input[type=radio]:checked {
  width: 33px;
  height: 33px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}
</style>