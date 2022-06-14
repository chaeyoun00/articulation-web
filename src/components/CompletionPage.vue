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

    <v-layout justify-center column class="completion-form2">
      <p class="test-title">SPT-completion</p>
      <table class="completion-table">
        <tr>
          <td colspan="4" class="completion-table-header" style="border-radius: 21px 0px 0px 0px"></td>
          <td colspan="8" class="completion-table-header">정반응 여부</td>
          <td class="completion-table-header" style="border-radius: 0px 21px 0px 0px"></td>
        </tr>
        <tr>
          <td colspan="4" class="completion-table-header"></td>
          <td colspan="2" class="completion-table-header1" style="border-right: 1px solid #C9C9C9">A_C</td>
          <td colspan="2" class="completion-table-header1" style="border-right: 1px solid #C9C9C9">A_NC</td>
          <td colspan="2" class="completion-table-header1" style="border-right: 1px solid #C9C9C9">P_C</td>
          <td colspan="2" class="completion-table-header1">P_NC</td>
          <td class="completion-table-header"></td>
        </tr>
        <tr>
          <td class="completion-table-header" style="border-radius: 0px 0px 0px 21px; width: 27px">번호</td>
          <td class="completion-table-header" style="width: 180px;">제시</td>
          <td class="completion-table-header" style="width: 180px;">목표반응</td>
          <td class="completion-table-header" style="width: 180px;">대상자 반응</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9;">반복</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9">반복</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9">반복</td>
          <td class="completion-table-header2" style="border-right: 1px solid #C9C9C9">1st</td>
          <td class="completion-table-header2">반복</td>
          <td class="completion-table-header" style="border-radius: 0px 0px 21px 0px; width: 136px">파일</td>
        </tr>

        <tbody v-for="i in questions.length" v-bind:key="i">
          <tr v-if="qtype[i - 1] !== 'word' && i != questions.length">
            <td class="completion-table-content" style="border-bottom: 1px solid #C9C9C9">{{ num[i - 1] }}</td>
            <td class="completion-table-content" style="background-color: #FAFAFA; border-bottom: 1px solid #C9C9C9">{{ questions[i - 1].q_body }}</td>
            <td class="completion-table-content" style="background-color: #FAFAFA; border-bottom: 1px solid #C9C9C9">{{ answers[i - 1] }}</td>
            <td class="completion-table-content" style="border-bottom: 1px solid #C9C9C9">
              <div class="completion-table-text"><input type="text" placeholder="반응 입력" v-model="text[i - 1]"></div>
            </td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="1" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="2" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="3" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="4" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="5" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="6" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="7" v-model="picked[i - 1]"></div></td>
            <td style="border-bottom: 1px solid #C9C9C9"><div class="completion-radio"><input type="radio" value="8" v-model="picked[i - 1]"></div></td>
            <td style="background-color: #FAFAFA">
              <audio :id="questions[i - 1].q_id" controls controlsList="nodownload noplaybackrate" class="completion-audio"></audio>
            </td>
          </tr>
          <tr v-else-if="qtype[i - 1] !== 'word'">
            <td class="completion-table-content">{{ num[i - 1] }}</td>
            <td class="completion-table-content" style="background-color: #FAFAFA">{{ questions[i - 1].q_body }}</td>
            <td class="completion-table-content" style="background-color: #FAFAFA">{{ answers[i - 1] }}</td>
            <td class="completion-table-content">
              <div class="completion-table-text"><input type="text" placeholder="반응 입력" v-model="text[i - 1]"></div>
            </td>
            <td><div class="completion-radio"><input type="radio" value="1" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="2" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="3" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="4" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="5" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="6" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="7" v-model="picked[i - 1]"></div></td>
            <td><div class="completion-radio"><input type="radio" value="8" v-model="picked[i - 1]"></div></td>
            <td style="background-color: #FAFAFA; border-radius: 0px 0px 21px 0px">
              <audio :id="questions[i - 1].q_id" controls controlsList="nodownload noplaybackrate" class="completion-audio"></audio>
            </td>
          </tr>
        </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="completion-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="Save(), ToTest()"
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
    text: [],
    answers: [],
    completionAnswer: [],
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

      await axios.get('/api/questions/question?type=SPT-completion')
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

      await axios.get('/api/answerPapers?type=SPT-completion&examId=' + this.resId)
      .then(response => {
        var uint8;
        var audio;
        for (let i = 0; i < response.data.data.length; i++) {
          uint8 = new Uint8Array(response.data.data[i].a_data.data);
          var blob = new Blob([uint8], { type: 'audio' });
          var blobUrl = URL.createObjectURL(blob);
          audio = document.getElementById(response.data.data[i].a_question_id)
          audio.src = blobUrl;
        }
        //console.log(this.audioURL)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/languageSummary?type=SPT-completion&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.completionAnswer = response.data.data;
        if (this.completionAnswer[0].lg_answer !== '') {
          let splitAnswer = this.completionAnswer[0].lg_answer.slice(1, -1).split('|')
          this.text = splitAnswer[0].split(',')
          this.picked =  splitAnswer[1].split(',')
        }
      })
      .catch(error => {
        alert("해당 검사를 하지 않은 환자입니다. 다시 확인해주세요.")
        this.$router.go(-1)
      })   
    },
    Save() {
      const data = {
        'id': this.completionAnswer[0].lg_summery_id,
        'answers': '[' + this.text + '|' + this.picked + ']'
      }

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
.completion-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.completion-form3 {
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

table.completion-table {
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  margin-right: 60px;
  border-radius: 21px;
}

td.completion-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  height: 50px;
}

td.completion-table-header1 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  border-bottom: 1px solid #C9C9C9;
}

td.completion-table-header2 {
  background-color: #FAFAFA;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
}

td.completion-table-content {
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  height: 60px;
}

div.completion-radio {
  display: inline-flex;
  align-items: center
}

.completion-radio input[type=radio] {
  appearance: none;
}

.completion-radio input[type=radio] {
  display: inline;
  width: 25px;
  height: 25px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #E8E8E8;
  margin-left: 2px;
}

.completion-radio input[type=radio]:checked {
  appearance: none;
}

.completion-radio input[type=radio]:checked {
  width: 25px;
  height: 25px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}

.completion-table-text input[type=text] {
  text-align: center;
  width: 175px;
}

.completion-table-text input[type=text]:focus {
  outline: none;
}

.completion-audio {
  width: 136px;
}

.completion-audio::-webkit-media-controls-panel {
  background-color: #FAFAFA;
  padding-left: 0px;
  padding-right: 0px;
}

.completion-audio::-webkit-media-controls-time-remaining-display{
  display: none;
}

.completion-audio::-webkit-media-controls-current-time-display{
  display: none;
}
</style>