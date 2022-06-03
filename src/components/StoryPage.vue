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

    <v-layout justify-center column class="story-form2">
      <p class="test-title">Story Telling (흥부놀부 이야기 만들기)</p>
      <table class="story-table">
        <tr>
          <td class="story-table-title" style="border-radius: 21px 21px 0px 0px;">1번 그림</td>
          <td class="story-table-text">
            <textarea name="content1" class="story-table-content" placeholder="환자 발화 입력"></textarea>
          </td>         
        </tr>
        <tr>
          <td class="story-table-title">2번 그림</td>
          <td class="story-table-text">
            <textarea name="content2" class="story-table-content" placeholder="환자 발화 입력"></textarea>  
          </td>         
        </tr>
        <tr>
          <td class="story-table-title">3번 그림</td>
          <td class="story-table-text">
            <textarea name="content3" class="story-table-content" placeholder="환자 발화 입력"></textarea>  
          </td>         
        </tr>
        <tr>
          <td class="story-table-title">4번 그림</td>
          <td class="story-table-text">
            <textarea name="content4" class="story-table-content" placeholder="환자 발화 입력"></textarea>  
          </td>         
        </tr>
        <tr>
          <td class="story-table-title">5번 그림</td>
          <td class="story-table-text">
            <textarea name="content5" class="story-table-content" placeholder="환자 발화 입력"></textarea>  
          </td>         
        </tr>
        <tr>
          <td class="story-table-title">6번 그림</td>
          <td class="story-table-text">
            <textarea name="content6" class="story-table-content" placeholder="환자 발화 입력"></textarea>  
          </td>         
        </tr>
        <tr>
          <td class="story-table-title">7번 그림</td>
          <td class="story-table-text">
            <textarea name="content7" class="story-table-content" placeholder="환자 발화 입력"></textarea>  
          </td>         
        </tr>
        <tr>
          <td class="story-table-title" style="border-radius: 0px 0px 21px 21px;">8번 그림</td>
          <td class="story-table-text">
            <textarea name="content8" class="story-table-content" placeholder="환자 발화 입력"></textarea>
          </td>         
        </tr>
      </table>
    </v-layout>

    <v-layout justify-center class="story-form3">
      <v-btn
        depressed
        class="submit-btn"
      >저장</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    user: [{
      u_id: '',
    }],
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
      axios.get('/api/examUsers?id=' + this.$route.query.patient)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        //console.log(response.data.data)
        this.user = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })

      axios.get('/api/answerPapers?type=Story_Telling&userId=' + this.u_id)
      .then(response => {
        console.log(JSON.stringify(response.data));
        //this.items.push(response.data.data)
        //this.items = response.data.data
        //console.log(this.items)
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>
.story-form2 {
  padding-top: 48px;
  padding-left: 177px;
  padding-right: 178px;
}

.story-form3 {
  padding-top: 171px;
  padding-left: 177px;
  padding-right: 178px;
  padding-bottom: 140px;
}

.language-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 495px;
  height: 46px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}

table.story-table {
  border-radius: 21px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  width: 1044px;
  height: 1783px;
}

td.story-table-title {
  background-color: #E8E8E8;
  text-align: center;
  color: #678FFF;
  border-bottom: 1px solid #C9C9C9;
  width: 209px;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
}

td.story-table-text {
  border-bottom: 1px solid #C9C9C9;
}

textarea.story-table-content {
  width: 95%;
  height: 93%;
  margin-top: 10px;
  margin-left: 20px;
  resize: none;
  font-family: 'Noto Sans KR Regular';
  font-size: 25px;
  letter-spacing: 0px;
}

textarea:focus.story-table-content {
  outline: none;
}
</style>