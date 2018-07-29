import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Cap from '@/components/Cap'
import Advertisement from '@/components/Advertisement'
import First from '@/components/First'
import Login from '@/components/Login'
import RegisterOption from '@/components/RegisterOption'
import RegisterDoctor from '@/components/RegisterDoctor'
import RegisterPregnant from '@/components/RegisterPregnant'
import RegisterMum from '@/components/RegisterMum'
import ScanToExam from '@/components/ScanToExam'
import Question from '@/components/Question'
import ExamPass from '@/components/ExamPass'
import ExamNoPass from '@/components/ExamNopass'
Vue.use(Router)

export default new Router({
  mode: 'history',//songjt20180715
  routes: [
    {
      path: '/',
      component: First
    },
    {
      path: '/first',
      name: 'First',
      component: First
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
      path: '/registerOption',
      name: 'RegisterOption',
      component: RegisterOption
      // component: () => import('@/components/RegisterOption')
    },
    {
      path: '/registerDoctor',
      name: 'RegisterDoctor',
      component: RegisterDoctor
      // component: () => import('@/components/RegisterDoctor')
    },
    {
      path: '/registerPregnant',
      name: 'RegisterPregnant',
      component: RegisterPregnant
      // component: () => import('@/components/RegisterPregnant')
    },
    {
      path: '/registerMum',
      name: 'RegisterMum',
      component: RegisterMum
      // component: () => import('@/components/RegisterMum')
    },
    {
      path: '/scanToExam',
      name: 'ScanToExam',
      component: ScanToExam
      // component: () => import('@/components/RegisterDoctor')
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
      // component: () => import('@/components/RegisterDoctor')
    },
    {
      path: '/examPass',
      name: 'ExamPass',
      component: ExamPass
      // component: () => import('@/components/RegisterDoctor')
    },
    {
      path: '/examNoPass',
      name: 'ExamNoPass',
      component: ExamNoPass
      // component: () => import('@/components/RegisterDoctor')
    },
  ]
})
