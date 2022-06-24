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

    <v-layout justify-center column class="step-form2">
      <p class="test-title">절차 설명하기</p>
      <table class="step-table">
        <tr>
          <td class="step-table-title1">
            라면 끓이기
            <audio id=0 controls controlsList="nodownload noplaybackrate"></audio>
          </td>
          <td class="step-table-text">
            <textarea name="content1" class="step-table-content" placeholder="환자 발화 입력" v-model="image[0]"></textarea>
          </td>         
        </tr>
        <tr>
          <td class="step-table-title2">
            양치질하기
            <audio id=1 controls controlsList="nodownload noplaybackrate"></audio>
          </td>
          <td class="step-table-text">
            <textarea name="content2" class="step-table-content" placeholder="환자 발화 입력" v-model="image[1]"></textarea>
          </td>         
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="step-form3">
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
    resId: '',
    image: [],
    stepAnswer: [],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    ToTest() {
      Object.assign(this.$data, this.$options.data())
      this.$router.push('/language')
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

      await axios.get('/api/answerPapers?type=Explain_Procedure&examId=' + this.resId)
      .then(response => {
        var uint8;
        var audio;
        for (let i = 0; i < response.data.data.length; i++) {
          uint8 = new Uint8Array(response.data.data[i].a_data.data);
          var blob = new Blob([uint8], { type: 'audio' });
          var blobUrl = URL.createObjectURL(blob);
          audio = document.getElementById(i)
          audio.src = blobUrl;
          //console.log(audio)
        }
        //console.log(this.audioURL)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/languageSummary?type=Explain_Procedure&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.stepAnswer = response.data.data;
        this.image = this.stepAnswer[0].lg_answer.slice(1, -1).split(',')
      })
      .catch(error => {
        alert("해당 검사를 하지 않은 환자입니다. 다시 확인해주세요.")
        this.$router.go(-1)
      })     
    },
    Save() {
      const data = {
        'id': this.stepAnswer[0].lg_summery_id,
        'answers': '[' + this.image + ']'
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
.step-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.step-form3 {
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

table.step-table {
  border-radius: 21px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  height: 1333px;
}

td.step-table-title1 {
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

td.step-table-title2 {
  background-color: #E8E8E8;
  border-radius: 0px 0px 21px 21px;
  text-align: center;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
}

td.step-table-text {
  border-bottom: 1px solid #C9C9C9;
}

textarea.step-table-content {
  width: 95%;
  height: 93%;
  margin-top: 10px;
  margin-left: 20px;
  resize: none;
  font-family: 'Noto Sans KR Regular';
  font-size: 25px;
  letter-spacing: 0px;
}

textarea:focus.step-table-content {
  outline: none;
}
</style>