<template>
  <v-container class="outline">
    <v-layout justify-center column>
      <v-row>
        <p>당일 검사자 추가</p>
        <v-btn
          color="#7499FF"
          x-small
          dark
          fab
          @click="Reservation()"
          class="mt-n1 ml-2 mb-10"
        ><v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-select
          solo
          flat
          label="10개씩"
          :items="numitems"            
          @input="itemsPerPage = parseInt($event, 10)"
          class="mt-n3 numselect"
          style="margin-left: 30px;"
        ></v-select>
      </v-row>

      <v-layout>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          :page.sync="page"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.e_res_name }}</td>
            <td>{{ props.item.e_res_phone }}</td>
            <td>{{ props.item.e_id }}</td>
            <td>{{ props.item.e_user_id }}</td>
            <td>{{ props.item.e_type }}</td>
            <td>{{ props.item.e_date }}</td>
          </template>

          <template v-slot:[`item.setting`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="Edit(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="Delete(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          
        </v-data-table>
      </v-layout>
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    numitems: ['5개씩', '10개씩', '15개씩'],
    itemsPerPage: 10,
    page: 1,
    pageCount: 0,
    headers: [
      { text: '예약자 이름', value: 'e_res_name', sortable: false, align: 'center', width: 157 },
      { text: '예약자 전화번호', value: 'e_res_phone', sortable: false, align: 'center', width: 157 },
      { text: '예약 번호', value: 'e_id', sortable: false, align: 'center', width: 157 },
      { text: '검사자 번호', value: 'e_user_id', sortable: false, align: 'center', width: 157 },
      { text: '검사 타입', value: 'e_type', sortable: false, align: 'center', width: 157 },
      { text: '검사 일시', value: 'e_date', sortable: false, align: 'center', width: 157 },
      { text: '수정/삭제', value: 'setting', sortable: false, align: 'center', width: 103 }
    ],
    items: [],
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      axios.get('/api/examReservations')
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
    Reservation(item) {
      this.$router.push({
        name: "Reservation",
      })
    },
    Delete(item) {
      const url = 'http://49.50.172.137:3000/api/examReservations?id=' + item.e_id
      console.log(item.e_id)
      var config = {
        method: 'delete',
        url: url,
        headers: {
          //'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

      this.$router.go();
    },
    Edit(item) {
      this.$router.push({
        name: "ReservationEdit",
        query: { data: item.e_id }
      })
    }
  }
}
</script>

<style>
.container.outline {
  padding-top: 187px;
  padding-left: 165px;
  padding-right: 166px;
}
</style>