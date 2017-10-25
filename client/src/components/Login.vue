<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" placeholder="Email" v-model="email"
        v-bind:class="{ 'is-invalid': error }" required>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password"
        v-model="password" v-bind:class="{ 'is-invalid': error }" required>
    </div>
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <button type="submit" class="btn btn-primary" v-bind:disabled="!email && !password">Login</button>
  </form>
</template>

<script>
import accountService from '@/services/account';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    error: null,
  }),
  methods: {
    onSubmit() {
      accountService.login({
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>

