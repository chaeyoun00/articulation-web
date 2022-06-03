<template>
  <v-container fill-height>
    <v-layout column>
      <v-flex>
        <v-layout justify-center>
          <v-flex>
            <v-text-field
            v-model="search"
            label="입력"
            solo
            flat
            rounded
            append-icon="mdi-magnify"
            class="search-text"
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout class="select-form">
          <v-select
            solo
            flat
            label="10개씩"
            :items="numitems"            
            @input="itemsPerPage = parseInt($event, 10)"
            class="numselect"
          ></v-select>
        </v-layout>
        
        <v-layout justify-center>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="itemsPerPage"
            :search="search"
            @page-count="pageCount = $event"
            hide-default-footer
            :page.sync="page"
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
    search: '',
    searchitems: ['환자 이름', '환자 코드', '검사 코드'],
    numitems: ['5개씩', '10개씩', '15개씩'],
    itemsPerPage: 10,
    page: 1,
    pageCount: 0,
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
    },
  }
}
</script>

<style>
.select-form {
  margin-left: 120px;
}
</style>