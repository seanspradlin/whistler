<template lang="pug">
  .container
  #services(v-for="value in services")
    div {{ value.name }}
</template>

<script>
export default {
  name: 'services',
  data() {
    return {
      services: this.$store.projects.services,
    };
  },
};
</script>

