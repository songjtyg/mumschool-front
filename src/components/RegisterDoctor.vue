<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:top cross:center " style="width:100%; height: 42rem; ">
    <div style="width:80%; height: 28rem; background: white;opacity: 1;" >
      <group title="">
        <x-input title="用户名/手机" placeholder="请输入用户名/手机" mask="999 9999 9999" v-model="maskValue" :max="13" is-type="china-mobile" style="height: 2rem;"></x-input>
        <x-input title="密码" placeholder="请输入密码" type="password" v-model="password" :min="6" :max="6" @on-change="change" style="height: 2rem;"></x-input>
        <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
        <x-input title="单位" placeholder="" :min="2" :max="5"></x-input>
        <x-input title="科室" placeholder="" :min="2" :max="5"></x-input>
        <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-input title="发送验证码" class="weui-vcode">
          <x-button slot="right" type="primary" mini>发送验证码</x-button>
        </x-input>
      </group>
    </div>
    <div flex="dir:left main:left cross:center "  style="width:80%; height: 1rem; margin-bottom: 1rem;">
    </div>
    <x-button type="primary" style="width:80%; margin-bottom: 1rem;">提交</x-button>
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
