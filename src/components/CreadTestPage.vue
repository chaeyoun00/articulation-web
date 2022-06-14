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

    <v-layout justify-center column class="cread-form2">
      <p class="test-title">CREAD-K (NP)</p>
      <table class="cread-table1">
        <tr>
          <td class="cread-table-header"><div class="rect">TESTS</div></td>
          <td class="cread-table-header1">Total score (raw)</td>
          <td class="cread-table-header1" style="border-radius: 0px 21px 21px 0px;">Z - score</td>
        </tr>
        <tr>
          <td class="cread-table-content">J3. MMSE-KC</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[0]">
              <label for="textarea">/ 30</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[1]">
            </div>
          </td>
        </tr>
      </table>

      <table class="cread-table2">
        <tr>
          <td class="cread-table-header"><div class="rect">TESTS</div></td>
          <td class="cread-table-header1">Total score (raw)</td>
          <td class="cread-table-header1" style="border-radius: 0px 21px 21px 0px;">Z - score</td>
        </tr>
        <tr>
          <td class="cread-table-content2">J1. 언어유창성 검사: "동물 범주"</td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[2]">
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[3]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">J2. 보스톤 이름대기 검사</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[4]">
              <label for="textarea">/ 15</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[5]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">J4. 단어목록 기억검사</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[6]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[7]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color: #FAFAFA">(1)</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[8]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[9]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color: #FAFAFA">(2)</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[10]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[11]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color: #FAFAFA">(3)</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[12]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[13]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">J6. 단어목록 회상 검사</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[14]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[15]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color: #FAFAFA">(회상률 %)</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[16]">
              <label for="textarea">/ 100</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[17]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">J7. 단어목록 재인검사</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[18]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[19]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color: #FAFAFA">예</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[20]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[21]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color: #FAFAFA">아니오</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[22]">
              <label for="textarea">/ 10</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[23]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">J5. 구성행동 검사</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[24]">
              <label for="textarea">/ 11</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[25]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">J8. 구성회상 검사</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[26]">
              <label for="textarea">/ 11</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[27]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color:#E8E8E8">총점 I</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[28]">
              <label for="textarea">/ 11</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[29]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2" style="background-color:#E8E8E8">총점 II</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[30]">
              <label for="textarea">/ 11</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[31]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">STROOP 단어페이지</td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[32]">
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[33]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">색깔페이지</td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[34]">
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[35]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">색깔 - 단어페이지</td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[36]">
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[37]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content2">길찾기 A</td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[38]">
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[39]">
            </div>
          </td>
        </tr>

        <tr>
          <td class="cread-table-content">길찾기 B</td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[40]">
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[41]">
            </div>
          </td>
        </tr>
      </table>

      <p class="test-title" style="margin-top: 87px;">CREAD-K (Clinical)</p>
      <table class="cread-table1">
        <tr>
          <td class="cread-table-header"><div class="rect">TESTS</div></td>
          <td class="cread-table-header1">Total score (raw)</td>
          <td class="cread-table-header1" style="border-radius: 0px 21px 21px 0px;">Z - score</td>
        </tr>
        <tr>
          <td class="cread-table-content">C4. SBT-K</td>
          <td class="cread-table-content1">
            <div class="cread-score1">
              <input type="text" id="textarea" placeholder="0" v-model="scores[42]">
              <label for="textarea">/ 10~28(최대장애)</label>
            </div>
          </td>
          <td class="cread-table-content1">
            <div class="cread-score2">
              <input type="text" id="textarea" placeholder="점수 입력" v-model="scores[43]">
            </div>
          </td>
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="cread-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="Send(), ToTest()"
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
    scores: [],
    flag: 0,
    id: '',
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    ToTest() {
      this.$router.push('/cognitive')
    },
    async initialize () {
      await axios.get('/api/examUsers?id=' + this.$route.query.patient)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.user = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })

      this.resId = this.$route.query.resId;

      await axios.get('/api/recognitionSummary?type=CREAD-K&resId=' + this.resId)
      .then(response => {
        this.scores = response.data.data[0].rs_answer.slice(1, -1).split(',')
        this.id = response.data.data[0].rs_summery_id;
        this.flag = 1
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    Send() {
      if (this.flag === 1) {
        const data = {
          'id': this.id,
          'resId': this.resId.toString(),
          'userId': this.user[0].u_id,
          'type': 'CREAD-K',
          'totalQuestionNum': '8',
          'answers': '[' + this.scores + ']', 
        }

        var config = {
          method: 'put',
          url: 'http://49.50.172.137:3000/api/recognitionSummary',
          headers: {
            'memberId': localStorage.getItem("Id"),
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        }
      }
      else {
        const data = {
          'resId': this.resId.toString(),
          'userId': this.user[0].u_id,
          'type': 'CREAD-K',
          'totalQuestionNum': '8',
          'answers': '[' + this.scores + ']', 
        }

        var config = {
          method: 'post',
          url: 'http://49.50.172.137:3000/api/recognitionSummary',
          headers: {
            'memberId': localStorage.getItem("Id"),
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        }
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
.patient-card {
  padding-top: 57px;
  padding-left: 165px;
  padding-right: 166px;
  padding-bottom: 100px;
}

.cread-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.cread-form3 {
  padding-top: 148px;
  padding-left: 165px;
  padding-right: 166px;
  padding-bottom: 178px;
}

.patient-inform.v-card.v-sheet.theme--light {
  height: 222px;
  box-shadow: 0px 1px 6px #0000004D;
  border-radius: 19px;
}

table.patient-table {
  height: 180px;
  width: 970px;
}

tr.patient-table-header {
  color: #678FFF;
  font-family: 'Noto Sans KR Regular';
  font-size: 16px;
  letter-spacing: 0px;
}

tr.patient-table-body {
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
}

.row.select-form {
  padding-top: 92px;
  padding-left: 10px;
  padding-bottom: 40px;
  display: flex;
}

.test-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 314px;
  height: 46px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}

.cognitive-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 495px;
  height: 46px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}

.v-input.test-select.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--solo-flat.v-text-field--is-booted.v-text-field--enclosed.v-select {
  width: 113px;
}

.v-application p.test-title {
  margin-bottom: 52px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
}

table.cread-table1 {
  width: 1045px;
  height: 135px;
  border-collapse: collapse;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-radius: 21px;
  opacity: 1;
}

table.cread-table2 {
  width: 1045px;
  height: 1398px;
  border-collapse: collapse;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-radius: 21px;
  opacity: 1;
  margin-top: 76px;
}

.rect {
  width: 395px;
  height: 68px;
  background-color: #E8E8E8;
  border-radius: 21px 0px 0px 21px;
  padding-top: 15px;
}

td.cread-table-header {
  background-color: #F4F4F4;
  border-radius: 21px 0px 0px 0px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
  width: 395px;
}

td.cread-table-header1 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.cread-table-content {
  background-color: #F4F4F4;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  border-radius: 0px 0px 0px 21px;
}

td.cread-table-content1 {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  width: 395px;
}

td.cread-table-content2 {
  background-color: #F4F4F4;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  border-bottom: 1px solid #C9C9C9;
}

textarea.cread-table-vlaue {
  width: 90%;
  height: 70%;
  margin-top: 18px;
  resize: none;
  text-align: center;
}

textarea:focus.cread-table-vlaue {
  outline: none;
}

.cread-score1 input[type=text] {
  text-align: center;
  width: 27px;
}

.cread-score1 input[type=text]:focus {
  outline: none;
}

.cread-score2 input[type=text] {
  text-align: center;
  width: 100px;
}

.cread-score2 input[type=text]:focus {
  outline: none;
}

</style>

/* 
.v-data-table__wrapper > table > tbody > tr:hover {
  background: inherit !important;
}
*/