// Composables
import { createRouter, createWebHistory } from 'vue-router'
import rutasProtegidas from '@/router/protectedRoutes'
import authGuard from './authGuard'
import Layout from '@/layouts/default/DefaultLayout.vue'
import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Signup from '@/views/SignUpView.vue'
import NoFound from '@/views/NoPageFound.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path:'/',
        name:'home',
        component:Home
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/signup',
        name: 'signup',
        component: Signup
      },
      {
        path:'/admin',
        beforeEnter:[authGuard],
        ...rutasProtegidas,

      },
      {
        path:'/:pathMatch(.*)*',
        component:NoFound
     }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
