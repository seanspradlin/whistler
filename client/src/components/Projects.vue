<template lang="pug">
  .container
    router-link(to="projects/new") Create new project
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'projects',
  computed: mapState(['projects']),
  mounted() {
    this.$store.dispatch('getProjects', {});
  },
};
</script>

