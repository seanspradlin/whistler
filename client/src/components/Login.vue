<template lang="pug">
  div(ref="signInButton") Login
</template>

<script>
export default {
  name: 'login',
  mounted() {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init();
      auth2.attachClickHandler(this.$refs.signInButton, {}, (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        this.$store.dispatch('login', token);
      });
    });
  },
};
</script>

