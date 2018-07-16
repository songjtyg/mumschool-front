<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 42rem; ">
    <div style="width:80%; height: 13rem; background: white;opacity: 1;" >
      <group>
         <radio title="title"  :options="options" v-model="regsiterType":selected-label-style="{color: '#FF9900'}" ></radio>
      </group>
    </div>
    <div flex="dir:left main:left cross:center "  style="width:80%; height: 2rem; margin-bottom: 1rem;">
      <img slot="icon" src="../assets/images/lock.png"  style="width:1.5rem;height:1.5rem"/><a style="color:white;">已有账号？去登陆</a>
    </div>
    <x-button type="primary"  @click.native="toRegister"  style="width:80%; margin-bottom: 1rem;">提交</x-button>
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
        regsiterType: null,
        options : [{
          icon:require('../assets/images/i-am-doctor.png'),
          key: '001',
          value: '    我是医生    '
        }, {
          icon: require('../assets/images/i-am-pregnant.png'),
          key: '002',
          value: '    我是孕妇    '
        }, {
          icon: require('../assets/images/i-am-mum.png'),
          key: '003',
          value: '    我是宝妈    '
        }]
      }
    },
    mounted: function () {
      bus.$emit('appointmentOpened', '1');
    },
    methods:{
      toRegister () {
        if(this.regsiterType == '001')
          this.$router.push({name: 'RegisterDoctor'})
        else if(this.registerType == '002'){
          this.$router.push({path: '/'})
        }else if(this.registerType == '003'){
          this.$router.push({path: '/'})
        }
      },
    }
  }
</script>
<style scoped>
</style>
