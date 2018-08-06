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
  //import assign from 'mixins/assign.js'
  export default {
    name: 'ScanToExam',
    //mixins: [assign],
    data () {
      return {
        questionBankId:1,
        questionBankContent: '',
      }
    },
    mounted:  function () {
      var that = this;
      this.$axios.get(`${process.env.BACKSTAGE_HOST}/questionBank/${this.questionBankId}/content`)
        .then(function(response) {
          if (response.data.success){
            that.questionBankContent = response.data.data;
          }
        }).catch(function(response) {
          // 这里是处理错误的回调
          alert(JSON.stringify(response))
        });
    },
    methods : {
      scanClick : function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var pageUrl = ``
        if (isAndroid) {
          pageUrl =`${process.env.FRONT_HOST}/scanToExam`
        }
        if (isIOS) {
          pageUrl = encodeURIComponent(this.GLOBAL.init_url)
          //url = location.href.split('#')[0]  //hash后面的部分如果带上ios中config会不对
        }

        var that =this;
        this.$axios.get(`${process.env.BACKSTAGE_HOST}/mumschool/sys/getSignature?pageUrl=${pageUrl}`)
          .then(function(response) {
            //alert(JSON.stringify(response.data))
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
                jsApiList: ['checkJsApi','scanQRCode']
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
              //alert("扫描结果："+JSON.stringify(qrRes));
              //window.location.href = qrRes.resultStr;//跳转到该页面///////////////////////////
              var reg=/^\d+\.\w+$/;   /*定义验证表达式*/

              if (reg.test(qrRes.resultStr) == null) {
                alert("二维码有误")
                return
              }
              let params ={
                questionBankId : qrRes.resultStr.split(".")[0],
                qrVerifyCode : qrRes.resultStr.split(".")[1]
              }
              that.$axios.post(`${process.env.BACKSTAGE_HOST}/exam/begin`,params).then(function(response) {
                let resp = response.data;
                if (resp.success){
                  that.$router.push({name: 'Question',params:resp.data})
                  return
                }else {
                  alert(resp.message);
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
            window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.WECHAT_APP_ID}&redirect_uri=`
              +encodeURIComponent(`${process.env.FRONT_HOST}/scanToExam`)+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
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
