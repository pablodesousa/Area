import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Callback from '@/views/Callback.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router