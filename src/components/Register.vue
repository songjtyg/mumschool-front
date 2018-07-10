<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 42rem; ">
    <div style="width:80%; height: 10rem; background: white;opacity: 1;" >
      <!--<group>-->
      <!--<radio title="title" :selected-label-style="{color: '#FF9900'}" :options="options"></radio>-->
      <!--</group>-->

      <group>
        <checklist  :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
      </group>
    </div>
    <div flex="dir:left main:right cross:center "  style="width:80%; height: 2rem; margin-bottom: 1rem;">
      <img slot="icon" src="../assets/images/lock.png"  style="width:1.5rem;height:1.5rem"/><a style="color:white;">忘记密码</a>
    </div>
    <x-button type="primary" style="width:80%; margin-bottom: 1rem;">提交</x-button>
  </div>
</template>

<script>

  import  {bus}  from '../bus.js'
  export default {
    name: 'Register',
    components:{
      bus
    },
    data () {
      return {
        msg: '妈妈校园',
        commonList: [ 'China', 'Japan', 'America' ],
        options : [{
          icon:require('../assets/images/i-am-doctor.png'),
          key: '001',
          value: '医生'
        }, {
          icon: require('../assets/images/i-am-pregnant.png'),
          key: '002',
          value: '孕妇'
        }, {
          icon: require('../assets/images/i-am-mum.png'),
          key: '003',
          value: '宝妈'
        }]
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
