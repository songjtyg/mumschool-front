<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; margin-top: 1rem;opacity: 1; ">
    <div  style="width:100%; height: 55rem; background-color: gainsboro; font-size:1.6rem;line-height: 2rem;text-align:center; ">
      <div style="width:100%; height: 5rem; text-align:left;margin-bottom: 1rem; padding:0 2rem;opacity:1;background:white;" >
        <h6 style="text-align:center;">考试简介</h6>
        <p>这次考试以选择题为主,祝您考出好成绩！</p>
      </div>
      <div style="width:100%; height: 10rem; text-align:left;margin-bottom: 1rem; padding:0 2rem;opacity:1;background:white;" >
        <h6 style="float:left;">题目：</h6>
        <h6 style="float:right;">1/30</h6>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{question.content}}</p>
      </div>
      <div style="width:100%; height: 25rem; text-align:left;margin-bottom: 1rem; padding:0 2rem;opacity:1;background:white;" >
        <checklist ref="demoObject" :title="'选择答案'" :options="questionOptionBOs" v-model="objectListValue" @on-change="change"></checklist>
      </div>
      <x-button type="primary"  @click.native="nextQuestion" style="width:80%;height: 4rem; margin-top: 2rem;">下一题</x-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Question',
    components:{
    },

    data () {
      return {
        exam_id:null,
        questin_bank_Id:null,
        question:{
          id:null,
          type:null,
          content:null,
          score:null,
          examAnswerPO:{
            exam_id:null,
            questin_bank_Id:null,
            question_id:null,
            choices:[],
            score:null,
            correct:null
          },
          questionOptionBOs:[]
        },
        questionOptionBOs:[{key: '1', value: '001 value'}],

        objectListValue:null
      }
    },
    mounted: function () {debugger
      let paramsQuestionId = this.$route.params.questionId;
      paramsQuestionId = paramsQuestionId ? paramsQuestionId : 0;
      params
      var that = this;
      this.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/question/saveAndNext`,params)
        .then(function(response) {
          if (response.data.success){
            that.question = response.data;
            //查询
            this.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/questionChoice/questionId/${this.questionId}`)
              .then(function(response) {debugger
                let choices = response.data
                let options = choices.map(function(item){
                  return{ key:item.id,
                    letter:item.letter,
                    value:item.letter+'  '+item.content,
                    correct:item.correct}
                });
                that.questionOptionBOs = options;
              })
          }else{//如果查询不到下一个问题，则认为考试结束，调用计算成绩接口
            this.$axios.get(`http://mumschool.ngrok.xiaomiqiu.cn/${this.examId}`)
              .then(function(response) {debugger
                if (response.data.success){
                  if (response.data.data.score >= 90){
                    this.$router.push({name: 'ExamPass',params: {questionId: this.examId }})
                  }else if (response.data.data.score < 90){
                    this.$router.push({name: 'ExamNoPass',params: {questionId: this.examId }})
                  }
                }
              })
          }

        })

    },
    methods : {
      nextQuestion : function(){
        this.$router.push({name: 'Question',params: {questionId: this.questionId }})
      },
      change : function() {
        return null
      }
    }
  }
</script>
<style scoped>
</style>
