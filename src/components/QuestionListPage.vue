<template>
  <v-container>
    <v-layout class="back-form">
      <v-btn 
        text
        @click="toTest()"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>
    <v-layout justify-center>
      <v-data-table
        :headers="headers"
        hide-default-footer
        :items="lists"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        :page.sync="page"
      ></v-data-table>
    </v-layout>
    <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    headers: [
      { text: '입력한 사람', value: 'editBy', width:261, sortable: false, align: 'center', width: 208},
      { text: '문제 번호', value: 'q_id', width: 261, sortable: false, align: 'center', width: 208},
      { text: '문제 타입', value: 'q_type', width: 261, sortable: false, align: 'center', width: 208},
      { text: '문제 텍스트', value: 'q_body', width: 261, sortable: false, align: 'center', width: 213},
      { text: '문제 활성화 여부', value: 'isValid', width: 261, sortable: false, align: 'center', width: 208},
    ],
    lists: [],
    itemsPerPage: 10,
    numitems: ['5개씩', '10개씩', '15개씩'],
    page: 1,
    pageCount: 0,
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    toTest() {
      Object.assign(this.$data, this.$options.data())
      this.$router.push('/paper')
    },
    async initialize() {
      const config = {
        method: 'get',
        url: this.$API_SERVER +'/api/questions/noimage?type=' + this.$route.query.data
      }
      await axios(config)
      .then(response => {
        this.lists = response.data.data
        for (let i = 0; i < this.lists.length; i++) {
          this.lists[i].q_body = this.lists[i].q_body.replace(/,/g, " ")
          this.lists[i].q_data = String.fromCharCode(...this.lists[i].q_data.data)
          if (this.lists[i].isValid === 1) {
            this.lists[i].isValid = "활성화"
          }
          else {
            this.lists[i].isValid = "비활성화"
          }
          
          if (JSON.parse(this.lists[i].q_data)["type_of_question"] === "word") {
            if (JSON.parse(this.lists[i].q_data)["no"] == '00') {
              this.lists[i].q_id = 0
            }
            else {
              this.lists[i].q_id = JSON.parse(this.lists[i].q_data)["no"].replace(/(^0+)/, "");
            }
            this.lists[i].q_type = "예제"
          }
          else if (JSON.parse(this.lists[i].q_data)["type_of_question"] === "ex") {
            this.lists[i].q_id = "P" + JSON.parse(this.lists[i].q_data)["no"].replace(/(^0+)/, "");
            this.lists[i].q_type = "연습"
          }
          else {
            this.lists[i].q_id = JSON.parse(this.lists[i].q_data)["no"].replace(/(^0+)/, "");
            this.lists[i].q_type = "실전"
          }
        }

      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>

</style>