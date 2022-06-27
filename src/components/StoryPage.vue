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

    <v-layout justify-center column class="story-form2">
      <p class="test-title">Story Telling (흥부놀부 이야기 만들기)</p>
      <table class="story-table">
        <tbody v-for="i in questions.length" v-bind:key="i">
          <tr v-if="i == 1">
            <td class="story-table-title" style="border-radius: 21px 21px 0px 0px;">
              {{ i }}번째 그림
              <audio :id="questions[i - 1].q_id" controls controlsList="nodownload noplaybackrate"></audio>
            </td>
            <td class="story-table-text">
              <textarea class="story-table-content" placeholder="환자 발화 입력" v-model="image[i - 1]"></textarea>  
            </td> 
          </tr>
          <tr v-else-if="i == questions.length">
            <td class="story-table-title" style="border-radius: 0px 0px 21px 21px;">
              {{ i }}번째 그림
              <audio :id="questions[i - 1].q_id" controls controlsList="nodownload noplaybackrate"></audio>
            </td>
            <td class="story-table-text">
              <textarea class="story-table-content" placeholder="환자 발화 입력" v-model="image[i - 1]"></textarea>  
            </td> 
          </tr>
          <tr v-else>
            <td class="story-table-title">
              {{ i }}번째 그림
              <audio :id="questions[i - 1].q_id" controls controlsList="nodownload noplaybackrate"></audio>
            </td>
            <td class="story-table-text">
              <textarea class="story-table-content" placeholder="환자 발화 입력" v-model="image[i - 1]"></textarea>  
            </td> 
          </tr>
        </tbody>
      </table>
    </v-layout>

    <v-layout justify-center class="story-form3">
      <v-btn
        depressed
        class="submit-btn"
        @click="save(), toTest()"
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
    resId: '',
    image: [],
    questions: [],
    storyAnswer: [],
    date: [],
    latest:'',
    idList: [],
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
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
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

      await axios.get('/api/questions/noimage?type=Story_Telling')
      .then(response => {
        this.questions = response.data.data
        //console.log(String.fromCharCode(...this.questions[0].q_data.data).split("\"")[11])
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/answerPapers?type=Story_Telling&examId=' + this.resId)
      .then(response => {
        var uint8;
        var audio;
        for (let i = 0; i < response.data.data.length; i++) {
          uint8 = new Uint8Array(response.data.data[i].a_data.data);
          var blob = new Blob([uint8], { type: 'audio' });
          var blobUrl = URL.createObjectURL(blob);
          audio = document.getElementById(this.questions[i].q_id)
          audio.src = blobUrl;
          this.idList.push(this.questions[i].q_id)
        }
        //console.log(this.audioURL)
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/languageSummary?type=Story_Telling&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.storyAnswer = response.data.data;
        this.image = this.storyAnswer[0].lg_answer.slice(1, -1).split(',')
      })
      .catch(error => {
      })    
    },
    save() {
      
      const data = {
        'id': this.storyAnswer[0].lg_summery_id,
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
    },
    async handleChange(event) {
      await axios.get('/api/examReservations/recent?userId=' + this.$route.query.patient + '&date=' + event)
      .then(response => {
        this.resId = response.data.data[0].e_id;
      })
      .catch(error => {
        console.log(error)
      })

      await axios.get('/api/questions/noimage?type=Story_Telling')
      .then(response => {
        this.questions = response.data.data
        //console.log(String.fromCharCode(...this.questions[0].q_data.data).split("\"")[11])
      })
      .catch(error => {
        console.log(error.response)
      })

      await axios.get('/api/answerPapers?type=Story_Telling&examId=' + this.resId)
      .then(response => {
        var uint8;
        var audio;
        for (let j = 0; j < this.idList.length; j++) {
          audio = document.getElementById(this.idList[j])
          audio.src = '';
        }
        this.idList = [];

        for (let i = 0; i < response.data.data.length; i++) {
          uint8 = new Uint8Array(response.data.data[i].a_data.data);
          var blob = new Blob([uint8], { type: 'audio' });
          var blobUrl = URL.createObjectURL(blob);
          audio = document.getElementById(this.questions[i].q_id)
          audio.src = blobUrl;
          this.idList.push(this.questions[i].q_id)
        }
        //console.log(this.audioURL)
      })
      .catch(error => {
        console.log(error)
      })

      await axios.get('/api/languageSummary?type=Story_Telling&userId=' + this.user[0].u_id + '&resId=' + this.resId)
      .then(response => {
        this.storyAnswer = response.data.data;
        this.image = this.storyAnswer[0].lg_answer.slice(1, -1).split(',')
      })
      .catch(error => {
        this.image = [];
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
  height: 222px;
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

audio {
  width: 250px;
}

audio::-webkit-media-controls-panel { 
  background-color: #E8E8E8; 
}

.date-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 453px;
  height: 49px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
}
</style>