<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:center cross:center " style="width:100%; height: 42rem; ">
      恭喜，你的得分是{{score}}，未过！我要再考一次。
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
      this.score = this.$route.params;
    },
    methods:{
    }
  }
</script>
<style scoped>
</style>
