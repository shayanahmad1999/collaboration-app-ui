import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import AboutView from '../views/AboutView.vue'
import MessagesView from '../views/MessagesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/users',
      name: 'users',
      component: UserView,
      // ::::::::authentication::::::::::://
      meta: { requiresAuth: true }
      // ::::::::authentication::::::::::://
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView,
      meta: { requiresAuth: true }
    },
  ]
})

export default router
