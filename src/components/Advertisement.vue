<template>
  <div flex="main:center cross:center" style="width:100%; height: 8rem; opacity: 1">
    <x-input title="姓名"  placeholder="请输入姓名" :min="1" :max="32" required></x-input>
    qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
    <swiper loop auto :list="demo06_list" :index="demo06_index" ></swiper>
    wwwwwwwwwwwwwwwwwwwwwwwwwww@on-index-change="demo06_onIndexChange"
    <x-input title="姓名1"  placeholder="请输入姓名1" :min="1" :max="32" required></x-input>
    <!--<div class="advertisement">-->
      <!--</div>-->
  </div>
</template>

<script>
  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'
  }]
  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    fallbackImg: item.fallbackImg,
    title: `(可点击)${item.title}`
  }))

  export default {
    name: 'Advertisement',
    data () {
      return {
        msg: '妈妈校园',
        demo06_list: urlList,
        demo06_index: 0,

        demo01_list: baseList,
        demo02_index: 1,
      }
    },
    methods:{
//      demo06_onIndexChange (index) {
//        this.demo06_index = index
//      },
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
    },
    mounted: function () {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .advertisement{
    width: 100%;
    height: 100%;
    opacity: 1;
    /*background:url(../assets/images/advertisement.png) no-repeat 0 0;*/
    background-size: 100% 100%;
    background-position: center center;
    /*background-position: center center;*/
    /*background-clip:border-box;*/
  }
</style>
