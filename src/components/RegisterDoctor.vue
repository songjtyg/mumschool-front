<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 36rem; ">
    <div style="width:85%; height: 25rem; background: white;opacity: 1;" >
      <group title="">
        <x-input title="姓名" name="username" v-model="registerDto.userName" placeholder="请输入姓名" is-type="china-name"></x-input>
        <x-input title="密码" v-model="registerDto.password" placeholder="请输入密码" type="password" v-model="password" :min="6" :max="6" @on-change="change" style="height: 2rem;"></x-input>
        <x-input title="单位" v-model="registerDto.hospital" placeholder="请输入单位" :min="2" :max="5"></x-input>
        <x-input title="科室"  v-model="registerDto.department" placeholder="请输入科室" :min="2" :max="5"></x-input>
        <x-input title="手机号码" name="registerDto.mobile" placeholder="请输入手机号" keyboard="number" is-type="china-mobile"  mask="999 9999 9999" ></x-input>
        <x-input title="验证码" class="weui-vcode">
          <x-button slot="right" type="primary" mini style="width:9rem">发送验证码</x-button>
        </x-input>
      </group>
    </div>
    <div flex="dir:left main:left cross:center "  style="width:85%; height: 0.5rem; margin-bottom: 0.5rem;">
    </div>
    <x-button type="primary"  @click.native="register" style="width:85%; margin-bottom: 1rem;">提交</x-button>
    <div flex="dir:left main:left cross:center "  style="width:85%; height: 1rem; margin-bottom: 1rem;">
      <a style="color:white;">*注册孕婴宝俱乐部，代表您已阅读并同意隐私条款</a>
    </div>
  </div>
</template>

<script>

  import  {bus}  from '../bus.js'
  export default {
    name: 'RegisterDoctor',
    components:{
      bus
    },
    data () {
      return {
        msg: '妈妈校园',
        registerDto:{
          registType:null,
          userName:null,
          password:null,
          hospital:null,
          department:null,
          mobile:null
        }
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
        var that = this;
        this.$axios.post('http://mumschool.ngrok.xiaomiqiu.cn/mumschool/weixinUser/register',registerDto,{
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
