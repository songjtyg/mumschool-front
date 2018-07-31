<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; ">
    <advertisement></advertisement>
    <div style="width:85%; height: 15rem; margin-top: 5rem; background: white;opacity: 1;" >
      <group title="">
        <x-input title="验证码" v-model="resetDto.verifyCode" class="weui-vcode" required>
          <x-button slot="right" type="primary" :disabled = "smsButtonDown" @click.native="sendSmsVerifyCodeByRegPhone" mini >发送验证码</x-button>
        </x-input>
        <x-input title="请输入新密码" type="password" placeholder="（6位字符）" v-model="resetDto.password" :min="6" :max="6" @on-change="change" required></x-input>
        <x-input title="请重新输入新密码" type="password" placeholder="（6位字符）" v-model="repeatPassword" :min="6" :max="6" :equal-with="resetDto.password" required></x-input>
      </group>
    </div>
    <div style="width:85%; height: 4rem; margin-top: 2rem;">
      <x-button type="primary"  :disabled="disabledSubmitButton"  @click.native="resetPassword">提交</x-button>
    </div>
  </div>
</template>

<script>
  import Advertisement from './Advertisement'
  export default {
    name: 'ResetPassword',
    components:{
      'advertisement':Advertisement,
    },
    data () {
      return {
        msg: '妈妈校园',
        smsButtonDown:false,
        resetButtonDown:false,
        repeatPassword:null,
        resetDto:{
          password:null,
          verifyCode:null
        }
      }
    },
    computed:{
      disabledSubmitButton: function () {
        return  _.isNil(this.resetDto.password) || !this.resetDto.password.length == 6  ||
                _.isNil(this.repeatPassword) || !this.repeatPassword.length == 6 ||
                _.isNil(this.resetDto.verifyCode) || this.resetButtonDown
      },
    },
    mounted: function () {
      bus.$emit('appointmentOpened', '1');
    },
    methods:{
      resetPassword(){ debugger
        this.resetButtonDown = true;
        let params = this.resetDto;
        let that = this
        this.$axios.post(`${process.env.BACKSTAGE_HOST}/weixinUser/resetPassword`,params)
          .then(function(response) {
              if (response.data.success){
                alert("修改成功！")
                // 这里是处理正确的回调
                that.$router.push({name: 'Login'})
              }else{
                alert("修改不成功："+response.data.message)
              }
              that.resetButtonDown = false;
          }).catch(function(response) {
            // 这里是处理错误的回调
            alert("修改不成功："+JSON.stringify(response))
            that.resetButtonDown = false;
          });
      },
      sendSmsVerifyCodeByRegPhone() {debugger
        this.smsButtonDown = true
        var that = this
        this.$axios.post(`${process.env.BACKSTAGE_HOST}/shortMessage/sendSmsVerifyCode/byRegPhone`)
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
