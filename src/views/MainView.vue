<template>
  <v-container fill-height class="main">
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
        <v-layout class="addlayout">
          대상자 추가   
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
            label="10개씩"
            :items="numitems"            
            @input="itemsPerPage = parseInt($event, 10)"
            class="mt-n3 numselect"
            style="margin-left: 30px;"
          ></v-select>

          <!-- <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }" >
              <v-text-field
                v-model="date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mt-n4 date"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
              no-title
            ></v-date-picker>
          </v-menu> -->
        </v-layout>

        <v-layout justify-center class="tablelayout">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="itemsPerPage"
            :search="search"
            @page-count="pageCount = $event"
            :page.sync="page"
            hide-default-footer
            class="main-table"
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

            <template v-slot:[`item.reservation`]="{ item }">
              <v-btn
                @click="Reservation(item)"
                class="reservationbtn"
              >추가</v-btn>
            </template>

            <template v-slot:[`item.setting`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="Edit(item)"
              >
                mdi-pencil
              </v-icon>
              <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <v-card style="width: 300px; height: 174px; font-family: 'Noto Sans KR Medium';">
                  <v-card-title>
                    환자 삭제
                  </v-card-title>
                  <v-card-text>정말로 삭제하시겠습니까?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#678FFF"
                      text
                      @click="Delete(item), dialog = false"
                    >
                      삭제
                    </v-btn>
                    <v-btn
                      color="#678FFF"
                      text
                      @click="dialog = false"
                    >
                      취소
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
var qs = require('qs');

export default {
  data: () => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu2: false,
    search: '',
    searchitems: ['이름', '번호'],
    numitems: ['5개씩', '10개씩', '15개씩'],
    itemsPerPage: 10,
    headers: [
      { text: '성명', value: 'u_name', sortable: false, align: 'center'},
      { text: '성별', value: 'u_sex', sortable: false, align: 'center'},
      { text: '생년월일', value: 'u_birth', sortable: false, align: 'center' },
      { text: '전화번호', value: 'u_telephone', sortable: false, align: 'center' },
      { text: '병록번호', value: 'u_chart_number', sortable: false, align: 'center', width: 69 },
      { text: '유입', value: 'u_enter_path', sortable: false, align: 'center', width: 69 },
      { text: '인지검사일', value: 'u_cog_test', sortable: false, align: 'center' },
      { text: 'KBASE2', value: 'u_kbase_test', sortable: false, align: 'center' },
      { text: '청각검사일', value: 'u_listen_test', sortable: false, align: 'center' },
      { text: '언어검사일', value: 'u_lang_test', sortable: false, align: 'center'},
      { text: '학력', value: 'u_study_year', sortable: false, align: 'center', width: 43 },
      { text: '비고', value: 'u_blank', sortable: false, align: 'center' },
      { text: '예약', value: 'reservation', sortable: false, align: 'center' },
      { text: '설정', value: 'setting', sortable: false, align: 'center'},
    ],
    items: [],
    page: 1,
    pageCount: 0,
    dialog: false,
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    Register() {
      this.$router.push('/patientadd')
    },
    initialize () {
      const config = {
        method: 'get',
        url: 'http://101.79.81.183:3000/api/examUsers'
      }
      axios(config)
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
      console.log(item)
      this.$router.push({
        name: "Reservation",
        query: { id: item.u_id, path: "/main"}
      })
    },
    Delete(item) {
      var url = 'http://49.50.172.137:3000/api/examUsers?id=' + item.u_id
      
      var config = {
        method: 'delete',
        url: url,
        headers: {

        }
      }

      const vm = this;
      axios(config)
      .then(function (response) {
        vm.items.splice(vm.items.indexOf(item), 1)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    Edit(item) {
      this.$router.push({
        name: "Edit",
        query: { data: item.u_id }
      })
    }
  }
}
</script>

<style>
.addlayout {
  margin-top: 77px;
  margin-left: 30px;
}

.date.v-text-field > .v-input__control > .v-input__slot {
  width: 165px;
}

.reservationbtn.theme--light.v-btn.v-btn--has-bg {
  width: 54px;
  height: 33px;
  border: 2px solid #678FFF;
  border-radius: 10px;
  background: #FFFFFF;
  color: #678FFF;
  margin-top: 20px;
  box-shadow: none;
}

.numselect.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  border: 2px solid #E2E2E2;
  width: 107px;
  height: 30px;
  border-radius: 8px;
  font-size: 0.875rem;
}

.main-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-family: 'Noto Sans KR Medium';
  font-size: 14px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  color: #333333;
  font-family: 'Noto Sans KR Regular';
  font-size: 14px;
}

.search-text.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  width: 420px;
  height: 46px;
  background: #F0F0F0;
  border-radius: 21px;
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  letter-spacing: 0px;
  margin-top: 64px;
  margin-left: 500px;
}

.inpsearchut-text label.v-label.theme--light {
  font-family: 'Noto Sans KR Regular';
  font-size: 20px;
  color: #909090;
}
</style>