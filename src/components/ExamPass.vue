<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; background-color:rgb(229,229,229);opacity: 1">
    <div style="width:100%;height:2rem;text-align: center;margin-top: 4rem;font-size: 1.6rem;" >
      恭喜您，您的得分是{{score}}，通过当前考试！
    </div>
    <div class="happy">
    </div>
    <div class="cert">
    </div>
    <div style="width:100%; height: 5rem;margin-top: 2rem;">
      <x-button type="primary"  @click.native="saveCert" style="width:85%; margin-bottom: 1rem;">保存证书</x-button>
      <x-button type="primary"  @click.native="applyPaperCert" style="width:85%; margin-bottom: 1rem;">申请纸质版</x-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExamPass',
    data () {
      return {
        score: 0,

      }
    },
    mounted: function () {
      debugger
      this.score = this.$route.params.score;
    },
    methods:{
      saveCert: function(){
        alert("暂不支持此功能!")
        //this.$router.push({name: 'First'})
      },
      applyPaperCert: function(){
        alert("暂不支持此功能!")
        //this.$router.push({name: 'First'})
      }
    }
  }
</script>
<style scoped>
  .happy{
    width: 100%;
    height: 5rem;
    opacity: 1;
    background:url(../assets/images/happyFace.png) no-repeat 0 0;
    background-size: 17% 100%;
    background-position: center center;
  }
  .cert{
    width: 100%;
    height: 20rem;
    opacity: 1;
    background:url(../assets/images/cert.png) no-repeat 0 0;
    background-size: 50% 100%;
    background-position: center center;
  }
</style>
