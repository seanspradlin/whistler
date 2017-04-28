<template lang="pug">
  a(v-on:click="logout") Logout
</template>

<script>
export default {
  name: 'logout',
  methods: {
    logout() {
      this.$http.post('/api/account/logout')
        .then(() => {
          this.$store.commit('clearAccount');
        });
    },
  },
};
</script>

