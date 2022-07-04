<template>
  <v-container>
    <v-layout justify-center class="paper-layout">
      <table class="paper-table">
        <thead>
          <td class="paper-table-header" style="border-radius: 21px 0px 0px 21px;">과제 유형</td>
          <td class="paper-table-header">과제 이름</td>
          <td class="paper-table-header">전체 문항수</td>
          <td class="paper-table-header">활성화된 문항수</td>
          <td class="paper-table-header" style="border-radius: 0px 21px 21px 0px;">문제 리스트</td>
        </thead>
        <tbody v-for="i in types.length" v-bind:key="i" >
          <tr v-if="i != types.length" style="border-bottom: 1px solid #C9C9C9" class="paper-table-content">
            <td v-if="i - 1 < 3">이해 과제</td>
            <td v-else>표현 과제</td>
            <td>{{ types[i - 1] }}</td>
            <td>{{ list[i - 1] }}</td>
            <td>{{ valid[i - 1] }}</td>
            <td><v-btn text style="margin: 0px 16px;width: 31px" @click="ToList(i - 1)">
              <img :src="listIcon" style="width: 30px;"/>
            </v-btn></td>
          </tr>
          <tr v-else class="paper-table-content">
            <td>표현 과제</td>
            <td>{{ types[i - 1] }}</td>
            <td>{{ list[i - 1] }}</td>
            <td>{{ valid[i - 1] }}</td>
            <td><v-btn text style="margin: 0px 16px;width: 31px" @click="ToList(i - 1)">
              <img :src="listIcon" style="width: 30px;"/>
            </v-btn></td>
          </tr>
        </tbody>
      </table>
    </v-layout>
  </v-container>
</template>

<script>
var axios = require('axios');

export default {
  data: () => ({
    count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    list: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    valid: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    types: ['SCT-AP', 'SCT-INS', 'SCT-COM', 'Story_Telling', 'Explain_Picture', 'Explain_Procedure', 'COWAT', 'ANT', 'SPT-priming', 'SPT-completion', 'CMPT'],
    listIcon: require('../assets/list_icon.svg')
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    async initialize () {
      const config = {
        method: 'get',
        url: this.$API_SERVER +'/api/questions/noimage'
      }
      await axios(config)
      .then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].q_type === this.types[0]) {
            this.count[0] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[0] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[1]) {
            this.count[1] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[1] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[2]) {
            this.count[2] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[2] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[3]) {
            this.count[3] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[3] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[4]) {
            this.count[4] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[4] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[5]) {
            this.count[5] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[5] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[6]) {
            this.count[6] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[6] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[7]) {
            this.count[7] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[7] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[8]) {
            this.count[8] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[8] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[9]) {
            this.count[9] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[9] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[10]) {
            this.count[10] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[10] += 1
            }
          }
          else if (response.data.data[i].q_type === this.types[11]) {
            this.count[11] += 1;
            if (response.data.data[i].isValid === 1) {
              this.valid[11] += 1
            }
          }
        }
        this.list = this.count
      })
      .catch(err => {
        console.log(err)
      })
    },
    ToList(i) {
      this.$router.push({
        name: "List",
        query: { data: this.types[i] }
      })
    }
  }

}
</script>

<style scoped>
.paper-layout {
  padding-top: 195px;
}

.st0{fill:#E3E3E3;}
.st1{fill:#678FFF;}

svg {
  width: 35px;
}

table.paper-table {
  width: 1044px;
  box-shadow: 0 0 0 1px #C9C9C9;
  border-collapse: collapse;
  border-radius: 21px;
}

td.paper-table-header {
  background-color: #E8E8E8;
  color: #678FFF;
  font-family: 'Noto Sans KR Medium';
  font-size: 16px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}

tr.paper-table-content {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  height: 68px;
}
</style>