<template>
  <v-container fill-height>
    <v-layout class="back-form">
      <v-btn 
        text
        @click="ToTest()"
      ><v-icon size="50px" color="#7498FF">arrow_back_ios</v-icon>
      </v-btn>
    </v-layout>
    <v-layout align-center>
      <p class="delete">서비스 준비중입니다.</p>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    ToTest() {
      
      this.$router.go(-1)
    },
  }
}
</script>

<style>
.v-application p.delete {
  margin-bottom: 52px;
  color: #333333;
  font-family: 'Noto Sans KR Medium';
  font-size: 25px;
  letter-spacing: 0px;
}
</style>