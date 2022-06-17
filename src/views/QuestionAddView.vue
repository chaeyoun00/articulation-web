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
            <v-btn @click="Delete(item)" text style="margin-top: 16px;width: 31px">
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
        { text: '입력한 사람', value: 'editBy', width:220, sortable: false, align: 'center'},
        { text: '문제 유형', value: 'q_type', width: 220, sortable: false, align: 'center'},
        { text: '문제 텍스트', value: 'q_body', width: 235, sortable: false, align: 'center'},
        { text: '문제 활성화 여부', value: 'isValid', width: 220, sortable: false, align: 'center'},
        { text: '수정 / 삭제', value: 'setting', width: 160, sortable: false, align: 'center'},
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
      axios.get('/api/questions/question')
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
    Edit(item) {
      console.log(item)
    },
    Delete(i) {
      
    }
  },
}
</script>

<style>
.st0{fill:#E3E3E3;}
.st1{fill:#678FFF;}

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