<template lang="pug">
  .container
    .form
      input(v-model="name" placeholder="Project name...")
      button(v-on:click="save") Save
    router-link(to="/projects") Back to projects
</template>

<script>
export default {
  name: 'projects',
  data() {
    return {
      name: '',
    };
  },
  methods: {
    save() {
      const project = { name: this.name };
      this.$store.dispatch('createProject', project);
    },
  },
};
</script>

