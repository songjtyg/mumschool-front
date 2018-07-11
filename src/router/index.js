import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Cap from '@/components/Cap'
import Advertisement from '@/components/Advertisement'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RegisterDoctor from '@/components/RegisterDoctor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cap',
      name: 'Cap',
      component: Cap
    },
    {
      path: '/advertisement',
      name: 'Advertisement',
      component: Advertisement
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
      // component: () => import('@/components/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
      // component: () => import('@/components/Register')
    },
    {
      path: '/registerDoctor',
      name: 'RegisterDoctor',
      component: RegisterDoctor
      // component: () => import('@/components/RegisterDoctor')
    },
  ]
})
