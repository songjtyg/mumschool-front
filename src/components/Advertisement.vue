<template>
  <div flex="main:center cross:center" style="width:100%; height: 8rem; opacity: 1">
      <div class="advertisement">
      </div>
  </div>
</template>

<script>
  export default {
    name: 'Advertisement',
    data () {
      return {
        msg: '妈妈校园'
      }
    },
    mounted: function () {
    },
    methods:{
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .advertisement{
    width: 100%;
    height: 100%;
    opacity: 1;
    background:url(../assets/images/advertisement.png) no-repeat 0 0;
    background-size: 100% 100%;
    background-position: center center;
    /*background-position: center center;*/
    /*background-clip:border-box;*/
  }
</style>
