// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('./assets/css/reset.css');// 引入全局的文件
// import './assets/css/reset.css'
import Vue from 'vue'
Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示
Vue.config.debug = true // 开启debug模式

import App from './App'
import router from './router'

import axios from 'axios'
axios.defaults.withCredentials = true // 缺省在调用时带上session
Vue.prototype.$axios = axios// 其他页面在使用axios的时候直接  this.$axios就可以了

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)


// import { Field, Button} from 'mint-ui'// 按需引入部分组件
// Vue.component(Button.name, Button)
// Vue.component(Field.name, Field)

import { WechatPlugin, Group,XButton, XInput,Radio,Checklist} from 'vux'


Vue.use(WechatPlugin)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('radio', Radio)
Vue.component('checklist', Checklist)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
