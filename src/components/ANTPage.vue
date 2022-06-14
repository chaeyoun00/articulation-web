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

    <v-layout justify-center column class="ant-form2">
      <p class="test-title">ANT</p>
      <table class="ant-table">
        <thead>
          <tr>
            <td class="ant-table-header" style="border-radius: 21px 0px 0px 21px">#</td>
            <td class="ant-table-header" style="width: 80px">논항</td>
            <td class="ant-table-header" style="width: 200px">목표동사</td>
            <td class="ant-table-header1" style="border-right: 1px solid #C9C9C9">IE</td>
            <td class="ant-table-header1" style="border-right: 1px solid #C9C9C9">IU</td>
            <td class="ant-table-header1" style="border-right: 1px solid #C9C9C9">2</td>
            <td class="ant-table-header1">3</td>
            <td class="ant-table-header" style="border-radius: 0px 21px 21px 0px">파일</td>
          </tr>
        </thead>

        <tbody v-for="i in questions.length" v-bind:key="i">
          <tr>
            <td v-if="i == questions.length" class="ant-table-content" style="border-radius: 0px 0px 0px 21px; background-color: #FAFAFA">{{ i }}</td>
            <td v-else class="ant-table-content" style="background-color: #FAFAFA">{{ i }}</td>
            <td class="ant-table-content" style="background-color: #FAFAFA">
              {{ num[i - 1] }}
            </td>
            <td class="ant-table-content" style="background-color: #FAFAFA">{{ questions[i - 1].q_body }}</td>
            <td class="ant-table-content">
              <div class="ant-radio"><input type="radio" value="IE" v-model="picked[i - 1]"></div>
            </td>
            <td class="ant-table-content">
              <div class="ant-radio"><input type="radio" value="IU" v-model="picked[i - 1]"></div>
            </td>
            <td class="ant-table-content">
              <div class="ant-radio"><input type="radio" value="2" v-model="picked[i - 1]"></div>
            </td>
            <td class="ant-table-content">
              <div class="ant-radio"><input type="radio" value="3" v-model="picked[i - 1]"></div>
            </td>
            <td class="ant-table-content" style="width: 300px">
              <audio :id="questions[i - 1].q_id" controls controlsList="nodownload noplaybackrate" class="ant-audio"></audio>
            </td>
          </tr>
        </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="ant-form3">
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

export default {
  data: () => ({
    user: [{
      u_id: '',
    }],
    questions: [],
    picked: [],
    num: [],
    resId: '',
    antAnswer: [],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
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

      await axios.get('/api/questions/question?type=ANT')
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.questions = response.data.data
        for (let i = 0; i < this.questions.length; i++){
          this.questions[i].q_data = String.fromCharCode(...this.questions[i].q_data.data)
          if (JSON.parse(this.questions[i].q_data)["type_of_question"] === "ex") {
            this.num[i] = "P" + JSON.parse(this.questions[i].q_data)["no"].replace('0', '')
          }
          else {
            this.num[i] = JSON.parse(this.questions[i].q_data)["no"].replace('0', '')
          }
        }
        //console.log(String.fromCharCode(...this.questions[0].q_data.data).split("\"")[11])
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/answerPapers?type=ANT&examId=' + this.resId)
      .then(response => {
        var uint8;
        var audio;
        for (let i = 0; i < response.data.data.length; i++) {
          uint8 = new Uint8Array(response.data.data[i].a_data.data);
          var blob = new Blob([uint8], { type: 'audio' });
          var blobUrl = URL.createObjectURL(blob);
          audio = document.getElementById(response.data.data[i].a_question_id)
          audio.src = blobUrl;
          //console.log(audio)
        }
        //console.log(this.audioURL)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/languageSummary?type=ANT&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.antAnswer = response.data.data;
        //console.log(this.antAnswer[0].lg_answer)
        this.picked = this.antAnswer[0].lg_answer.slice(1, -1).split(',')
      })
      .catch(error => {
        alert("해당 검사를 하지 않은 환자입니다. 다시 확인해주세요.")
        this.$router.go(-1)
      })
    },
    ToTest() {
      Object.assign(this.$data, this.$options.data())
      //this.$router.push('/main')
      this.$router.go(-1)
    },
    Save() {
      const data = {
        'id': this.antAnswer[0].lg_summery_id,
        'answers': '[' + this.picked + ']',
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
    },
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

td.ant-table-content {
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
  height: 60px;
  text-align: center;
  border-bottom: 1px solid #C9C9C9;
}

.ant-input input[type=text] {
  text-align: center;
}

.ant-input input[type=text]:focus {
  outline: none;
}

div.ant-radio {
  display: inline-flex;
  align-items: center
}

.ant-radio input[type=radio] {
  appearance: none;
}

.ant-radio input[type=radio] {
  display: inline;
  width: 33px;
  height: 33px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #E8E8E8;
}

.ant-radio input[type=radio]:checked {
  appearance: none;
}

.ant-radio input[type=radio]:checked {
  width: 33px;
  height: 33px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}

audio {
  width: 250px;
}

.ant-audio::-webkit-media-controls-panel {
  background-color: #ffffff; 
}
</style>