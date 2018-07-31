<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; ">
    <advertisement></advertisement>
    <div style="width:85%; height: 28rem; margin-top: 0.5rem; background: white;opacity: 1;" >
      <group title="">
        <x-input title="名称" v-model="registerDto.userName" placeholder="请输入名称" :min="1" :max="32" required></x-input>
        <x-input title="密码" v-model="registerDto.password" placeholder="请输入密码" type="password" :min="6" :max="6" @on-change="change" style="height: 2rem;" required></x-input>
        <selector title="孕周" v-model="registerDto.gestationalWeeks" :options="gestationalWeeksList"></selector>
        <x-input title="预产医院"  v-model="registerDto.preHospital" placeholder="预产医院" :min="1" :max="32" ></x-input>
        <x-input title="手机号码" v-model="registerDto.phone" placeholder="请输入手机号" keyboard="number" is-type="china-mobile"  mask="99999999999"></x-input>
        <x-input title="验证码" v-model="registerDto.verifyCode" class="weui-vcode" required>
          <x-button slot="right" type="primary" :disabled = "disabledSmsButton" @click.native="sendSmsVerifyCode" mini >发送验证码</x-button>
        </x-input>
      </group>
  </div>
    <div style="width:85%; height: 1rem; margin: 1rem 0 0 1rem;text-align: left;">
      <router-link to="/login" style="color:white;font-size: 1.2rem;">已有账号?去登陆</router-link>
    </div>
    <div style="width:85%; height: 4rem; margin-top: 1rem;">
      <x-button type="primary"  :disabled="disabledSubmitButton"  @click.native="register">提交</x-button>
    </div>
    <div style="width:85%; height: 1rem; margin-top: 1rem;text-align: center;">
      <a style="color:white;font-size: 1.2rem;">*注册孕婴宝俱乐部，代表您已阅读并同意隐私条款</a>
    </div>
  </div>
</template>

<script>
  import Advertisement from './Advertisement'
  export default {
    name: 'RegisterPregnant',
    components:{
      'advertisement':Advertisement,
    },
    data () {
      return {
        msg: '妈妈校园',
        buttonDown:false,
        smsButtonDown:false,
        gestationalWeeksList: [{key: 3, value: '<4周'}, {key: 4, value: '4周'}, {key: 5, value: '5周'}, {key: 6, value: '6周'},
                               {key: 7, value: '7周'},{key: 8, value: '8周'},{key: 41, value: '>大于40周'}],
        registerDto:{
          userType:2,
          userName:null,
          password:null,
          hospital:null,//
          department:null,//
          phone:null,
          gestationalWeeks:null,
          preHospital:null
        }
      }
    },
    computed:{
      disabledSubmitButton: function () {
        return _.isNil(this.registerDto.userName) || _.isNil(this.registerDto.password) || this.registerDto.password.length <6 || _.isNil(this.registerDto.phone) || this.registerDto.phone.length != 11 ||
                  _.isNil(this.registerDto.verifyCode) || this.buttonDown
      },
      disabledSmsButton: function () {
        return _.isNil(this.registerDto.phone) || this.smsButtonDown
      }
    },
    mounted: function () {
    },
    methods:{
      userType () {
        this.$router.push({path: '/userType'})
      },
      register(){ debugger
        this.buttonDown = true;
        let params = this.registerDto;
        let that = this
        this.$axios.post(`${process.env.BACKSTAGE_HOST}/weixinUser/register`,params)
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
      },
      sendSmsVerifyCode() {debugger
        this.smsButtonDown = true
        var that = this
        this.$axios.post(`${process.env.BACKSTAGE_HOST}/shortMessage/sendSmsVerifyCode/${this.registerDto.phone}`)
          .then(function(response) {
            if (response.data.success) {
              //设定20s后 可以重新发送短信
              var count = 20;
              var timer = setTimeout(fn, 1000);

              function fn() {
                count--;
                if (count > 0) {
                  //that.innerHTML = "剩余时间"+ count +"s";
                  setTimeout(fn, 1000);
                } else {
                  //that.innerHTML ="重新发送短信";
                  that.smsButtonDown = false;
                }
              }
            } else {
              that.smsButtonDown = false
              alert(JSON.stringify(response.data.message))
            }
          }).catch(function(response) {
          that.smsButtonDown = false
          alert(JSON.stringify(response.data.message))
        });
      },
    }
  }
</script>
<style scoped>

</style>
