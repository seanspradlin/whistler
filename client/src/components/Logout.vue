<template lang="pug">
  a(v-on:click="logout") Logout
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'logout',
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

