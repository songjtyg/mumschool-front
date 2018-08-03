<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div flex="dir:top main:left cross:center " style="width:100%; height: 55rem; background-color:rgb(229,229,229);opacity: 1">
    <div style="width:100%;height:2rem;text-align: center;margin-top: 4rem;font-size: 1.6rem;" >
      恭喜您，您的得分是{{score}}，通过当前考试！
    </div>
    <div class="happy-face" >
    </div>
    <div class="cert">
      <div style="width:100%;height: 5rem;padding:2rem 0rem;">
        <div style="float:left;width:40%;height: 5rem;">
            证书编号:08080001
        </div>
        <div class="cert-logo">

        </div>
        <div style="float:right;width:40%;height: 5rem;">
            颁发日期:2018年3月6日
        </div>
      </div>
      <div style="text-align: center;height: 5rem;">
        <h2>中国优生科学协会</h2>
      </div>
      <div style="text-align: center;;height: 5rem;">
        <h3>CERTIFICATE</h3>
      </div>
      <div style="text-align: center;;height: 2rem;">
        <h3>结业证书</h3>
      </div>
      <div style="text-align: center; margin:2rem;">
        培训主题：{{'如何培养精英宝贝'}}
      </div>
      <div style="margin:0 2rem;">
          <div style="float:left;width:60%;height: 7rem;">
            <ul>
              <li>
                姓名：{{graduateDTO.name}}
              </li>
              <li>
                <!--年龄{{graduateDTO.old}}   -->
              </li>
              <li>
                科室：{{graduateDTO.department}}
              </li>
              <li>
                单位：{{graduateDTO.hospital}}
              </li>
            </ul>
          </div>
          <div style="float:right;width:40%;height: 7rem;">
            <div>通过本次测试</div>
            <div class="sign-logo"></div>
          </div>
      </div>
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
        graduateDTO: {
          name: null,
          department: null,
          hospital: null
        },
      }
    },
    mounted: function() {
      this.score = this.$route.params.score;

      let that = this
      this.$axios.get(`${process.env.BACKSTAGE_HOST}/weixinUser/getCurrent`)
        .then(function(response) {
          if (response.data.success){
            that.graduateDTO.name = response.data.data.userName
            that.graduateDTO.department = response.data.data.department
            that.graduateDTO.hospital = response.data.data.hospital
          }else{
            alert("获取考生信息失败："+response.data.message)
          }
          that.buttonDown = false;
        }).catch(function(response) {
          // 这里是处理错误的回调
          alert(JSON.stringify(response))
      });
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
  .happy-face{
    width: 100%;
    height: 5rem;
    opacity: 1;
    background:url(../assets/images/happyFace.png) no-repeat 0 0;
    background-color: rgb(229,229,229);
    background-size: 17% 100%;
    background-position: center center;
  }
  .cert{
    width: 80%;
    height: 40rem;
    margin: 1rem 0 1rem 1rem;
    opacity: 1;
    background-color: gray;
    //background:url(../assets/images/bg-doctor.jpg) repeat 0 0;
  }
  .cert-logo{
    float:left;
    width: 20%;
    height: 5rem;
    opacity: 1;
    background:url(../assets/images/cert-logo.png) no-repeat 0 0;
    background-size: 50% 100%;
    background-position: center center;
  }
  .sign-logo{
    width: 100%;
    height: 5rem;
    opacity: 1;
    background:url(../assets/images/sign-logo.png) no-repeat 0 0;
    background-size: 50% 100%;
    background-position: center center;
  }
</style>
