<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; margin-top: 1rem;">
    <div style="width:80%; height: 33rem; background: white;opacity: 1; font-size: 1.6rem;line-height: 2rem;text-align:left;" >
      <h6 style="text-align:center;">妈妈校园简介</h6>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{questionBankContent}}</p>
    </div>
    <div style="width:100%; height: 5rem;margin-top: 1rem;">
      <x-button type="primary"  @click.native="toLogin"  style="width:80%;height: 4rem; margin-top: 2rem;">我要登陆</x-button>
      <x-button type="primary"  @click.native="toScanToExam"  style="width:80%;height: 4rem; margin-top: 2rem;">立即考试</x-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'First',
    data () {
      return {
        questionBankContent: '妈妈校园，非常棒的一个母婴社区，在这里你会学习到很多育儿知识，希望每个会员妈妈都拥有一个健康聪明的宝贝！',
      }
    },
    mounted:  function () {
    },
    methods : {
      toLogin : function(){
        this.$router.push({name: 'Login'})
      },
      toScanToExam : function(){
        this.$router.push({name: 'ScanToExam'})
      }
    },
    //created() {
    beforeCreate() {
      debugger
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
            window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri=`
              +encodeURIComponent(`${process.env.BACKSTAGE_HOST}/first`)+`&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
          }
        }
      }).catch(function(response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    }
  }
</script>
<style>
  .weui-cells {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 10px;
    overflow: hidden;
    position: relative;
  }
</style>
