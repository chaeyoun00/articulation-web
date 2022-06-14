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

    <v-layout justify-center column class="geriatric-form2">
      <p class="test-title">GDS (Geriatric Depression Scale)</p>
      <table class="geriatric-table1">
        <tr>
          <td class="geriatric-table-header1"><div class="rect" /></td>
          <td class="geriatric-table-header3">예</td>
          <td class="geriatric-table-header4">아니오</td>
        </tr>
        <tr>
          <td class="geriatric-table-content3">1 ~ 30문항</td>
          <td class="geriatric-table-content2">
            <textarea class="geriatric-table-vlaue" rows="1" placeholder="갯수 입력" v-model="yes"/>
          </td>
          <td class="geriatric-table-content2">
            <textarea class="geriatric-table-vlaue" rows="1" placeholder="갯수 입력" v-model="no"/>
          </td>
        </tr>
      </table>
      <table class="geriatric-table2">
        <tr>
          <td class="geriatric-table-header1"><div class="rect">갯수</div></td>
          <td class="geriatric-table-header2">결과</td>
        </tr>
        <tr class="geriatric-table-text">
          <td class="geriatric-table-content1">0 ~ 13</td>
          <td class="geriatric-table-content2">평균범위</td>
        </tr>
        <tr class="geriatric-table-text">
          <td class="geriatric-table-content1">14 ~ 18</td>
          <td class="geriatric-table-content2">경도의 우울증</td>
        </tr>
        <tr class="geriatric-table-text">
          <td class="geriatric-table-content1">19 ~ 21</td>
          <td class="geriatric-table-content2">중도의 우울증</td>
        </tr>
        <tr>
          <td class="geriatric-table-content3">22점 이상</td>
          <td class="geriatric-table-content2">심도의 우울증</td>
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="geriatric-form3">
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
    yes: '',
    no: '',
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

      await axios.get('/api/recognitionSummary?type=Geriatric_Depression&resId=' + this.resId)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(',')[0]);
        this.yes = response.data.data[0].rs_answer.slice(1, -1).split(',')[0]
        this.no = response.data.data[0].rs_answer.slice(1, -1).split(',')[1]
        this.id = response.data.data[0].rs_summery_id;
        this.flag = 1
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    Save () {
      const answer = [this.yes, this.no]

      if (this.flag === 1) {
        const data = {
          'id': this.id,
          'resId': this.resId.toString(),
          'userId': this.user[0].u_id,
          'type': 'Geriatric_Depression',
          'totalQuestionNum': '1',
          'answers': '[' + answer + ']', 
        }
        console.log(data)
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
          'type': 'Geriatric_Depression',
          'totalQuestionNum': '1',
          'answers': '[' + answer + ']', 
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

.geriatric-form2 {
  padding-top: 48px;
  padding-left: 165px;
  padding-right: 166px;
}

.geriatric-form3 {
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

table.geriatric-table1 {
  width: 1045px;
  height: 134px;
  border-collapse: collapse;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-radius: 21px;
  opacity: 1;
}

table.geriatric-table2 {
  width: 1045px;
  height: 332px;
  border-collapse: collapse;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-radius: 21px;
  opacity: 1;
  margin-top: 76px;
}

tr.geriatric-table-text {
  border-bottom: 1px solid #C9C9C9;
  text-align: center;
}

.rect {
  width: 395px;
  height: 68px;
  background-color: #E8E8E8;
  border-radius: 21px 0px 0px 21px;
  padding-top: 15px;
}

td.geriatric-table-header1 {
  background-color: #F4F4F4;
  border-radius: 21px 0px 0px 0px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

td.geriatric-table-header2 {
  background-color: #E8E8E8;
  border-radius: 0px 21px 21px 0px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.geriatric-table-header3 {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  width: 325px;
}

td.geriatric-table-header4 {
  background-color: #E8E8E8;
  border-radius: 0px 21px 21px 0px;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.geriatric-table-content1 {
  background-color: #F4F4F4;
  width: 395px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.geriatric-table-content2 {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
}

td.geriatric-table-content3 {
  background-color: #F4F4F4;
  width: 395px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
  text-align: center;
  border-radius: 0px 0px 0px 21px;
}

textarea.geriatric-table-vlaue {
  width: 90%;
  height: 70%;
  margin-top: 18px;
  resize: none;
  text-align: center;
}

textarea:focus.geriatric-table-vlaue {
  outline: none;
}

::placeholder {
  color: #C1C1C1;
}
</style>