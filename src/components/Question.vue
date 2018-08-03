<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; margin-top: 1rem;opacity: 1; ">
    <div  style="width:100%; height: 55rem; background-color: gainsboro; font-size:1.6rem;line-height: 2rem;text-align:center; ">
      <div style="width:100%; height: 6rem; box-sizing:border-box; margin-bottom: 1rem; padding:0 2rem;text-align:left;opacity:1;background:white;" >
        <h6 style="text-align:center;">考试简介</h6>
        <p>这次考试以选择题为主,祝您考出好成绩！</p>
      </div>
      <div style="width:100%; height: 10rem; box-sizing:border-box; margin-bottom: 1rem; padding:0 2rem; text-align:left;opacity:1;background:white;" >
        <h6 style="float:left;">题目：</h6>
        <h6 style="float:right;">{{bankExamQuestionAnswerBO.questionBO.seq}}/{{bankExamQuestionAnswerBO.questionBankBO.singleNum+bankExamQuestionAnswerBO.questionBankBO.multipleNum}}</h6>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{bankExamQuestionAnswerBO.questionBO.content}}</p>
      </div>
      <div style="width:100%; height: 25rem; box-sizing:border-box; margin-bottom: 1rem; padding:0 2rem; text-align:left;opacity:1;background:white;" >
        <checklist ref="demoObject" :title="'选择答案'" :options="bankExamQuestionAnswerBO.questionBO.questionOptionBOs" v-model="bankExamQuestionAnswerBO.questionBO.examAnswerBO.choices" @on-change="change"></checklist>
      </div>
      <x-button type="primary"  @click.native="nextQuestion" :disabled="!(bankExamQuestionAnswerBO.questionBO != null && bankExamQuestionAnswerBO.questionBO.examAnswerBO.choices != null && bankExamQuestionAnswerBO.questionBO.examAnswerBO.choices.length > 0)" style="width:80%;height: 4rem; margin-top: 2rem;">下一题</x-button>
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
        bankExamQuestionAnswerBO: {
          questionBankBO: {
            id:null,
            title:null,
            content:null,
            singleNum:null,
            multipleNum:null,
            totalScore:null,
            duration:null,
          },
          questionBO: {
            questinBankId: null,
            seq: null,
            id: null,
            type: null,
            content: null,
            score: null,
            examBO: {
              id: null,
              userId: null,
              questionBankId: null,
              correctNum: null,
              score: null,
              beginTime: null,
              endTime: null,
            },
            examAnswerBO: {
              id: null,
              choices: [],
              correct:null,
              score: null
            },
            questionOptionBOs: []//{key: '1', value: '001 value'}
          }
        }
      }
    },
    mounted: function () {
      if (!_.isNil(this.$route.params)) {
        let tempData = this.$route.params;
        tempData.questionBO.questionOptionBOs = tempData.questionBO.questionOptionBOs.map(i=>{return {key:i.letter,value:i.content}});
        this.bankExamQuestionAnswerBO = tempData
      }

    },
    methods : {
      nextQuestion : function(){
        //alert(JSON.stringify(this.bankExamQuestionAnswerBO))
        let examAnswerAndNextDTO = {
            examId: this.bankExamQuestionAnswerBO.questionBO.examBO.id,
            questionBankId: this.bankExamQuestionAnswerBO.questionBankBO.id,
            questionId: this.bankExamQuestionAnswerBO.questionBO.id,
            questionSeq:this.bankExamQuestionAnswerBO.questionBO.seq,
            score: this.bankExamQuestionAnswerBO.questionBO.score,
            choices: this.bankExamQuestionAnswerBO.questionBO.examAnswerBO.choices,
        }
        var that = this
        that.$axios.post(`${process.env.BACKSTAGE_HOST}/exam/next`,examAnswerAndNextDTO).then(function(response) {
          let resp = response.data;
          if (resp.success){
            if (resp.data != null){
              let questionBO = resp.data

              questionBO.questionOptionBOs = questionBO.questionOptionBOs.map(i=>{return {key:i.letter,value:i.content}});
              that.bankExamQuestionAnswerBO.questionBO = questionBO
              return
            }else{
              let params = {examId:that.bankExamQuestionAnswerBO.questionBO.examBO.id}
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
                return
              });
            }
            return
          }else {
            alert("取下一题失败！")
            return
          }
        }).catch(function(response) {
          // 这里是处理错误的回调
          alert(JSON.stringify(response))
          return
        });

      },
      change : function() {
        return null
      }
    }
  }
</script>
<style scoped>
</style>
