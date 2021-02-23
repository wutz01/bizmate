import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'app-weather' */ '@/views'),
    redirect: '/forecast',
    children: [
      { path: 'forecast', name: 'forecast', component: () => import(/* webpackChunkName: 'weather' */ '@/views/forecast') }
    ]
  }
  // { path: '/', name: 'home', component: () => import('@/App') }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
