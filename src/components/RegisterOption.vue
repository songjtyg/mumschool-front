<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; ">
    <advertisement></advertisement>
    <div style="width:80%; height: 13rem; margin-top: 3rem; background: white;opacity: 1;" >
      <group>
         <radio title="title"  :options="options" v-model="userType":selected-label-style="{color: '#FF9900'}" ></radio>
      </group>
    </div>
    <div flex="dir:left main:left cross:center "  style="width:80%; height: 2rem; margin-bottom: 1rem;">
      <img slot="icon" src="../assets/images/lock.png"  style="width:1.5rem;height:1.5rem"/><a style="color:white;">已有账号？去登陆</a>
    </div>
    <x-button type="primary" :disabled="disabledNextButton" @click.native="toRegister"  style="width:80%; margin-bottom: 1rem;">下一步</x-button>
  </div>
</template>

<script>
  import Advertisement from './Advertisement'
  export default {
    name: 'RegisterOption',
    components:{
      'advertisement':Advertisement,
    },
    data () {
      return {
        msg: '妈妈校园',
        userType: null,
        options : [{
          icon:require('../assets/images/i-am-doctor.png'),
          key: '1',
          value: '    我是医生    '
        }, {
          icon: require('../assets/images/i-am-pregnant.png'),
          key: '2',
          value: '    我是孕妇    '
        }, {
          icon: require('../assets/images/i-am-mum.png'),
          key: '3',
          value: '    我是宝妈    '
        }]
      }
    },
    computed:{
      disabledNextButton: function () {
        return _.isNil(this.userType)
      },
    },
    mounted: function () {
    },
    methods:{
      toRegister () {debugger
        if(this.userType == '1') {
          this.$router.push({name: 'RegisterDoctor'})
        } else if(this.userType == '2'){
          this.$router.push({name: 'RegisterPregnant'})
        } else if(this.userType == '3'){
          this.$router.push({name: 'RegisterMum'})
        }
      },
    }
  }
</script>
<style scoped>
</style>
