<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; background-color:rgb(229,229,229);opacity: 1">
    <div style="width:100%;height:2rem;text-align: center;margin-top: 4rem;font-size: 1.6rem;">
      很抱歉，您的得分是{{score}},未通过当前考试！
    </div>
    <div class="worry">
    </div>
    <div style="height: 5rem;">
    </div>
    <div style="width:100%; height: 5rem;margin-top: 2rem;">
    <x-button type="primary"  @click.native="examAgain" style="width:85%; margin-bottom: 1rem;">再考一次</x-button>
    <x-button type="primary"  @click.native="toFirst" style="width:85%; margin-bottom: 1rem;">放弃退出</x-button>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'ExamNoPass',
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
      examAgain: function(){
        this.$router.push({name: 'ScanToExam'})
      },
      toFirst: function(){
        this.$router.push({name: 'First'})
      }
    }
  }
</script>
<style scoped>
  .worry{
    width: 100%;
    height: 5rem;
    opacity: 1;
    background:url(../assets/images/worryFace.png) no-repeat 0 0;
    background-size: 17% 100%;
    background-position: center center;
  }
</style>
