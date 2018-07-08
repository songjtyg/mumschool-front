<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 42rem; ">
      <div style="width:80%; height: 7rem; background: white;opacity: 1;" >
        <!--<mt-field label="登录" placeholder="用户名/手机" v-model="username"></mt-field>-->
        <!--<mt-field label="密码" placeholder="请输入密码" type="password" v-modal="password"></mt-field>-->
        <group title="mask">
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .memberHead .loginTitle{
    position:absolute;
    left:0px;
    bottom:0px;
    width:100%;
    height:24px;
    z-index: 1000;
    font-size: medium;
  }
  .main{
    text-align: left; /*让div内部文字居中*/
    font-size:medium;
    background-color: #fff;
    border-radius: 12px;
    margin: auto;
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
    height: 16rem;
    width: 70%;
    background:url(../assets/images/train-detail-outline.png) no-repeat 0 0;
    background-size: 100% 100%;
    background-position: center center;
    background-clip:border-box;
    padding:0 2rem;
  }
  .traning-title{
    background-size: 100% 100%;
    background-position: center center;
    height: 2rem;
    margin: 1rem 0rem 0rem 0rem;
    text-align: center;
  }
  .username-icon{
    background:url(../assets/images/login-name-input-icon.png) no-repeat 0 0;
    background-size: 100% 100%;
    background-position: center center;
    text-align: center;
    width:27px;
    height: 26px;
    padding: 0px;
    margin: -6px;
  }
  .password-icon{
    background:url(../assets/images/login-password-input-icon.png) no-repeat 0 0;
    background-size: 100% 100%;
    background-position: center center;
    text-align: center;
    width:27px;
    height: 26px;
    padding: 0px;
    margin: -6px;
  }
  .train-password{
    background-size: 100% 100%;
    background-position: center center;
    height: 2rem;
    margin: 1rem 0rem 0rem 0rem;
    text-align: center;
    background-clip:border-box;
  }
  .train-forget{
    height: 2rem;
    margin: 2% 0rem 0rem 0rem;
  }
  .train-button {
    margin: 6% 0rem 0rem 0rem;
    height: 2rem;
    text-align: center
  }
</style>
