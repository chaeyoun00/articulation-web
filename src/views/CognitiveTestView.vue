<template>
  <v-container class="outline_cog">
    <v-layout justify-center column>
      <v-row class="test" style="padding-bottom: 70px">
        <input type="radio" id="CERAD" name="test" value="cread" v-model="test">
        <label for="CERAD" style="width:131px">CERAD-K (NP)</label>
        <input type="radio" id="IADL" name="test" value="iadl" v-model="test"> 
        <label for="IADL" style="width:340px">IADL (Instrumental Activities of Daily Living)</label>
        <input type="radio" id="Geriatric" name="test" value="geriatric" v-model="test">
        <label for="Geriatric" style="width:252px">GDS (Geriatric Depression Scale)</label>
        <input type="radio" id="Global" name="test" value="global" v-model="test"> 
        <label for="Global" style="width:252px">GDS (Global Deterioration Scale)</label>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        @click:row="handleClick"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.u_name }}</td>
          <td>{{ props.item.u_sex }}</td>
          <td>{{ props.item.u_birth }}</td>
          <td>{{ props.item.u_telephone }}</td>
          <td>{{ props.item.u_chart_number }}</td>
          <td>{{ props.item.u_enter_path }}</td>
          <td>{{ props.item.u_cog_test }}</td>
          <td>{{ props.item.u_kbase_test }}</td>
          <td>{{ props.item.u_listen_test }}</td>
          <td>{{ props.item.u_lang_test }}</td>
          <td>{{ props.item.u_study_year }}</td>
          <td>{{ props.item.u_blank }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    test: '',
    headers: [
      { text: '성명', value: 'u_name', sortable: false, align: 'center'},
      { text: '성별', value: 'u_sex', sortable: false, align: 'center' },
      { text: '생년월일', value: 'u_birth', sortable: false, align: 'center' },
      { text: '전화번호', value: 'u_telephone', sortable: false, align: 'center' },
      { text: '병록번호', value: 'u_chart_number', sortable: false, align: 'center' },
      { text: '유입', value: 'u_enter_path', sortable: false, align: 'center' },
      { text: '인지검사일', value: 'u_cog_test', sortable: false, align: 'center' },
      { text: 'KBASE2', value: 'u_kbase_test', sortable: false, align: 'center' },
      { text: '청각검사일', value: 'u_listen_test', sortable: false, align: 'center' },
      { text: '언어검사일', value: 'u_lang_test', sortable: false, align: 'center' },
      { text: '학력', value: 'u_study_year', sortable: false, align: 'center' },
      { text: '비고', value: 'u_blank', sortable: false, align: 'center' },
    ],
    items: [],
    reservation: [],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      axios.get('/api/examUsers')
      .then(response => {
        //console.log(JSON.stringify(response.data));
        // this.items.push(response.data.data)
        this.items = response.data.data
        //console.log(this.items)
      })
      .catch(error => {
        console.log(error.response)
      })

      axios.get('/api/examReservations')
      .then(response => {
        //console.log(JSON.stringify(response.data));
        // this.items.push(response.data.data)
        this.reservation = response.data.data
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    handleClick(value) {
      let flag = 0;
      
      for (let i = 0; i < this.reservation.length; i++) {
        if (value.u_id === this.reservation[i].e_user_id) {
          flag = 1;
          if (this.test == "cread") {
            this.$router.push({
              name: "Cread",
              query: { patient: value.u_id, test: this.test, type: "cognitive", resId: this.reservation[i].e_id }
            });
          }
          else if (this.test == "iadl") {
            this.$router.push({
              name: "Iadl",
              query: { patient: value.u_id, test: this.test, type: "cognitive", resId: this.reservation[i].e_id }
            });
          }
          else if (this.test == "geriatric") {
            this.$router.push({
              name: "Geriatric",
              query: { patient: value.u_id, test: this.test, type: "cognitive", resId: this.reservation[i].e_id }
            });
          }
          else if (this.test == "global") {
            this.$router.push({
              name: "Global",
              query: { patient: value.u_id, test: this.test, type: "cognitive", resId: this.reservation[i].e_id }
            });
          }
        }
      }

      if (flag === 0) {
        alert('예약을 한 환자인지 확인해주세요.')
      }
      
    }
  }
}
</script>

<style>
.container.outline_cog {
  padding-top: 60px;
  padding-left: 177px;
  padding-right: 179px;
}

.test {
  padding-top: 12px;
  padding-left: 13px;
}

.test input[type=radio] {
  display:none; 
  margin:10px;
}

.test input[type=radio] + label {
  display:inline-block;
  background-color: #FFFFFF;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 5px #0000004D;
  color: #5F5F5F;
  height: 54px;
  border-radius: 13px;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  text-align: center;
  padding-top: 11px;
  margin-right: 20px;
  margin-bottom: 10px;
}

.test input[type=radio]:checked + label { 
  background-color:#ffffff;
  color: #678FFF;
  border: 2px solid #678FFF;
  height: 54px;
}
</style>