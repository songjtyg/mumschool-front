<template>
  <div style="height: 8rem;width:100%">
    <swiper loop auto height="10rem" :list="urlList" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
    <!--auto-->
  </div>
</template>

<script>

  export default {
    name: 'Advertisement',
    data() {
      return {
        baseList: [{
          url: 'javascript:',
          img: require('../assets/images/advertisement1.jpg'),
          //img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '精品'
        }, {
          url: 'javascript:',
          img: require('../assets/images/advertisement2.jpg'),
          //img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '精品'
        }, {
          url: 'javascript:',
          img: require('../assets/images/advertisement1.jpg'),
          title: '精品',
          fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
        }],
        urlList: [],
        demo06_index: 0,
      }
    },
    methods: {
      demo06_onIndexChange(index) {
        this.demo06_index = index
      },
    },
    mounted: function () {
      this.urlList = this.baseList.map((item, index) => ({
        url: 'http://m.baidu.com',
        img: item.img,
        fallbackImg: item.fallbackImg,
        //title: `(推荐)${item.title}`
      }))
    }
  }
</script>

<style scoped>
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }

  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  .fadeInUp {
    animation-name: fadeInUp;
  }
  .swiper-demo-img img {
    width: 100%;
  }
</style>
