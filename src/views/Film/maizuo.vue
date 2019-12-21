<template>
<!-- <keep-alive> -->
  <ul
    v-infinite-scroll="myLoadMore"
    infinite-scroll-distance="100"
    infinite-scroll-disabled="loading"
    infinite-scroll-immediate-check="false"
  >
      <!-- <li v-for="data in maizuo" :key="data.filmId" @click="handleClick(data.filmId)"> -->
        <router-link v-for="data in maizuo" :key="data.filmId" :to="'/detail/'+data.filmId" tag="li" activeClass="active">
          <div class="zuo">
          <img :src="data.poster" alt="data.name">
          </div>
          <div class="you">
              <h2>{{data.name}}</h2>
              <p v-if="data.grade">评分：{{data.grade}}</p>
              <p>{{data.premiereAt | maizuoTime}}</p>
              <p>导演：{{data.director}}</p>
              <p>
                <span v-for="(aa,i) in data.actors" :key="i">{{aa.name}} </span>
              </p>
              <!-- <p>{{  data.synopsis }}</p> -->
          </div>
        </router-link>
      <!-- </li> -->

  </ul>
<!-- </keep-alive> -->
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
// import { Indicator } from 'mint-ui'
import { mapState } from 'vuex'
// import BScroll from 'better-scroll'

Vue.filter('maizuoTime', function getTime (nS) {
  var date = new Date(parseInt(nS) * 1000)
  var year = date.getFullYear()
  var mon = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + mon + '-' + day + '上映'
})
export default {
  data () {
    return {
      // list: []
      loading: false
    }
  },
  computed: {
    ...mapState(['maizuo']),
    ...mapState(['maizuototal'])
  },
  mounted () {
    if (this.maizuo.length === 0) {
      this.$store.dispatch('getmaizuo')
    } else {
      // console.log('加载缓存')
    }
  },
  methods: {
    handleClick (id) {
      // console.log(this.$router) // 路由对象
      // 编程式导航
      // this.$router.push(`/detail/${id}`) // /detail/1111 /detail/2222

      this.$router.push({ name: 'MyDetail', params: { myid: id } })
    },
    myLoadMore () {
      console.log('到底了')
      this.$store.commit('sermaizuoyejia')
      this.loading = true
      if (this.maizuo.length >= this.maizuototal) {
        console.log(222)
        return
      }
      console.log(111)
      this.$store.dispatch('getmaizuolan')
      // console.log(this.maizuo)
      this.loading = false
      // this.$nextTick(() => {
      // // console.log(1)
      //   new BScroll('.ggk', {
      //     scrollbar: {
      //       fade: true,
      //       interactive: false // 1.8.0 新增
      //     }
      //   })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
ul,ol,li{
  list-style: none;
}
ul{
  padding: 0;
}
.ggk{
  position: relative;
}
li{
    overflow: hidden;
    // padding:5px;
    margin: 10px 0px;
    img{
      float: left;
      width: 100px;
    }
  }
  .zuo{
    margin-right: 4px;
  }
  .you{
    // margin-left: 10px;
    padding-left: 10px;
    overflow: hidden;
  }
  p{
    padding: 3px 0px;
    margin: 0px;
    // margin-left: 10px;
  }
</style>
