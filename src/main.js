// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import './assets/css/main.css'
import axios from 'axios'
import { Field, Button} from 'mint-ui'// 按需引入部分组件
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)

import { XButton, XInput } from 'vux'
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)

Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true

// require('./assets/css/base.css');// 引入全局的base文件
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios// 其他页面在使用axios的时候直接  this.$axios就可以了
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
