<template>
  <v-container>
    <v-layout class="back-form">
      <v-btn 
        text
        @click="ToMain()"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>

    <v-layout justify-center>
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
      >
        <form @submit.prevent="Submit" class="question-form1">
          <v-flex>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>문제지 유형 선택</p>
                <p class="require-label">*</p>
              </v-row>
              <v-select
                v-model="test"
                :error-messages="errors"
                :items="test_items"
                solo
                flat
                label="유형 선택"
                class="question-select"
              ></v-select>
            </validation-provider>

            <v-row class="input-label">
              <p>문제 유형 선택</p>
            </v-row>
            <v-select
              v-model="type"
              :items="type_items"
              solo
              flat
              label="유형 선택"
              class="question-select"
            ></v-select>

            <v-row class="input-label">
              <p>문제 번호</p>
            </v-row>
            <v-text-field
              class="input-text"
              solo
              flat
              label="문제 번호"
              v-model="id"          
            ></v-text-field>

            <v-row class="input-label">
              <p>문제 내용</p>
            </v-row>
            <v-text-field
              class="input-text"
              solo
              flat
              label="문제 내용"
              v-model="text"          
            ></v-text-field>

            <v-row class="input-label">
              <p>문제 답</p>
            </v-row>
            <v-text-field
              class="input-text"
              solo
              flat
              label="문제 답"
              v-model="answer"          
            ></v-text-field>

            <v-row class="input-label">
              <p>그림 첨부</p>
            </v-row>
            <div class="file">
              <input type="text" class="file_text" readonly :value="file_name" accept="image/*">
              <label class="file_label" for="pic_file">파일 첨부</label>
              <input type="file" class="input_file" id="pic_file" @change="handleFileChange"/>
            </div>
            <br>

            <v-row class="input-label">
              <p>그림 첨부</p>
            </v-row>
            <div class="file">
              <input type="text" class="file_text" readonly :value="file_name1" accept="image/*">
              <label class="file_label" for="pic_file1">파일 첨부</label>
              <input type="file" class="input_file" id="pic_file1" @change="handleFileChange1"/>
            </div>
            <br>

          </v-flex>
          <v-layout justify-center class="question-form2">
            <v-btn       
              :disabled="invalid"
              depressed
              @click="AddQuestion(), ToMain()"
              class="submit-btn"
            >등록</v-btn>
          </v-layout>
        </form>
      </validation-observer>
    </v-layout>
  </v-container>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import axios from 'axios'
import qs from 'qs'

extend('required', {
  ...required,
  message: '필수 입력항목입니다',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    test_items: ['SCT-AP', 'SCT-COM', 'SCT-INS', 'ANT', 'CMPT', 'COWAT', 'Explain_Picture', 'Explain_Procedure', 'SPT-completion', 'SPT-priming', 'Story_Telling'],
    type_items: ['문항', '연습 문항', '예시 문항'],
    test: '',
    type: '',
    id: '',
    answer: '',
    text: '',
    file_name: '',
    file_name1: '',
    image: '',
    image1: '',
  }),
  methods: {
    ToMain() {
      Object.assign(this.$data, this.$options.data())
      //this.$router.push('/main')
      this.$router.go(-1)
    },
    AddQuestion() {
      if (this.type == '문항') { this.type = 'qt' }
      else if (this.type == '연습 문항') { this.type = 'ex' }
      else if (this.type == '예시 문항') { this.type = 'word'}

      if (this.id.length == 1) {
        this.id = '0' + this.id
      }
      
      const q_data = {
        "type_of_question": this.type,
        "no": this.id,
        "answer": this.answer,
      }

      if (this.test != 'COWAT' && this.test != 'Explain_Procedure' && this.test != 'CMPT') {
        console.log(this.test)
        this.text = this.text.replace(/ /g, ",")
        const index = this.text.lastIndexOf(',')
        if (index != -1) {
          this.text = this.text.substr(0, index) + ' ' + this.text.substring(index + 1)
        }
      }
      
      const data = {
        'type': this.test,
        'body': this.text,
        'data': JSON.stringify(q_data),
        'isValid': '1',
        'data1': [...this.image],
        'data2': [...this.image1],
        'data3': '',
        'data4': '',
        'data5': '',
        'data6': '',
        'data7': '',
        'data8': '',
        'data9': '' 
      }
      console.log(data)
      
      var config = {
        method: 'post',
        url: 'http://49.50.172.137:3000/api/questions',
        headers: { 
          'memberId': localStorage.getItem("Id"),
          // 'Content-Type': 'multipart/form-data']         
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    },
    readFile(file) {
      return new Promise((resolve, reject) => {

        let reader = new FileReader()

        reader.addEventListener("loadend", e => resolve(e.target.result))
        reader.addEventListener("error", reject)
        reader.readAsArrayBuffer(file)
      })
    },
    async handleFileChange(e) {
      this.file_name = e.target.files[0].name;

      this.image = new Uint8Array(await this.readFile(e.target.files[0]))
      //console.log(this.image)     
    },
    async handleFileChange1(e) {
      this.file_name1 = e.target.files[0].name;
      
      this.image1 = new Uint8Array(await this.readFile(e.target.files[0]))
      //console.log(this.image1)        
    },
  }
}
</script>

<style>
.back-form {
  padding-left: 16px;
  padding-top: 60px;
}

.question-form1 {
  padding-top: 60px;
}

.question-form2 {
  padding-top: 166px;
  padding-bottom: 75px;
}

.question-select.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 453px;
  height: 49px;
  border: 2px solid #E2E2E2;
  border-radius: 8px;
  opacity: 1;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
}

.question-select.v-text-field.v-text-field--solo .v-label {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
}

.file_text {
  border: 2px solid #E2E2E2;
  border-radius: 8px;
  width: 300px;
  height: 50px;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
}

.file_label {
  display: inline-block;
  width: 131px;
  height: 50px;
  background-color: #ffffff;
  color: #678FFF;
  font-family: 'Noto Sans KR Bold';
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 45px;
  border: 3px solid #678FFF;
  text-align: center;
  margin-left: 21px;
  font-weight: 700;
  border-radius: 10px;
}

.file input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  padding: 0px;
}
</style>