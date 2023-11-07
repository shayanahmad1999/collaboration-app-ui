import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// ::::::::axios::::::::::://
import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// ::::::::axios::::::::::://

// ::::::::cookies::::::::::://
import VueCookies from 'vue-cookies'
// ::::::::cookies::::::::::://

import App from './App.vue'
import router from './router'

const app = createApp(App)

// ::::::::axios::::::::::://
app.use(VueAxios, axios)
// ::::::::axios::::::::::://

// ::::::::cookies::::::::::://
app.use(VueCookies)
// ::::::::cookies::::::::::://

// ::::::::authentication::::::::::://
const isAuthenticated = () => {
  // Retrieve the JWT token from the cookie
  const token = app.$cookies.get('jwt');
  return token !== null; // Check if the token exists in the cookie
};

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Check if the route requires authentication
      if (!isAuthenticated()) {
        // Redirect the user to the login page if not authenticated
        next({ path: '/' });
      } else {
        // Allow the user to proceed to the route if authenticated
        next();
      }
    } else {
      // If the route does not require authentication, allow the user to proceed
      next();
    }
  });
// ::::::::authentication::::::::::://

app.use(createPinia())
app.use(router)

app.mount('#app')
