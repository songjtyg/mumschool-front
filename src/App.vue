<template>
  <div id="app">
    <cap></cap>
    <router-view/>
  </div>
</template>

<script>
  import  Cap  from './components/Cap.vue'
export default {
  name: 'App',
  components:{
    'cap': Cap,
  }
}

</script>

<style>
  @import './assets/css/reset.css'; /*引入公共样式*/
  @import './assets/css/flex.css'; /*引入公共样式*/
#app {
  /*position:fixed;*/
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-position: center 0;
  background-image: url(./assets/images/bg-birth.jpg);
}
</style>
