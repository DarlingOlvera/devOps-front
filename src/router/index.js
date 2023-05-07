// Composables
import { createRouter, createWebHistory } from 'vue-router'
import rutasProtegidas from '@/router/protectedRoutes'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/SignUpLoginView.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUpLoginView.vue'),
      },

      ...rutasProtegidas,
      {
        path:'/:pathMatch(.*)*',
        component:() => import(/*webpackChunkName:"NoPageFound"*/ '@/modules/shared/pages/NoPageFound.vue')
     }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
