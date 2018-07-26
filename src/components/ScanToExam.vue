<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; margin-top: 1rem;">
    <div style="width:80%; height: 40rem; background: white;opacity: 1; font-size: 1.6rem;line-height: 2rem;text-align:left;" >
      <h6 style="text-align:center;">妈妈校园考试简介</h6>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{questionBankContent}}</p>
    </div>
    <x-button type="primary"  @click.native="scanClick"  style="width:80%;height: 4rem; margin-top: 2rem;">扫码进入考试</x-button>
  </div>
</template>
<script>
  export default {
    name: 'ScanToExam',
    data () {
      return {
        questionBrankId:1,
        questionBankContent: '',
      }
    },
    mounted:  function () {debugger
      var that = this;
      this.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/questionBank/${this.questionBrankId}`)
        .then(function(response) {
          that.questionBankContent = response.data.content;
        })
    },
    methods : {
      scanClick : function(){
        var that =this;
        //这里【url参数一定是去参的本网址】
        this.$axios.get("http://mumschool.ngrok.xiaomiqiu.cn/mumschool/sys/getSignature?pageUrl=http://mumschool-front.ngrok.xiaomiqiu.cn/scanToExam")
          .then(function(response) {
              that.$wechat.config({
                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                debug: false,
                // 必填，公众号的唯一标识
                appId: response.data.appId,
                // 必填，生成签名的时间戳
                timestamp: "" + response.data.timestamp,
                // 必填，生成签名的随机串
                nonceStr: response.data.nonceStr,
                // 必填，签名
                signature: response.data.signature,
                // 必填，需要使用的JS接口列表，所有JS接口列表
                jsApiList: ['checkJsApi', 'scanQRCode']
              });
            }),

        this.$wechat.error(function (res) {
          alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });

        this.$wechat.ready(function () {
          that.$wechat.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {

            }
          });

          that.$wechat.scanQRCode({
            needResult: 1,        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (qrRes) {
              alert("扫描结果："+JSON.stringify(qrRes));
              //window.location.href = qrRes.resultStr;//跳转到该页面///////////////////////////
//              var reg=/^\d+\.\w+$/;   /*定义验证表达式*/
//              if (reg.test(str) == null) {
//                alert("二维码有误")
//                return
//              }
              let params ={
                questionBankId : qrRes.resultStr.split(".")[0],
                qrVerifyCode : qrRes.resultStr.split(".")[1]
              }
              alert("扫描结果："+JSON.stringify(params));
              that.$axios.post(`http://mumschool.ngrok.xiaomiqiu.cn/exam/begin`,params).then(function(response) {
                alert(JSON.stringify(response))
                let resp = response.data;
                if (resp.success){
                  let params2 = resp.data.question
                  that.$router.push({name: 'Question',params:params2})
                  return
                }
              }).catch(function(response) {
                // 这里是处理错误的回调
                alert(JSON.stringify(response))
              });
            }
          });
        });
      }
    },
    //created() {
    beforeCreate() {
      debugger;
      var that = this;
      this.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/weixinUser/ifOpenid`).then(function(response) {
        let hasOpenid = response.data;
        if (hasOpenid){
          //alert("有openid了")
          return
        }else{
          let code = that.$route.query.code
          if (code) {
            //alert('有code:'+code)
            that.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/weixinUser/setOpenid/${code}`).then(function(response) {
              //alert('设置openid成功：'+response.data)
            }).catch(function(response) {
              // 这里是处理错误的回调
              console.log(response)
            });
          }else{
            //alert('跳转微信服务器获取code')
            window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c840e0ffad7c2e&redirect_uri='
              +encodeURIComponent('http://mumschool-front.ngrok.xiaomiqiu.cn/scanToExam')+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
          }
        }
      }).catch(function(response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    }
  }
</script>
<style scoped>
</style>
