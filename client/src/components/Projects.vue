<template lang="pug">
  .container
    router-link(to="/projects/new") Create new project
    div(v-for="value in projects.projects")
      router-link(:to="{ name: 'ViewProject', params: { projectId: value._id } }") {{ value.name }}
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

