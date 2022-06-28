<template>
  <v-container>
    <v-layout class="back-form">
      <v-btn 
        text
        @click="toTest()"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>

    <v-layout justify-center column class="patient-card">
      <v-card class="patient-inform" style="width: 1044px; margin-bottom: 50px">
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

      <v-select
        solo
        flat
        class="date-select"
        :label="latest"
        :items="date"
        @change="handleChange"
      >
      </v-select>
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
          <tr class="cmpt-table-content">
            <td>{{ num[i - 1] }}</td>
            <td style="background-color: #F5F5F5; width: 279px">{{ answers[i - 1] }}</td>
            <td style="width: 279px">{{ cmptAnswer[i - 1] }}</td>
            <td v-if="questions[i - 1].questiontype === '1'" style="width: 70px">
              {{check[i - 1]}}
            </td><td v-else class="cmpt-table-blank"></td>
            <td v-if="questions[i - 1].questiontype === '2'" style="width: 70px">
              {{check[i - 1]}}
            </td><td v-else class="cmpt-table-blank"></td>
            <td v-if="questions[i - 1].questiontype === '3'" style="width: 70px">
              {{check[i - 1]}}
            </td><td v-else class="cmpt-table-blank"></td>
            <td v-if="questions[i - 1].questiontype === '4'" style="width: 70px">
              {{check[i - 1]}}
            </td><td v-else class="cmpt-table-blank"></td>
            <td v-if="questions[i - 1].questiontype === '5'" style="width: 70px">
              {{check[i - 1]}}
            </td><td v-else class="cmpt-table-blank"></td>
            <td v-if="questions[i - 1].questiontype === '6'" style="width: 70px">
              {{check[i - 1]}}
            </td><td v-else class="cmpt-table-blank"></td>
          </tr>
         </tbody>
         <tbody>
          <tr class="cmpt-table-content1">
            <td class="cmpt-table-end" colspan="3">문장유형 별 합계</td>
            <td>{{score[0]}} / {{scores[0]}}</td>
            <td>{{score[1]}} / {{scores[1]}}</td>
            <td>{{score[2]}} / {{scores[2]}}</td>
            <td>{{score[3]}} / {{scores[3]}}</td>
            <td>{{score[4]}} / {{scores[4]}}</td>
            <td>{{score[5]}} / {{scores[5]}}</td>
          </tr>
          <tr>
            <td class="cmpt-table-end" colspan="3" style="border-radius: 0px 0px 0px 21px"> 총점</td>
            <td class="cmpt-table-end1" colspan="6" style="border-radius: 0px 0px 21px 0px">{{totalscore}} / {{totalquestion}}</td>
          </tr>
         </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="cmpt-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="toTest()"
      >확인</v-btn>
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
    totalquestion: '',
    totalscore: '',
    questions: [],
    num: [],
    answers: [],
    cmptAnswer: [],
    check: [],
    scores: [0, 0, 0, 0, 0, 0],
    score: [0, 0, 0, 0, 0, 0],
    date: [],
    latest:''
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    toTest() {
      Object.assign(this.$data, this.$options.data())
      this.$router.push('/language')
    },
    async initialize () {
      await axios.get('/api/examReservations/recent?userId=' + this.$route.query.patient)
      .then(response => {
        this.resId = response.data.data[response.data.data.length - 1].e_id;
        for (let i = 0; i < response.data.data.length; i++) {
          this.date.push(response.data.data[i].e_date);
        }
        this.latest = this.date[this.date.length - 1]
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/examUsers?id=' + this.$route.query.patient)
      .then(response => {
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
        // console.log(this.cmptAnswer)
      })
      .catch(error => {
        this.cmptAnswer = [];
      })

      await axios.get('/api/questions/noimage?type=CMPT')
      .then(response => {
        this.questions = response.data.data

        let sentence;
        this.totalquestion = 0;
        this.totalscore = 0;
        for (let i = 0; i < this.questions.length; i++) {
          sentence = iconv.decode(this.questions[i].q_data.data, "UTF-8")
          if (JSON.parse(sentence)["type_of_question"] === "word") {
            this.questions.splice(i, 1);
            i -= 1;
            continue;
          }

          this.answers[i] = JSON.parse(sentence)["answer"].replace(/,/g, " ")
          if (this.cmptAnswer.length > 0) {
              if (this.answers[i] == this.cmptAnswer[i]) {
              this.check[i] = "1"
            }
            else this.check[i] = "0"
          }
          else {
            this.check[i] = ""
          }

          this.questions[i].questiontype = String.fromCharCode(...[this.questions[i].q_data3.data[3]])
          if (JSON.parse(sentence)["type_of_question"] === "ex") {
            this.num[i] = "P" + JSON.parse(sentence)["no"].replace(/(^0+)/, "");
          }
          else {
            this.num[i] = JSON.parse(sentence)["no"].replace(/(^0+)/, "");
            this.scores[this.questions[i].questiontype - 1] += 1
            this.totalquestion += 1

            if (this.check[i] === "1") {
              this.score[this.questions[i].questiontype - 1] += 1;
              this.totalscore += 1;
            }
          }
        }
      })
      .catch(error => {
        console.log(error.response)
      })

    },
    async handleChange(event) {
      await axios.get('/api/examReservations/recent?userId=' + this.$route.query.patient + '&date=' + event)
      .then(response => {
        this.resId = response.data.data[0].e_id;
      })
      .catch(error => {
        console.log(error)
      })

      await axios.get('/api/answerPapers?type=CMPT&examId=' + this.resId)
      .then(response => {
        if (response.data.data.length > 0) {
            for (let i = 0; i < response.data.data.length; i++) {
            this.cmptAnswer[i] = response.data.data[i].a_answer.replace("  ", " ")
          }
        }
        else this.cmptAnswer = [];
        
      })
      .catch(error => {
        this.cmptAnswer = [];
      })

      await axios.get('/api/questions/noimage?type=CMPT')
      .then(response => {
        this.questions = response.data.data

        let sentence;
        this.totalquestion = 0;
        this.totalscore = 0;
        this.score = [0, 0, 0, 0, 0, 0]
        console.log(this.cmptAnswer)
        for (let i = 0; i < this.questions.length; i++) {
          sentence = iconv.decode(this.questions[i].q_data.data, "UTF-8")
          if (JSON.parse(sentence)["type_of_question"] === "word") {
            this.questions.splice(i, 1);
            i -= 1;
            continue;
          }

          this.answers[i] = JSON.parse(sentence)["answer"].replace(/,/g, " ")
          if (this.cmptAnswer.length > 0) {
              if (this.answers[i] == this.cmptAnswer[i]) {
              this.check[i] = "1"
            }
            else this.check[i] = "0"
          }
          else {
            this.check[i] = ""
          }

          this.questions[i].questiontype = String.fromCharCode(...[this.questions[i].q_data3.data[3]])
          if (JSON.parse(sentence)["type_of_question"] === "ex") {
            this.num[i] = "P" + JSON.parse(sentence)["no"].replace(/(^0+)/, "");
          }
          else {
            this.num[i] = JSON.parse(sentence)["no"].replace(/(^0+)/, "");
            this.totalquestion += 1

            if (this.check[i] === "1") {
              this.score[this.questions[i].questiontype - 1] += 1;
              this.totalscore += 1;
            }
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
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.cmpt-table-header1 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.cmpt-table-header2 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.cmpt-table-blank {
  background-color: #F4F4F4;
}

tr.cmpt-table-content {
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 60px;
  border-bottom: 1px solid #C9C9C9;
}

tr.cmpt-table-content1 {
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 60px;
  border-bottom: 1px solid #C9C9C9;
}

td.cmpt-table-end {
  background-color: #E8E8E8;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 60px;
}

td.cmpt-table-end1 {
  background-color: #F4F4F4;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 60px;
}

.date-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 453px;
  height: 49px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}
</style>