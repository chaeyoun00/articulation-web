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
                v-model="u_name"
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
                v-model="u_telephone"
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
                v-model="u_id"
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
                <p>검사 타입</p>
                <p class="require-label">*</p>
              </v-row>
              <v-select
                v-model="u_type"
                label="검사 타입 선택"
                :error-messages="errors"
                :items="items"
                solo
                flat
                class="reservationtype"
              ></v-select>
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
                v-model="u_date"
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
    u_name: '',
    u_telephone: '',
    u_id: '',
    u_type: '',
    u_date: '',
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    ToMain() {
      Object.assign(this.$data, this.$options.data())
      //this.$router.push('/main')
      this.$router.go(-1)
    },
    initialize () {
      this.u_name = this.$route.query.data.e_res_name
      this.u_telephone = this.$route.query.data.e_res_phone
      this.u_id = this.$route.query.data.e_id
      this.u_type = this.$route.query.data.e_type
      this.u_date = this.$route.query.data.e_date
    },
    Submit() {
      const data = {
        'userId': this.u_id,
        'resName': this.u_name,
        'type': this.u_type,
        'resPhone': this.u_telephone,
        'date': this.u_date
      };

      var config = {
        method: 'put',
        url: 'http://49.50.172.137:3000/api/examReservations',
        headers: {
          'memberId': localStorage.getItem("Id"),
        },
        data: data
      }

      data = qs.stringify(data)

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