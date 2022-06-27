<template>
  <v-container>
    <v-layout>
      <v-btn 
        text
        @click="ToMain()"
        class="mt-12 ml-5"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>

    <v-layout justify-center>
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
      >
        <form @submit.prevent="Submit" class="patientform">
          <v-flex>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>성명</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                v-model="reservation[0].e_res_name"
                :error-messages="errors"               
                label="성명"
                solo
                flat
                required
                class="input-text"
              ></v-text-field>
            </validation-provider>
            
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>전화번호</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                v-model="reservation[0].e_res_phone"
                :error-messages="errors"
                label="010-XXXX-XXXX"
                solo
                flat
                required
                class="input-text"
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>검사자 번호</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                v-model="reservation[0].e_user_id"
                :error-messages="errors"
                label="111111"
                solo
                flat
                required
                disabled
                class="input-text"
              ></v-text-field>
            </validation-provider>


            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <v-row class="input-label">
                <p>검사 일시</p>
                <p class="require-label">*</p>
              </v-row>
              <v-text-field
                v-model="reservation[0].e_date"
                :error-messages="errors"
                label="YYYY-MM-DD"
                solo
                flat
                required
                class="input-text"
              ></v-text-field>
            </validation-provider>
          </v-flex>
          <v-layout justify-center class="registbtn">
            <v-btn        
              depressed
              class="submit-btn"
              :disabled="invalid"
              @click="Submit(), ToMain()"
            >
            등록
            </v-btn>
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
  name: 'ReservationEdit',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    items: ['Cognitive', 'Language'],
    reservation: [{
      e_res_name: '',
    }],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    ToMain() {
      Object.assign(this.$data, this.$options.data())
      this.$router.push('/testedperson')
    },
    initialize () {
      axios.get('/api/examReservations?id=' + this.$route.query.data)
      .then(response => {
        //console.log(response.data.data[0].rs_answer.slice(1, -1).split(','))
        console.log(response.data.data)
        this.reservation = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    Submit() {
      const datas = {
        'id': this.reservation[0].e_id,
        'userId': this.reservation[0].e_user_id,
        'resName': this.reservation[0].e_res_name,
        'type': 'Language',
        'resPhone': this.reservation[0].e_res_phone,
        'date': this.reservation[0].e_date
      };

      var config = {
        method: 'put',
        url: 'http://49.50.172.137:3000/api/examReservations',
        headers: {
          'memberId': localStorage.getItem("Id"),
        },
        data: datas
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
.leftflex {
  margin-right: 138px;
}

.patientform {
  margin-top: 75px;
}

.registbtn {
  margin-top: 164px;
}

.reservationtype {
  width: 453px;
}

.reservationtype.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border: 2px solid #E2E2E2;
  border-radius: 8px;
  height: 49px;
}
</style>