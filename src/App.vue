<template>
  <div id="main">
    <!-- {{aname}} -->
    <!-- <div class="chengshi" @click=""> -->

      <!-- 城市 -->
    <!-- </div> -->
    <tabber v-if="isShow"></tabber>
    <!-- <tabber v-if="$store.state.isShow"></tabber> -->
    <!-- 路由容器 -->

    <router-view></router-view>
    <!-- <narban name="my name is narban"></narban> -->
    <!-- <maizuo></maizuo> -->
  </div>
</template>

<script>
// import narban from './components/narban'
// import maizuo from './components/maizuo'
import tabber from './components/Tabbar'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      aname: 'ggk'
    }
  },
  computed: {
    ...mapState(['isShow'])
  },
  components: {
    // narban
    // maizuo,
    tabber
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  // #main{
  //   height: 200px;
  //   width: 200px;
  //   background-color: red;
  //   color: white;
  // }
  *{
    margin: 0;
    padding: 0;
  }
  ul,ol,li{
    list-style: none;
  }

  html,body{
    height: 100%;

  }
  #main{
    // height: 100%;
    // position: relative;
    // padding-bottom: 50px;
    // margin: 0;
    // padding: 0;
  }
</style>
