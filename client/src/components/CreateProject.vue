<template lang="pug">
  .container
    form(v-on:submit.prevent="save")
      input(v-model="name" v-validate:name="'required|alpha_spaces'" type="text" name="name" placeholder="Project name...")
      span(v-show="errors.has('name')") Name is required
      input(type="submit" value="Save")
    router-link(to="/projects") Back to projects
</template>

<script>
export default {
  name: 'projects',
  data: () => ({
    name: '',
  }),
  methods: {
    save() {
      this.$validator.validateAll()
        .then(() => {
          const project = { name: this.name };
          this.$store.dispatch('createProject', project);
          this.$router.push({ name: 'Projects' });
        });
    },
  },
};
</script>

