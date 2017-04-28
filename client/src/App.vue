<template lang="pug">
div#app
  nav
    ul(v-if="account.name")
      li: router-link(to="account") {{ account.name }}
      li: router-link(to="projects") Projects
      li: router-link(to="services") Services
      li: router-link(to="users") Users
      li: a(v-on:click="logout") Logout
    ul(v-else)
      li: a(ref="signInButton") Login
  img(src="./assets/logo.png")
  router-view
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState(['account']),
  methods: {
    logout() {
      this.$http.post('/api/account/logout')
        .then(() => {
          this.$store.commit('clearAccount');
        });
    },
  },
  mounted() {
    const self = this;
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init();
      auth2.attachClickHandler(this.$refs.signInButton, {}, (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        this.$http.post('/api/account/google', { token })
          .then((response) => {
            self.$store.commit('setAccount', response.body);
          });
      });
    });
    this.$store.commit('getAccount');
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
