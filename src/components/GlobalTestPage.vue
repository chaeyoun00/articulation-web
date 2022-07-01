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

    <v-layout justify-center column class="global-form2">
      <p class="test-title">GDS (Global Deterioration scale)</p>
      <table class="global-table">
        <tr>
          <td class="global-table-header">선택</td>
          <td class="global-table-header1">단계</td>
          <td class="global-table-header2">결과</td>
        </tr>
        <tr class="global-table-text">
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="1" v-model="picked"></div>
          </td>
          <td class="global-table-content1">1</td>
          <td class="global-table-content2">인지장애 없음</td>
        </tr>
        <tr class="global-table-text">
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="2" v-model="picked"></div>
          </td>
          <td class="global-table-content1">2</td>
          <td class="global-table-content2">매우 경미한 인지장애</td>
        </tr>
        <tr class="global-table-text">
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="3" v-model="picked"></div>
          </td>
          <td class="global-table-content1">3</td>
          <td class="global-table-content2">경미한 인지장애</td>
        </tr>
        <tr class="global-table-text">
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="4" v-model="picked"></div>
          </td>
          <td class="global-table-content1">4</td>
          <td class="global-table-content2">중증도 인지장애</td>
        </tr>
        <tr class="global-table-text">
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="5" v-model="picked"></div>
          </td>
          <td class="global-table-content1">5</td>
          <td class="global-table-content2">초기 중증의 인지장애</td>
        </tr>
        <tr class="global-table-text">
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="6" v-model="picked"></div>
          </td>
          <td class="global-table-content1">6</td>
          <td class="global-table-content2">중증의 인지장애</td>
        </tr>
        <tr>
          <td class="global-table-content">
            <div class="global-radio"><input type="radio" value="7" v-model="picked"></div>
          </td>
          <td class="global-table-content1">7</td>
          <td class="global-table-content2">후기 중증의 인지장애</td>
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="global-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="Send(), toTest()"
      >완료</v-btn>
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
    picked: '',
    flag: 0,
    id: '',
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    toTest() {      
      //this.$router.push('/main')
      this.$router.push('/cognitive')
    },
    async initialize () {
      const config = {
        method: 'get',
        url: this.$API_SERVER +'/api//examUsers?id=' + this.$route.query.patient
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
					url:
						this.$API_SERVER +
						'/api/recognitionSummary?type=Global_Deterioraion&resId=' + this.resId
				};

      await axios(configRecognition)
      .then(response => {
        console.log(response.data.data[0].rs_answer.slice(1, -1))
        this.picked = response.data.data[0].rs_answer.slice(1, -1)
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
          'type': 'Global_Deterioraion',
          'totalQuestionNum': '1',
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
          'type': 'Global_Deterioraion',
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

.global-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.global-form3 {
  padding-top: 148px;
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

.v-input.test-select.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--solo-flat.v-text-field--is-booted.v-text-field--enclosed.v-select {
  width: 113px;
}

table.global-table {
  width: 1045px;
  height: 530px;
  border-collapse: collapse;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-radius: 21px;
  opacity: 1;
}

tr.global-table-text {
  border-bottom: 1px solid #C9C9C9;
  text-align: center;
}

td.global-table-header {
  background-color: #E8E8E8;
  border-radius: 21px 0px 0px 21px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.global-table-header1 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.global-table-header2 {
  background-color: #E8E8E8;
  border-radius: 0px 21px 21px 0px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.global-table-content {
  text-align: center;
  width: 102px;
}

td.global-table-content1 {
  background-color: #F4F4F4;
  width: 294px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.global-table-content2 {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

div.global-radio {
  display: inline-flex;
  align-items: center
}

.global-radio input[type=radio] {
  appearance: none;
}

.global-radio input[type=radio] {
  display: inline;
  width: 33px;
  height: 33px;
  margin-top: 8px;
  border-radius: 50%;
  border: 1px solid #E8E8E8;
}

.global-radio input[type=radio]:checked {
  appearance: none;
}

.global-radio input[type=radio]:checked {
  width: 33px;
  height: 33px;
  border: 1px solid #707070;
  border-radius: 50%;
  background-color: #707070;
}
</style>