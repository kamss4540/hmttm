import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usevant',
    name: 'usevant',
    component: () => import('@/views/usevant')
  },
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')

  },
  {
    path: '/tabbar',
    name: 'tabbar',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
