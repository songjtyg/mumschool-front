<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 42rem; ">
      <div style="width:80%; height: 9rem; background: white;opacity: 1;" >
        <!--<mt-field label="登录" placeholder="用户名/手机" v-model="username"></mt-field>-->
        <!--<mt-field label="密码" placeholder="请输入密码" type="password" v-modal="password"></mt-field>-->
        <group title="">
          <x-input title="用户名/手机" placeholder="请输入用户名/手机" mask="999 9999 9999" v-model="maskValue" :max="13" is-type="china-mobile" style="height: 2rem;"></x-input>
          <x-input title="密码" placeholder="请输入密码" type="password" v-model="password" :min="6" :max="6" @on-change="change" style="height: 2rem;"></x-input>
        </group>
      </div>
    <div flex="dir:left main:right cross:center "  style="width:80%; height: 2rem; margin-bottom: 1rem;">
      <!--<mt-cell title="标题文字" width="0.5rem" height="0.5rem">-->
        <img slot="icon" src="../assets/images/lock.png"  style="width:1.5rem;height:1.5rem"/><a style="color:white;">忘记密码</a>
      <!--</mt-cell>-->
    </div>
      <x-button type="primary" style="width:80%; margin-bottom: 1rem;">登录</x-button>
      <x-button type="primary" style="width:80%; margin-bottom: 1rem;">新用户注册</x-button>
  </div>
</template>

<script>

  import  {bus}  from '../bus.js'
  export default {
    name: 'Login',
    components:{
      bus
    },
    data () {
      return {
        msg: '妈妈校园'
      }
    },
    mounted: function () {

      bus.$emit('appointmentOpened', '1');
    },
    methods:{
      registerType () {
        this.$router.push({path: '/registerType'})
      },
      testCall(){
        this.$axios.post('http://mumschool.ngrok.xiaomiqiu.cn/mumschool/menu/login', {a:'1'} ,{
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }
        ).then(function(response) {
          console.log(response)
          // 这里是处理正确的回调

        }).catch(function(response) {
          // 这里是处理错误的回调
          console.log(response)
        });
      }
    }
  }
</script>
<style scoped>

 </style>
