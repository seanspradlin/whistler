<template lang="pug">
  .container
    form(v-on:submit.prevent="save")
      input(v-model="name" placeholder="Project name...")
      input(type="submit" value="Save")
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
      this.$router.push({ name: 'Projects' });
    },
  },
};
</script>

