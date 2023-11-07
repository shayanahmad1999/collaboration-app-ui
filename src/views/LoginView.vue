<template>
  <div class="login-form">
    <div class="blogs content">
      <h2>{{ name }}</h2>
    </div>
    <div class="create-blog content">
      <div id="errorMessage" style="color: red;">{{ errorMessage }}</div>
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" id="email" placeholder="Email" />
        <div class="email error"></div>
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password" id="password" placeholder="Password" />
        <div class="password error"></div>
        <button type="submit">Login</button>
        <!-- <a href="/users/forgotPassword" style="float: right;">forgot password</a> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      name: 'Login',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    reset() {
    this.email = '';
    this.password = '';
  },
    login() {
      this.axios
        .post('http://127.0.0.1:3000/users/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          this.reset();
          document.getElementById('errorMessage').innerText = '';
          // Save the token as a cookie
          this.$cookies.set('jwt', response.data.token, { secure: true, httpOnly: true });
          this.$router.push('/users');
          console.log(response.data);
        })
        .catch((error) => {
          this.errorMessage = 'An error occurred while logging in. Please try again.';
          document.getElementById('errorMessage').innerText = this.errorMessage;
          console.log(error);
        });
    }
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
