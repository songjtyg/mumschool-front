<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; margin-top: 1rem;opacity: 1; ">
    <div  style="width:100%; height: 55rem; background-color: gainsboro; font-size:1.6rem;line-height: 2rem;text-align:center; ">
      <div style="width:100%; height: 6rem; box-sizing:border-box; margin-bottom: 1rem; padding:0 2rem;text-align:left;opacity:1;background:white;" >
        <h6 style="text-align:center;">考试简介</h6>
        <p>这次考试以选择题为主,祝您考出好成绩！</p>
      </div>
      <div style="width:100%; height: 10rem; box-sizing:border-box; margin-bottom: 1rem; padding:0 2rem; text-align:left;opacity:1;background:white;" >
        <h6 style="float:left;">题目：</h6>
        <h6 style="float:right;">1/30</h6>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{questionBO.content}}</p>
      </div>
      <div style="width:100%; height: 25rem; box-sizing:border-box; margin-bottom: 1rem; padding:0 2rem; text-align:left;opacity:1;background:white;" >
        <checklist ref="demoObject" :title="'选择答案'" :options="questionBO.questionOptionBOs" v-model="questionBO.examAnswerBO.choices" @on-change="change"></checklist>
      </div>
      <x-button type="primary"  @click.native="nextQuestion" :disabled="!(questionBO != null && questionBO.examAnswerBO.choices != null && questionBO.examAnswerBO.choices.length > 0)" style="width:80%;height: 4rem; margin-top: 2rem;">下一题</x-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Question',
    components:{
    },
    props:[],
    data () {
      return {
        questionBO:{
          questinBankId:null,
          id:null,
          type:null,
          content:null,
          score:null,
          examBO:{
            id:null,
            userId:null,
            questionBankId:null,
            correctNum:null,
            score:null,
            beginTime:null,
            endTime:null,
          },
          examAnswerBO:{
            examId:null,
            questionBankId:null,
            questionId:null,
            choices:[],
            score:null
          },
          questionOptionBOs:[]//{key: '1', value: '001 value'}
        },
      }
    },
    mounted: function () {
      let questionBO = this.$route.params;
      questionBO.questionOptionBOs = questionBO.questionOptionBOs.map(i=>{return {key:i.letter,value:i.content}});
      this.questionBO = questionBO
    },
    methods : {
      nextQuestion : function(){
        var that = this
        that.$axios.post(`${process.env.BACKSTAGE_HOST}/exam/next`,this.questionBO.examAnswerBO).then(function(response) {
          let resp = response.data;
          if (resp.success){
            if (resp.data != null){
              let questionBO = resp.data
              questionBO.questionOptionBOs = questionBO.questionOptionBOs.map(i=>{return {key:i.letter,value:i.content}});
              that.questionBO = questionBO
              return
            }else{
              let params = {examId:that.questionBO.examBO.id}
              that.$axios.get(`${process.env.BACKSTAGE_HOST}/exam/finish`,{ params:params}).then(function(response) {
                let resp = response.data;
                if (resp.success){
                  let params = {score:resp.data}
                  if (params.score >= 6){
                    that.$router.push({name: 'ExamPass',params:params})
                  }else{
                    that.$router.push({name: 'ExamNoPass',params:params})
                  }
                }
              }).catch(function(response) {
                // 这里是处理错误的回调
                alert(JSON.stringify(response))
              });
            }
            return
          }else {
            alert("取下一题失败！")
          }
        }).catch(function(response) {
          // 这里是处理错误的回调
          alert(JSON.stringify(response))
        });

        this.$router.push({name: 'Question',params: this.questionBO.examAnswerBO})
      },
      change : function() {
        return null
      }
    }
  }
</script>
<style scoped>
</style>
