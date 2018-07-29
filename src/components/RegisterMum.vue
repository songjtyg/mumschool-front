<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; ">
    <advertisement></advertisement>
    <div style="width:85%; height: 28rem; margin-top: 0.5rem; background: white;opacity: 1;" >
      <group title="">
        <x-input title="名称" v-model="registerDto.userName" placeholder="请输入名称" required></x-input>
        <x-input title="密码" v-model="registerDto.password" placeholder="请输入密码" type="password" :min="6" :max="6" @on-change="change" style="height: 2rem;" required></x-input>
        <selector title="宝宝性别" v-model="registerDto.gender" :options="genderList" required></selector>
        <x-input title="宝宝出生年月"  v-model="registerDto.birthday" placeholder="请输入宝宝出生年月" :min="2" :max="5" required></x-input>
        <x-input title="手机号码" v-model="registerDto.phone" placeholder="请输入手机号" keyboard="number" is-type="china-mobile"  mask="999 9999 9999"  required></x-input>
        <x-input title="验证码" v-model="registerDto.verifyCode" class="weui-vcode" required>
          <x-button slot="right" type="primary" :disabled = "smsSended" @click.native="sendSmsVerifyCode" mini >发送验证码</x-button>
        </x-input>
      </group>
    </div>
    <div style="width:85%; height: 1rem; margin: 1rem 0 0 1rem;text-align: left;">
      <a  href="http://mumschool-front.ngrok.xiaomiqiu.cn/login" style="color:white;font-size: 1.2rem;">已有账号?去登陆</a>
    </div>
    <div style="width:85%; height: 4rem; margin-top: 1rem;">
      <x-button type="primary"  :disabled="disabled"  @click.native="register">提交</x-button>
    </div>
    <div style="width:85%; height: 1rem; margin-top: 1rem;text-align: center;">
      <a style="color:white;font-size: 1.2rem;">*注册孕婴宝俱乐部，代表您已阅读并同意隐私条款</a>
    </div>
  </div>
</template>

<script>
  import Advertisement from './Advertisement'
  export default {
    name: 'RegisterMum',
    components:{
      'advertisement':Advertisement,
    },
    data () {
      return {
        msg: '妈妈校园',
        buttonDown:false,
        genderList: [{key: 0, value: '女'}, {key: 1, value: '男'}],
        smsSended:false,
        registerDto:{
          userType:3,
          userName:null,
          password:null,
          hospital:null,//
          department:null,//
          phone:null,
          gestationalWeeks:null,//
          preHospital:null,//
          gender:null,
          birthday:null,
          verifyCode:null
        }
      }
    },
    computed:{
      disabled: function () {
        return !(this.registerDto.userName && this.registerDto.password && this.registerDto.phone && this.registerDto.gender
                  && this.registerDto.birthday && this.registerDto.verifyCode ) || this.buttonDown
      }
    },
    mounted: function () {
      bus.$emit('appointmentOpened', '1');
    },
    methods:{
      userType () {
        this.$router.push({path: '/userType'})
      },
      sendSmsVerifyCode() {debugger
        this.smsSended = true
        var that = this
        this.$axios.post(`http://mumschool.ngrok.xiaomiqiu.cn/shortMessage/sendSmsVerifyCode/${this.registerDto.phone}`)
          .then(function(response) {
            if (response.data.success) {
              //设定5s后 可以重新发送短信
              var count = 20;
              var timer = setTimeout(fn, 1000);

              function fn() {
                count--;
                if (count > 0) {
                  //that.innerHTML = "剩余时间"+ count +"s";
                  setTimeout(fn, 1000);
                } else {
                  //that.innerHTML ="重新发送短信";
                  that.smsSended = false;
                }
              }
            } else {
              that.smsSended = false
              alert(JSON.stringify(response.data.message))
            }
          }).catch(function(response) {
            that.smsSended = false
            alert(JSON.stringify(response.data.message))
        });
      },
      register(){ debugger
        this.buttonDown = true;
        let params = this.registerDto;
        let that = this
        this.$axios.post('http://mumschool.ngrok.xiaomiqiu.cn/weixinUser/register',params)
          .then(function(response) {
              if (response.data.success){
                alert("恭喜，您注册成功，请登录")
                // 这里是处理正确的回调
                that.$router.push({name: 'Login'})
              }else{
                alert("注册失败："+response.data.message)
              }
              that.buttonDown = false;
          }).catch(function(response) {
            // 这里是处理错误的回调
            alert(JSON.stringify(response))
            that.buttonDown = false;
          });
      }
    }
  }
</script>
<style scoped>

</style>
