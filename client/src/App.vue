<template lang="pug">
div
  .container
    img.four.columns(src="./assets/logo.png" alt="Whistler")
  nav.bordered
    ul.container.tab-nav(v-if="account.name")
      li: router-link(to="projects") Projects
      li: router-link(to="services") Services
      li: router-link(to="users") Users
      li
        router-link(to="account")
          img.portrait(:src="account.picture")
          span {{ account.name }}
        logout
    ul.tab-nav(v-else)
      li: login
  router-view.container
</template>

<script>
import { mapState } from 'vuex';
import Login from './components/Login';
import Logout from './components/Logout';

export default {
  name: 'app',
  components: { Login, Logout },
  computed: mapState(['account']),
  mounted() {
    this.$store.commit('getAccount');
  },
};
</script>

<style>
nav.bordered {
    border-bottom: 2px dotted #bbb;
    border-top: 2px dotted #bbb;
}

ul.tab-nav {
    list-style: none;
    padding: 5px;
}

ul.tab-nav li {
    display: inline;
    padding: 5px;
}

.portrait {
  height: 25px;
  width: 25px;
}
</style>
