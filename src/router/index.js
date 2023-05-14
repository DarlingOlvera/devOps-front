// Composables
import { createRouter, createWebHistory } from 'vue-router'
import rutasProtegidas from '@/router/protectedRoutes'
import authGuard from './authGuard'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path:'/',
        name:'home',
        component:() => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUpView.vue'),
      },
      {
        path:'/admin',
        beforeEnter:[authGuard],
        ...rutasProtegidas,

      },
      {
        path:'/:pathMatch(.*)*',
        component:() => import(/*webpackChunkName:"NoPageFound"*/ '@/views/NoPageFound.vue')
     }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
