<template lang="pug">
div
  .container
    img.four.columns(src="./assets/logo.png" alt="Whistler")
  .bordered
    navbar
  router-view.container
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: { Navbar },
  mounted() {
    window.gapi.load('auth2');
    this.$store.commit('getAccount');
  },
};
</script>

<style>
  .bordered {
    border-bottom: 2px dotted #bbb;
    border-top: 2px dotted #bbb;
  }
</style>

