<template lang="pug">
  .container
    h1 {{ name }}
    div Owner: {{ owner.name }}
    div Services
      ul
        li(v-for="service in services") {{ service.name }}
</template>

<script>
export default {
  name: 'projects',
  data() {
    const id = this.$route.params.projectId;
    const project = this.$store.state.projects.projects[id];
    project.services = [];
    return project;
  },
};
</script>

