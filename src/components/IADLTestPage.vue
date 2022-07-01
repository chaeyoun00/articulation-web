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
    
    <v-layout justify-center column class="iadl-form2">
      <p class="test-title">IADL (Instrumental Activities of Daily Living)</p>
      <table class="iadl-table">
        <tr>
          <td class="iadl-table-header"><div class="rect"></div></td>
          <td class="iadl-table-header1">1:완전 자립</td>
          <td class="iadl-table-header1">2:감독필요</td>
          <td class="iadl-table-header1">3:약간의 도움</td>
          <td class="iadl-table-header1">4:상당한 도움</td>
          <td class="iadl-table-header2">5:전적인 도움</td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">A. 전화 사용능력</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[0]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[0]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[0]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="4" v-model="picked[0]"></div>
          </td>
          <td></td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">B. 물건 사기</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[1]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[1]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[1]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="4" v-model="picked[1]"></div>
          </td>
          <td></td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">C. 음식 준비하기</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[2]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[2]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[2]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="4" v-model="picked[2]"></div>
          </td>
          <td></td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">D. 집안일 하기</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[3]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[3]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[3]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="4" v-model="picked[3]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="5" v-model="picked[3]"></div>
          </td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">E. 빨래하기</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[4]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[4]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[4]"></div>
          </td>
          <td colspan="2"></td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">F. 교통수단 이용</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[5]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[5]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[5]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="4" v-model="picked[5]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="5" v-model="picked[5]"></div>
          </td>
        </tr>
        <tr class="iadl-table-text">
          <td class="iadl-table-title">G. 약 복용하기</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[6]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[6]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[6]"></div>
          </td>
          <td colspan="2"></td>
        </tr>
        <tr class="iadl-table-text1">
          <td class="iadl-table-title1">H. 돈 관리 능력</td>
          <td>
            <div class="iadl-radio"><input type="radio" value="1" v-model="picked[7]"></div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="2" v-model="picked[7]"> </div>
          </td>
          <td>
            <div class="iadl-radio"><input type="radio" value="3" v-model="picked[7]"></div>
          </td>
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="iadl-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="Send(), toTest()"
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
    picked: [],
    flag: 0,
    id: '',
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    toTest() {
      this.$router.push('/cognitive')
    },
    async initialize () {
      const config = {
        method: 'get',
        url: this.$API_SERVER +'http://101.79.81.183:3000/api/examUsers?id=' + this.$route.query.patient
      }
      await axios(config)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.user = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })

      this.resId = this.$route.query.resId;

      const configRecognition = {
        method: 'get',
        url: this.$API_SERVER +'/api/recognitionSummary?type=IADL&resId=' + this.resId
      }
      await axios(configRecognition)
      .then(response => {
        if (response.data.data.length > 0) {
          this.picked = response.data.data[0].rs_answer.slice(1, -1).split(',')
          this.id = response.data.data[0].rs_summery_id;
          this.flag = 1
        }
       
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    Send() {
      for (let i = 0; i < 8; i++) {
        if(!this.picked[i]) {
          this.picked[i] = "-1"
        }
      }
      console.log(this.picked)
      if (this.flag === 1) {
        const data = {
          'id': this.id,
          'resId': this.resId.toString(),
          'userId': this.user[0].u_id,
          'type': 'IADL',
          'totalQuestionNum': '8',
          'answers': '[' + this.picked + ']', 
        }

        var config = {
          method: 'put',
          url: this.$API_SERVER +'/api/recognitionSummary',
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
          'type': 'IADL',
          'totalQuestionNum': '8',
          'answers': '[' + this.picked + ']', 
        }

        var config = {
          method: 'post',
          url: this.$API_SERVER +'/api/recognitionSummary',
          headers: {
            'memberId': localStorage.getItem("Id"),
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        }
      }

      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style>

.iadl-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.iadl-form3 {
  padding-top: 90px;
  padding-left: 165px;
  padding-right: 166px;
  padding-bottom: 90px;
}

.patient-inform.v-card.v-sheet.theme--light {
  height: 222px;
  box-shadow: 0px 1px 6px #0000004D;
  border-radius: 19px;
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

table.iadl-table {
  width: 1045px;
  height: 600px;
  border-collapse: collapse;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-radius: 21px;
  opacity: 1;
}

td.iadl-table-header {
  background-color: #F4F4F4;
  border-radius: 21px 0px 0px 0px;
  width: 245px;
}

td.iadl-table-header1 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  height: 68px;
  text-align: center;
}

.rect {
  width: 245px;
  height: 68px;
  background-color: #E8E8E8;
  border-radius: 21px 0px 0px 21px;
}

td.iadl-table-header2 {
  background-color: #E8E8E8;
  border-radius: 0px 21px 21px 0px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
  text-align: center;
}

td.iadl-table-title {
  background-color: #F4F4F4;
  text-align: center;
  height: 66px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
}

td.iadl-table-title1 {
  background-color: #F4F4F4;
  border-radius: 0px 0px 0px 21px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 20px;
  letter-spacing: 0px;
}

tr.iadl-table-text {
  border-bottom: 1px solid #C9C9C9;
  text-align: center;
}

tr.iadl-table-text1 {
  text-align: center;
}

div.iadl-radio {
  display: inline-flex;
  align-items: center
}

.iadl-radio input[type=radio] {
  appearance: none;
}

.iadl-radio input[type=radio] {
  display: inline;
  width: 33px;
  height: 33px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #707070;
}

.iadl-radio input[type=radio]:checked {
  appearance: none;
}

.iadl-radio input[type=radio]:checked {
  width: 33px;
  height: 33px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}
</style>