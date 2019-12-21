<template>
  <div>
    <!-- narban--{{name}} -->
    <!-- <keep-alive> -->
    <ul>
      <li v-for="data in list" :key="data.id">
        <div class="zuo">
        <img :src="data.img | imgpath" alt="">
        </div>
        <div class="you">
            <p>{{data.nm}}</p>
            <p>评分：{{data.sc}}</p>
            <p>主演：{{data.star}}</p>
            <p>{{  data.showInfo }}</p>
        </div>
      </li>
    </ul>
    <!-- <keep-alive> -->
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter('imgpath', function (url) {
  return url.replace('w.h', '128.180')
})
export default {
  data () {
    return {
      list: []
    }
  },

  props: {
    name: String
  },
  mounted () {
    // console.log(1)
    axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=4583A1E01BD511EA86FEB30EEC01243F6CA9CEB03C394FFABBDDFF904CF84146&optimus_risk_level=71&optimus_code=10').then(res => {
      // console.log(res.data.movieList)
      this.list = res.data.movieList
    })
  }
}
</script>
<style lang="scss" scoped>
ul,ol,li{
  list-style: none;
}
.zuo {
    float: left;
}

.you {
    float: left;
    margin-left: 10px;
}

li {
    padding: 10px;
    overflow: hidden;
}
</style>
