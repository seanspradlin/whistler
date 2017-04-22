<template lang="pug">
div#app
  nav
    ul(v-if="loggedIn")
      li: router-link(to="logout") Logout
      li: router-link(to="account") Account
      li: router-link(to="projects") Projects
      li: router-link(to="services") Services
      li: router-link(to="users") Users
    ul(v-else)
      li: router-link(to="login") Login
  img(src="./assets/logo.png")
  router-view
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loggedIn: true,
    };
  },
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
