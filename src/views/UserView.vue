<template>
    <div>
      <h1>{{ pageName }}</h1>
      <ul v-if="users && users.length">
        <li v-for="user in users" :key="user._id">
          <p><strong>Name: </strong>{{ user.name }}</p>
          <p><strong>email: </strong>{{ user.email }}</p>
          <p><strong>created At: </strong>{{ formatDate(user.createdAt) }}</p>
          <hr />
        </li>
      </ul>
      <p v-else></p>
        <p v-if="users !== null">No users to display.</p>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        pageName: 'Users',
        users: null,
      };
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleString();
      },
      userData() {
  axios
    .get('http://127.0.0.1:3000/users')
    .then((response) => {
  if (response.data.status === 'success') {
    this.users = response.data.data.users;
    // console.log(response.data);
  } else {
    console.error('Request was not successful');
  }
})
  .catch((error) => {
      console.error('An error occurred:', error);
    });
},

    },
    mounted() {
      this.userData();
    },
    computed: {
      isDataLoaded() {
        return this.users !== null;
      },
    },
  };
  </script>
  