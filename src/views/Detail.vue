<template>
  <div v-if="list">
    <!-- detail--{{myid}} -->
    <div class="sahng">
      <img class="zhuimg" :src="list.poster" alt="">
      <h2>{{list.name}}</h2>
      <p>{{list.category}}</p>
      <p>{{list.premiereAt | detaTime}}</p>
      <p>{{list.nation}}|{{list.runtime}}分钟</p>
      <p>{{list.synopsis}}</p>
    </div>

    <div class="zhong">
      <h3>演职人员</h3>
      <swiper swipername="renyuanname" :myshuxing= "{
          loop: false,
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {}
        }" >
        <div class="swiper-slide" v-for="(data,index) in list.actors" :key="index" >
          <img class="renyuan" :src="data.avatarAddress" :alt="data.name">
          <p>{{data.name}}</p>
          <p>{{data.role}}</p>
        </div>
      </swiper>
      <!-- <ul>
        <li v-for="(data,index) in list.actors" :key="index">
          <img class="renyuan" :src="data.avatarAddress" :alt="data.name">
          <p>{{data.name}}</p>
          <p>{{data.role}}</p>
        </li>
      </ul> -->
    </div>

    <div class="xia" v-if="list.photos">
      <h3>剧照</h3>
      <swiper swipername="juzhaoname" :myshuxing= "{
          loop: false,
          slidesPerView: 2,
          spaceBetween: 30,
          pagination: {}
        }" >
        <div class="swiper-slide" v-for="(data,index) in list.photos" :key="index" >
          <img class="juzhao" :src="data" alt="">
        </div>
      </swiper>
      <!-- <ul>
        <li v-for="(data,index) in list.photos" :key="index">
          <img class="juzhao" :src="data" alt="">
        </li>
      </ul> -->
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import swiper from '../components/swiper'
import Vue from 'vue'

Vue.filter('detaTime', function getTime (nS) {
  var date = new Date(parseInt(nS) * 1000)
  var year = date.getFullYear()
  var mon = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + mon + '-' + day + '上映'
})
export default {
  data () {
    return {
      list: null
    }
  },
  components: {
    swiper
  },
  beforeMount () {
    // console.log(1)
    // this.$store.state.isShow = false//直接改变耦合性太差且不受监控，尽量不要使用
    this.$store.commit('hideTabber')
  },
  beforeDestroy () {
    // console.log(2)
    // this.$store.state.isShow = true
    this.$store.commit('showTabber')
  },
  mounted () {
    // 获取id
    // console.log(this.$route.params.myid) // 当前正在访问的路由，
    // 根据id ajax 请求
    // https://m.maizuo.com/gateway?filmId=4919&k=7000420
    // console.log(this.myid)
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.myid}&k=7000420`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15764847395450313498837","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      // console.log(res.data.data.film)
      this.list = res.data.data.film
    })
  },
  props: ['myid'],
  methods: {

  }
}
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.zhuimg{
  width: 100%;
}
.zhong{

      .renyuan{
        width: 100%;
      }

}

.xia{
  .juzhao{
    display: inline-block;
    width: 100%;
  }
}
</style>
