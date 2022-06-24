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
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <g id="그룹_1992">
                <g id="그룹_1989_00000000937341694822490390000003876688821980288938_">
                  <path id="패스_1947_00000064328619274607374150000014315556893069424290_" class="st0" d="M129.9,24.7h252.3    c58.1,0,105.1,69,105.1,154.2v154.2c0,85.1-47.1,154.2-105.1,154.2H129.9c-58.1,0-105.1-69-105.1-154.2V178.9    C24.7,93.8,71.8,24.7,129.9,24.7z"/>
                </g>
              </g>
              <g id="그룹_2087" transform="translate(1.754 1.345)">
                <path id="사각형_1407" class="st1" d="M219.4,234.8h157.3c7.7,0,13.9,6.2,13.9,13.9V264c0,7.7-6.2,13.9-13.9,13.9H219.4   c-7.7,0-13.9-6.2-13.9-13.9v-15.2C205.5,241,211.7,234.8,219.4,234.8z"/>
                <path id="사각형_1408" class="st1" d="M219.4,331.8h157.3c7.7,0,13.9,6.2,13.9,13.9V361c0,7.7-6.2,13.9-13.9,13.9H219.4   c-7.7,0-13.9-6.2-13.9-13.9v-15.2C205.5,338.1,211.7,331.8,219.4,331.8z"/>
                <g id="그룹_2086" transform="translate(5.077 6)">
                  <g id="그룹_2085" transform="translate(4.425) rotate(90)">
                    <circle id="타원_219" class="st1" cx="150.2" cy="-139.2" r="30.7"/>
                    <circle id="타원_220" class="st1" cx="248.7" cy="-139.2" r="30.7"/>
                    <circle id="타원_221" class="st1" cx="347.1" cy="-139.2" r="30.7"/>
                  </g>
                  <path id="사각형_1409" class="st1" d="M214.3,130.4h157.3c7.7,0,13.9,6.2,13.9,13.9v15.2c0,7.7-6.2,13.9-13.9,13.9H214.3    c-7.7,0-13.9-6.2-13.9-13.9v-15.2C200.4,136.6,206.7,130.4,214.3,130.4z"/>
                </g>
              </g>
              </svg>
            </v-btn></td>
          </tr>
          <tr v-else class="paper-table-content">
            <td>표현 과제</td>
            <td>{{ types[i - 1] }}</td>
            <td>{{ list[i - 1] }}</td>
            <td>{{ valid[i - 1] }}</td>
            <td><v-btn text style="margin: 0px 16px;width: 31px" @click="ToList(i - 1)">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <g id="그룹_1992">
                <g id="그룹_1989_00000000937341694822490390000003876688821980288938_">
                  <path id="패스_1947_00000064328619274607374150000014315556893069424290_" class="st0" d="M129.9,24.7h252.3    c58.1,0,105.1,69,105.1,154.2v154.2c0,85.1-47.1,154.2-105.1,154.2H129.9c-58.1,0-105.1-69-105.1-154.2V178.9    C24.7,93.8,71.8,24.7,129.9,24.7z"/>
                </g>
              </g>
              <g id="그룹_2087" transform="translate(1.754 1.345)">
                <path id="사각형_1407" class="st1" d="M219.4,234.8h157.3c7.7,0,13.9,6.2,13.9,13.9V264c0,7.7-6.2,13.9-13.9,13.9H219.4   c-7.7,0-13.9-6.2-13.9-13.9v-15.2C205.5,241,211.7,234.8,219.4,234.8z"/>
                <path id="사각형_1408" class="st1" d="M219.4,331.8h157.3c7.7,0,13.9,6.2,13.9,13.9V361c0,7.7-6.2,13.9-13.9,13.9H219.4   c-7.7,0-13.9-6.2-13.9-13.9v-15.2C205.5,338.1,211.7,331.8,219.4,331.8z"/>
                <g id="그룹_2086" transform="translate(5.077 6)">
                  <g id="그룹_2085" transform="translate(4.425) rotate(90)">
                    <circle id="타원_219" class="st1" cx="150.2" cy="-139.2" r="30.7"/>
                    <circle id="타원_220" class="st1" cx="248.7" cy="-139.2" r="30.7"/>
                    <circle id="타원_221" class="st1" cx="347.1" cy="-139.2" r="30.7"/>
                  </g>
                  <path id="사각형_1409" class="st1" d="M214.3,130.4h157.3c7.7,0,13.9,6.2,13.9,13.9v15.2c0,7.7-6.2,13.9-13.9,13.9H214.3    c-7.7,0-13.9-6.2-13.9-13.9v-15.2C200.4,136.6,206.7,130.4,214.3,130.4z"/>
                </g>
              </g>
              </svg>
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
    count: [],
    list: [],
    valid: [],
    types: ['SCT-AP', 'SCT-INS', 'SCT-COM', 'Story_Telling', 'Explain_Picture', 'Explain_Procedure', 'COWAT', 'ANT', 'SPT-priming', 'SPT-completion', 'CMPT'],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    async initialize () {
      for (let i = 0; i < this.types.length; i++) {
        await axios.get('/api/questions/noimage?type=' + this.types[i])
        .then(response => {
          this.count[i] = response.data.data.length
          this.valid[i] = 0
          for (let j = 0; j < response.data.data.length; j++) {
            if (response.data.data[j].isValid === 1) {
              this.valid[i] += 1
            }
          }
        })
        .catch(error => {
          console.log(error.response)
        })
      }

      this.list = this.count
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

<style>
.paper-layout {
  padding-top: 223px;
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