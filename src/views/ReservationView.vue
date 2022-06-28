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
            <v-btn @click="Edit(item)" text style="margin-top: 16px;width: 31px">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g id="그룹_1989" transform="translate(-1633.733 -137)">
              <path id="패스_1947" class="st0" d="M1763.6,161.7h252.3c58.1,0,105.1,69,105.1,154.2v154.2c0,85.2-47.1,154.2-105.1,154.2
                h-252.3c-58.1,0-105.1-69-105.1-154.2V315.9C1658.4,230.7,1705.5,161.7,1763.6,161.7z"/>
            </g>
            <g id="그룹_1988" transform="translate(7.521 7.159)">
              <path id="패스_1966" class="st1" d="M377,145.4l-25.2-25.3c-2.2-2.2-5.1-3-6.5-1.6l-29.8,29.9l33.3,33.4l29.8-29.9
                C380,150.5,379.2,147.7,377,145.4"/>
              <path id="합치기_2" class="st1" d="M118,374.2l15.2-40c0.2-0.6,0.6-1.2,1.2-1.7l-0.1-0.1l171.7-171.7l31,31L165.3,363.4
                l-0.3-0.3c-0.5,0.5-1,0.9-1.7,1.2l-40,15.2c-0.5,0.2-1,0.3-1.5,0.3c-2.3,0-4.2-1.9-4.2-4.2C117.7,375.2,117.8,374.7,118,374.2z"/>
            </g>
            </svg>
            </v-btn>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text style="margin-top: 16px;width: 31px">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g id="그룹_1990" transform="translate(-1633.733 -137)">
                  <path id="패스_1947_00000137850632916346278610000016535117037519291058_" class="st0" d="M1762.4,159.5h254.7
                    c58.6,0,106.1,69.7,106.1,155.7v155.7c0,86-47.5,155.7-106.1,155.7h-254.7c-58.6,0-106.1-69.7-106.1-155.7V315.2
                    C1656.2,229.2,1703.7,159.5,1762.4,159.5z"/>
                </g>
                <g id="그룹_1987" transform="translate(7.036 6.82)">
                  <g>
                    <defs>
                      <rect id="SVGID_1_" x="114.3" y="111.4" width="269.4" height="275.6"/>
                    </defs>
                    <clipPath id="SVGID_00000044153524365137194240000000463002274277508538_">
                      <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                    </clipPath>
                    
                      <g id="그룹_1986" transform="translate(0)" style="clip-path:url(#SVGID_00000044153524365137194240000000463002274277508538_);">
                      <path id="패스_1967" class="st1" d="M367.7,168h-40.8v-41.6c-0.3-8.6-7.6-15.3-16.2-15H186.8c-8.6-0.3-15.9,6.4-16.2,15V168
                        h-40.4c-8.4-0.3-15.5,6.3-15.9,14.7c0.3,8.4,7.4,15,15.9,14.7h16.4v171.4c0,10,8.2,18.1,18.2,18.2h169c10,0,18.1-8.2,18.2-18.2
                        V197.4h15.9c8.4,0.3,15.5-6.3,15.9-14.7C383.3,174.3,376.2,167.7,367.7,168C367.8,168,367.8,168,367.7,168L367.7,168z
                        M201.4,141.4c0.2-4.3,3.8-7.7,8.1-7.5h78.9c4.3-0.2,7.9,3.2,8.1,7.5v26.7h-95.1L201.4,141.4z M205.7,345.8
                        c0,6.6-5.3,11.9-11.9,11.9s-11.9-5.3-11.9-11.9V213.8c0-6.6,5.3-11.9,11.9-11.9c6.6,0,11.9,5.3,11.9,11.9l0,0V345.8z
                        M260.7,345.8c0,6.6-5.3,11.9-11.9,11.9s-11.9-5.3-11.9-11.9V213.8c0-6.6,5.3-11.9,11.9-11.9s11.9,5.3,11.9,11.9V345.8z
                        M315.6,345.8c0,6.6-5.3,11.9-11.9,11.9c-6.6,0-11.9-5.3-11.9-11.9V213.8c0-6.6,5.3-11.9,11.9-11.9c6.6,0,11.9,5.3,11.9,11.9
                        V345.8z"/>
                    </g>
                  </g>
                </g>
                </svg>
                </v-btn>
              </template>
              <v-card style="width: 300px; height: 174px; font-family: 'Noto Sans KR Medium';">
                <v-card-title>
                  예약 삭제
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
      { text: '예약 번호', value: 'e_id', sortable: false, align: 'center', width: 130 },
      { text: '검사자 번호', value: 'e_user_id', sortable: false, align: 'center', width: 157 },
      { text: '검사 타입', value: 'e_type', sortable: false, align: 'center', width: 157 },
      { text: '검사 일시', value: 'e_date', sortable: false, align: 'center', width: 157 },
      { text: '수정/삭제', value: 'setting', sortable: false, align: 'center', width: 130 }
    ],
    items: [],
    dialog: false,
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      const config = {
        method: 'get',
        url: 'http://101.79.81.183:3000/api/examReservations'
      }
      axios(config)
      .then(response => {
        //console.log(JSON.stringify(response.data));
        this.items = response.data.data.reverse()
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    Reservation(item) {
      this.$router.push({
        name: "Reservation",
        query: {path: "/testedperson"}
      })
    },
    Delete(item) {
      var url = 'http://49.50.172.137:3000/api/examReservations?id=' + item.e_id
      
      const config = {
        method: 'delete',
        url: url,
        headers: {
          //'Content-Type': 'application/x-www-form-urlencoded'
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
        name: "ReservationEdit",
        query: { data: item.e_id }
      })
    }
  }
}
</script>

<style>
.st0{fill:#E3E3E3;}
.st1{fill:#678FFF;}

.v-btn {
  margin-left: 5px;
  margin-bottom: 20px;
}

.container.outline {
  padding-top: 187px;
  padding-left: 165px;
  padding-right: 166px;
}
</style>