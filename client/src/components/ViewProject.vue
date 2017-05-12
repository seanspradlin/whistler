<template lang="pug">
  .container
    h1 {{ name }}
    div Owner: {{ owner.name }}
</template>

<script>
export default {
  name: 'projects',
  data() {
    const id = this.$route.params.projectId;
    return this.$store.state.projects.projects[id];
  },
};
</script>

