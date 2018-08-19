<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; background-color:rgb(229,229,229);opacity: 1">
    <div style="width:100%; height: 10rem; background: green;opacity: 1; font-size: 2rem;color:white;line-height: 4rem;text-align:left;" >
      <h6 style="text-align:center;">中国优生科学协会</h6>
      <h6 style="text-align:center;">中国母婴健康促进全国科普公益百城行</h6>
    </div>
    <div style="width:100%; height: 20rem; background: white;opacity: 1; font-size: 1.6rem;line-height: 2rem;text-align:left;" >
      <h6 style="text-align:center;color:green;font-size: 2rem;">科普知识在线测试</h6>
      <p>本次测试共6题单选题</p>
      <p>测试通过后可以在线申请奖品</p>
      <p>完成答题提交前，请输入手机号码，以便获得奖品确认短信</p>
    </div>
    <x-button type="primary"  @click.native="toQuestionClick"  style="width:80%;height: 4rem; margin-top: 2rem;">参加测试</x-button>
  </div>
</template>
<script>
  //import assign from 'mixins/assign.js'
  export default {
    name: 'MumToExam',
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
      toQuestionClick : function(){
        let params ={
          questionBankId : 2,
          qrVerifyCode : 1234567890
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
    },
    //created() {
    beforeCreate() {
      var that = this;
      this.$axios.get(`${process.env.BACKSTAGE_HOST}/`).then(function(response) {

      }).catch(function(response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    }
  }
</script>
<style scoped>
</style>
