<template lang="pug">
  .login
    h1 Login
    div(ref="signInButton") sign in
</template>

<script>
export default {
  name: 'login',
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
  },
};
</script>

