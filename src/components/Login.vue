<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " class="page-wrap-normal" id="aaa">
    <advertisement></advertisement>
    <div style="width:85%; height: 10rem;margin-top: 3rem; background: white;opacity: 1;" >
          <group title="">
            <x-input  title="用户名/手机" placeholder="请输入用户名/手机" v-model="loginDTO.loginWord" :max="13" style="height: 2rem;" required></x-input>
            <x-input  title="密码" placeholder="请输入密码" type="password" v-model="loginDTO.password" :min="6" :max="6" style="height: 2rem;" required></x-input>
          </group>
    </div>
    <div flex="dir:left main:right cross:center "  style="width:85%; height: 2rem; margin-top: 1rem;">
        <img slot="icon" src="../assets/images/lock.png"  style="width:1.5rem;height:1.5rem"/><a href="http://mumschool-front.ngrok.xiaomiqiu.cn/resetPassword" style="color:white;font-size: 1.2rem;">忘记密码</a>
    </div>
    <div style="width:85%; height: 8rem; margin-top: 1rem;">
      <x-button type="primary"  @click.native="login" :disabled="disabledLoginButton" >登录</x-button>
      <x-button type="primary"  @click.native="toRegisterOption">新用户注册</x-button>
    </div>


  </div>
</template>

<script>
  import  {bus}  from '../bus.js'
  import Advertisement from './Advertisement'
  export default {
    name: 'Login',
    components:{
      'advertisement':Advertisement,
      'bus': bus,
    },
    data () {
      return {
        msg: '妈妈校园',
        buttonDown:false,
        loginDTO:{
          loginWord:null,
          password:null
        }
      }
    },
    computed:{
      disabledLoginButton: function () {
        return _.isNil(this.loginDTO.loginWord) || _.isNil(this.loginDTO.password) || this.buttonDown
      }
    },
    methods:{
      //移动端Android软键盘遮住输入框解决！输入框添加@click="isAndroid"
      isAndroid(){
        if(/Android [4-6]/.test(navigator.appVersion)) {
          window.addEventListener("resize", function() {
              if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
                window.setTimeout(function() {
                  document.activeElement.scrollIntoViewIfNeeded();
                },0);
              }
          })
        }
      },
      login () {debugger;
        this.buttonDown = true;
        var that = this
        this.$axios.post(`${process.env.BACKSTAGE_HOST}/weixinUser/login`,this.loginDTO)
          .then(function(response) {
              if (response.data.success){
                 that.$router.push({name: 'ScanToExam'})
              }else{
                alert(JSON.stringify(response.data.message));
              }
              that.buttonDown = false;
          }).catch(function(response) {
            // 这里是处理错误的回调
            alert(JSON.stringify(response.data));
            that.buttonDown = false;
          });
      },
      toRegisterOption (){
        this.$router.push({name: 'RegisterOption'})
      },
    },
    mounted() {
//        this.clientHeight = document.documentElement.clientHeight;
//        const that = this;
//        // 安卓手机键盘吊起挡住输入框
//
//        window.onresize = function() {
//
//          if(document.documentElement.clientHeight < that.clientHeight) {
//            // scrollVal为负值
//            let scrollVal = document.documentElement.clientHeight-that.clientHeight;
//            document.getElementById("aaa").style.marginTop = scrollVal+'px';
//          }else {
//            document.getElementById("aaa").style.marginTop = 0+'px';
//          }
//        };
    },
    //created() {
    beforeCreate() {
      debugger;
      return;
      var that = this;
      this.$axios.get(`${process.env.BACKSTAGE_HOST}/weixinUser/ifOpenid`).then(function(response) {
        let hasOpenid = response.data;
        if (hasOpenid){
          //alert("有openid了")
          return
        }else{
          let code = that.$route.query.code
          if (code) {
            //alert('有code:'+code)
            that.$axios.get(`${process.env.BACKSTAGE_HOST}/weixinUser/setOpenid/${code}`).then(function(response) {
              //alert('设置openid成功：'+response.data)
            }).catch(function(response) {
              // 这里是处理错误的回调
              console.log(response)
            });
          }else{
            //alert('跳转微信服务器获取code')
            window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri='
              +encodeURIComponent(`${process.env.FRONT_HOST}/login`)+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
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
  .page-wrap-normal{
    width:100%;
    height: 55rem;
    margin-top: 0px;
  }
  .weui-cells {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 10px;
    overflow: hidden;
    position: relative;
  }
 </style>
