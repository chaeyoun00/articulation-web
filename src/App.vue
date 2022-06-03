<template>
  <v-app>
      <router-view></router-view>
      <v-layout>
        <!-- <v-flex md3>
          <router-view name="header"/>
        </v-flex>
        <v-flex md9>
          <router-view name="footer"/>
        </v-flex> -->
        <router-view name="header"/>
        <router-view name="footer"/>
      </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>