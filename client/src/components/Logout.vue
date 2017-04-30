<template lang="pug">
  i.fa.fa-lg.fa-sign-out(aria-hidden="true" v-on:click="logout")
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

<style>
i.fa:hover {
  color: #F00;
}
</style>

