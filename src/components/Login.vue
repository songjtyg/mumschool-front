<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 42rem; ">
      <div style="width:85%; height: 10rem; background: white;opacity: 1;" >
        <!--<mt-field label="登录" placeholder="用户名/手机" v-model="username"></mt-field>-->
        <!--<mt-field label="密码" placeholder="请输入密码" type="password" v-modal="password"></mt-field>-->
        <group title="">
          <x-input title="用户名/手机" placeholder="请输入用户名/手机" v-model="loginName" :max="13" style="height: 2rem;"></x-input>
          <x-input title="密码" placeholder="请输入密码" type="password" v-model="password" :min="6" :max="6" @on-change="change" style="height: 2rem;"></x-input>
        </group>
      </div>
    <div flex="dir:left main:right cross:center "  style="width:85%; height: 2rem; margin-bottom: 1rem;">
      <!--<mt-cell title="标题文字" width="0.5rem" height="0.5rem">-->
        <img slot="icon" src="../assets/images/lock.png"  style="width:1.5rem;height:1.5rem"/><a style="color:white;">忘记密码</a>
      <!--</mt-cell>-->
    </div>
      <x-button type="primary" :disabled="disable001" @click.native="processButton001" style="width:85%; margin-bottom: 1rem;">登录</x-button>
      <x-button type="primary" style="width:85%; margin-bottom: 1rem;">新用户注册</x-button>
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
        msg: '妈妈校园',
        disable001:false,
        loginName:"",
        password:""
      }
    },
    methods:{
      processButton001 () {debugger;
        //alert("11")
        //this.submit001 = 'processing'

//        headers: {
//          "Content-Type": "application/json;charset=utf-8"
//        }
//        this.$jsonp('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri=http%3A%2F%2Fmumschool.ngrok.xiaomiqiu.cn%2Ferror&response_type=code&scope=snsapi_base&state=1#wechat_redirect').then( data => {

//        this.$jsonp('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri='+encodeURIComponent('http://mumschool.ngrok.xiaomiqiu.cn')+
//          '&response_type=code&scope=snsapi_base&state=1#wechat_redirect').then( data => {
//        location.href='www.baidu.com';
////          //console.log(data);
//        })
//        this.$jsonp('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri='+encodeURIComponent('http://mumschool.ngrok.xiaomiqiu.cn')+
//          '&response_type=code&scope=snsapi_base&state=1#wechat_redirect',null, function (err, data) {
//          if (err) {
//            //console.error(err.message);
//            location.href='www.baidu.com';
//          } else {
//            //console.log(data);
//            location.href='www.sina.com';
//          }
//        });
        let params = {
          loginName : this.loginName,
          password  : this.password
        }
        this.$axios.post('http://mumschool.ngrok.xiaomiqiu.cn/weixinUser/login',params).then(function(response) {
          let logined =  response.data;
          alert(logined)
          if (logined){
              this.$router.push({name: 'RegisterDoctor'})
          }else{
            alert("用户名密码错误！");
          }
        }).catch(function(response) {

          // 这里是处理错误的回调
          alert.log(response)
        });
        this.disable001 = false;
      },
      registerType (){
        this.$router.push({path: '/registerType'})
      }
    },
    mounted() {
      bus.$emit('appointmentOpened', '1');
    },
    //created() {
    beforeCreate() {
      debugger
      var that = this;
      this.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/weixinMenu/ifOpenid`).then(function(response) {
        let hasOpenid = response.data;
        if (hasOpenid){
//          alert("有openid了")
          return
        }else{
          let code = that.$route.query.code
          if (code) {
//            alert('有code:'+code)
            that.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/weixinMenu/setOpenid/${code}`).then(function(response) {
//              alert('设置openid成功：'+response.data)
            }).catch(function(response) {
              // 这里是处理错误的回调
              console.log(response)
            });
          }else{
//            alert('跳转微信服务器获取code')
            window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri='
              +encodeURIComponent('http://mumschool-front.ngrok.xiaomiqiu.cn/login')+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
          }
        }
      }).catch(function(response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    }
  }
</script>
<style scoped>

 </style>
