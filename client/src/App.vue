<template lang="pug">
div#app
  nav
    ul(v-if="account.name")
      li: router-link(to="account") {{ account.name }}
      li: router-link(to="projects") Projects
      li: router-link(to="services") Services
      li: router-link(to="users") Users
      li: router-link(to="logout") Logout
    ul(v-else)
      li: router-link(to="login") Login
  img(src="./assets/logo.png")
  router-view
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState(['account']),
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
