<template lang="pug">
  nav.container
    ul(v-if="account.name")
      li: router-link(to="projects") Projects
      li: router-link(to="services") Services
      li: router-link(to="users") Users
      li: router-link(to="account") {{ account.name }}
      li: a(v-on:click="logout") Logout
    ul(v-else)
      li: a(v-on:click="login") Login
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'navbar',
  computed: mapState(['account']),
  methods: mapActions(['logout', 'login']),
};
</script>

<style>
  nav ul,
  nav ul li {
    margin: 0px;
  }

  nav ul li {
    display: inline;
    float: left;
    position: relative;
  }

  nav ul li a {
    display: inline-block;
    line-height: 49px;
    padding: 0 14px;
    color: #222;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: bold;
  }

  nav ul li a:hover {
    background: #eee;
    cursor: pointer;
  }
</style>

