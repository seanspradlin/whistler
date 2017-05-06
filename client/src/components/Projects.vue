<template lang="pug">
  .container
    router-link(to="/projects/new") Create new project
    #projects(v-for="project in projects.projects")
      router-link(:to="{ name: 'ViewProject', params: { projectId: project._id } }") {{ project.name }}
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

