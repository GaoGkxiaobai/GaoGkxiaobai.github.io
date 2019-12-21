<template>
  <div>
    <router-link class="chengshi" to="/city" tag="div" activeClass="active" v-if="localStorage.getItem('city_name')">城市</router-link>
    <router-link class="chengshi" to="/city" tag="div" activeClass="active" v-else>{{localStorage.getItem('city_name')}}</router-link>
    <swiper ref='myswiper' class="aaa" :key="list.length" swipername="keiwen" :myshuxing= "{
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
    }" >
      <div class="swiper-slide" v-for="data in list" :key="data.bannerId">
        <img :src="data.imgUrl"/>
      </div>
    </swiper>
    <filmheader :class="isFixed?'fixed':''" :isFixed="isFixed"></filmheader>
<keep-alive include="nowplaying" exclude="comingsoon" max='1'>
    <router-view></router-view>
</keep-alive>

    <!-- <maizuo></maizuo> -->
    <!-- <narban></narban> -->
  </div>
</template>
<script>
// import maizuo from '../components/maizuo'
// import narban from '../components/narban'
import swiper from '../components/swiper'
import filmheader from './Film/FilmHeader'
import Axios from 'axios'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      list: [],
      isFixed: false
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    Axios({
      url: 'https://m.maizuo.com/gateway?type=2&cityId=110100&k=9306705',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15647165941739461757290","bc":"110100"}',
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      // console.log(res.data)
      this.list = res.data.data
      Indicator.close()
    })

    window.onscroll = this.handleScroll
  },
  beforeDestroy () {
    // window.onscroll = ''
    // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq ')
    window.onscroll = null
  },
  methods: {
    handleScroll () {
      // console.log(333)
      if ((document.documentElement.scrollTop || document.body.scrollTop) >=
        this.$refs.myswiper.$el.clientHeight) {
        // this.$refs.myswiper.$el.style.height
        // console.log(111)
        this.isFixed = true
      } else {
        // console.log(222)
        this.isFixed = false
      }
    }
  },
  components: {
    // narban,
    // maizuo,
    swiper,
    filmheader
  }
}
</script>
<style lang="scss" scoped>
  .chengshi{
      position: fixed;
      z-index: 100;
      width: 50px;
      text-align: center;
      background-color:rgba(white, 0.5);
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      margin-left: 5px;
      // margin-top: 5px;
    }
  .swiper-slide{
    img{
      width:100%;
    }
  }

</style>
