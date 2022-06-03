<template>
  <v-container fill-height>
    <v-layout column>
      <v-flex>
        <v-layout class="questionadd">
        문항 추가   
        <v-btn
          color="#7499FF"
          x-small
          dark
          fab
          @click="Register()"
          class="mt-n1 ml-2 mb-2"
        ><v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-select
          solo
          flat
          label="-"
          :items="numitems"            
          @input="itemsPerPage = parseInt($event, 10)"
          class="numselect"
          style="margin-left: 30px;"
        ></v-select>
      </v-layout>

      <v-layout justify-center>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          hide-default-footer
          :page.sync="page"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.editBy }}</td>
            <td>{{ props.item.q_type }}</td>
            <td>{{ props.item.q_body }}</td>
            <td>{{ props.item.isValid }}</td>
          </template>
        </v-data-table>
      </v-layout>
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>

      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios'

export default {
  data: () => ({
    itemsPerPage: 10,
    numitems: ['5개씩', '10개씩', '15개씩'],
    headers: [
        { text: '입력한 사람', value: 'editBy', width:261, sortable: false, align: 'center'},
        { text: '문제 유형', value: 'q_type', width: 261, sortable: false, align: 'center'},
        { text: '문제 텍스트', value: 'q_body', width: 261, sortable: false, align: 'center'},
        { text: '문제 활성화 여부', value: 'isValid', width: 261, sortable: false, align: 'center'},
    ],
    items: [],
    page: 1,
    pageCount: 0,
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    Register() {
        this.$router.push('/questionadd');
    },
    initialize () {
      axios.get('/api/questions')
      .then(response => {
        //console.log(JSON.stringify(response.data.data));
        //console.log(response.data.data)
        this.items = response.data.data
        for (let i = 0; i < this.items.length; i++){
          this.items[i].q_body = this.items[i].q_body.replace(/,/g, " ")
        }
      })
      .catch(error => {
        console.log(error.response)
      })
    },
  },
}
</script>

<style>
.v-btn {
  margin-left: 5px;
  margin-bottom: 20px;
}
.v-data-table {
  border: 1px solid #C9C9C9;
  border-radius: 20px;
}

.v-data-table-header {
  background-color: #E8E8E8;
  height: 68px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: #678FFF;
  font-size: 16px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th:last-child {
  border-radius: 0 20px 20px 0;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th:first-child {
  border-radius: 20px 0 0 20px;
}

.questionadd {
  margin-top: 186px;
  margin-left: 177px
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 0.875rem;
  height: 67px;
}
</style>