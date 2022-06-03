<template>
  <v-container fill-height>
    <v-layout column>
      <v-flex>
        <v-layout justify-center>
          <v-flex>
            <v-text-field
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
        <v-layout class="add-form">
          문제지 추가   
          <v-btn
            color="#7499FF"
            x-small
            dark
            fab
            @click="Register()"
          ><v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-layout>

        <v-layout justify-center>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          :page.sync="page"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.qp_name }}</td>
              <td>{{ props.item.qp_type }}</td>
              <td>{{ props.item.qp_total_question }}</td>
              <td>{{ props.item.createdAt }}</td>
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
    search: '문제지',
    searchitems: [],
    itemsPerPage: 10,
    page: 1,
    pageCount: 0,
    headers: [
        { text: '검사 문제지 이름', value: 'qp_name', width: 261, sortable: false, align: 'center'},
        { text: '검사 유형 코드', value: 'qp_type', width: 261, sortable: false, align: 'center'},
        { text: '전체 문항수', value: 'qp_total_question', width: 261, sortable: false, align: 'center'},
        { text: '생성 시간', value: 'createdAt', width: 261, sortable: false, align: 'center'},
    ],
    items: [],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    Register() {
      this.$router.push('/paperadd');
    },
    initialize () {
      axios.get('/api/questionPapers')
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
.add-form {
  margin-left: 160px;
  margin-top: 80px;
}
</style>