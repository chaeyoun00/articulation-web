<template>
    <v-card height="100%" width="520px" elevation="5">
    <v-navigation-drawer width="520px" permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mt-6 mb-10 ml-2">
            {{ login_name }}
          </v-list-item-title>       
        </v-list-item-content>

        <v-btn @click="Logout()" class="mt-6" text>
          로그아웃
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list class="ml-13 mt-13 mr-13">
        <v-list-item-group >
          <template v-for="menu in menus">
            <v-list-group
              :value="true"
              :key="menu.id"
            >
              <template v-slot:activator>
                <v-list-item-title v-text="menu.title"></v-list-item-title>
              </template>

              <template v-for="children in menu.childrens">
                <v-list-item
                  :key="children.id"
                  @click="movePage(children.target);"
                >
                  <v-list-item-title v-text="children.title"></v-list-item-title>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'Menu',

  data: () => ({
    menus: [
      {
        id: 1,
        title: "검사 관리",
        childrens: [
          {
            id: 1_1,
            title: "대상자 관리",
            target: "Main"
          },
          {
            id: 1_2,
            title: "예약자 관리",
            target: "Tested"
          },
          {
            id: 1_3,
            title: "검사 기록 조회",
            target: "Search"
          }
        ]
      },
      {
        id: 2,
        title: "답변 입력",
        childrens: [
          {
            id: 2_1,
            title: "인지검사",
            target: "CognitiveTest"
          },
          {
            id: 2_2,
            title: "언어검사",
            target: "LanguageTest",
            target: "LanguageTest"
          }
        ]
      },
      {
        id: 3,
        title: "문제지 관리",
        childrens: [
          {
            id: 3_1,
            title: "문항 추가",
            target: "Question"
          },
          {
            id: 3_2,
            title: "문제지 보기",
            target: "Paper"
          }
        ]
      }
    ],
    login_name: '',
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    Logout() {
      this.$router.push('/');
    },
    movePage(target){
      this.$router.push({ name: target });
    },
    initialize () {
      this.login_name = localStorage.getItem("Id");
    },
  },
}
</script>

<style>
.v-list-group__header.v-list-item.v-list-item--link.theme--light {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 5px #0000004D;
  border-radius: 13px;
  margin-bottom: 10px;
}

.v-list-group.v-list-group--active.primary--text {
  margin-bottom: 20px;
}

.image {
  width: 54px;
  height: 54px;
}
</style>