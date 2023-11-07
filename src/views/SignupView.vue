<script>
export default {
  data(){
    return{
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
  },
  methods:{
    reset(){
      this.name = '',
      this.email = '',
      this.password = '',
      this.confirmPassword = '',
      this.errorMessage = ''
    },
    signup(){
      this.axios
      .post('http://127.0.0.1:3000/users/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
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
          this.errorMessage = 'An error occurred while signup in. Please try again.';
          document.getElementById('errorMessage').innerText = this.errorMessage;
          console.log(error);
        });
    }
  }
}
</script>

<template>
  <main>
    <div class="blogs content">
            <h2>Signup</h2>
        </div>
        <div class="create-blog content">
            <div id="errorMessage" style="color: red;"></div>
            <form id="signupForm" @submit.prevent="signup">
                <label for>Name</label>
                <input type="text" v-model="name" name="name" id="name" placeholder="Name">
                <div class="name error" id="nameError"></div>
                <label for>Email</label>
                <input type="email" v-model="email" name="email" id="email" placeholder="Email">
                <div class="email error" id="emailError"></div>
                <label for>Password</label>
                <input type="password" v-model="password" name="password" id="password"
                    placeholder="Password">
                <div class="password error" id="passwordError"></div>
                <label for>Confirm password</label>
                <input type="password" v-model="confirmPassword" name="confirmPassword"
                    id="confirmPassword" placeholder="Confirm password">
                <div class="confirmPassword error" id="confirmPasswordError"></div>
                <button>Submit</button>

            </form>
        </div>
  </main>
</template>
