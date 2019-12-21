<template>
  <div :class="'swiper-container '+swipername">
        <div class="swiper-wrapper">
        <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper' // swiper js文件
import 'swiper/css/swiper.min.css' // swiper css
export default {
  data () {
    return {

    }
  },
  mounted () {
    // console.log(this.swipername)
    // console.log(this.myshuxing)

    let moren = {
      loop: true,
      //   direction:"vertical",

      pagination: {
        el: '.swiper-pagination'
      }
    }
    new Swiper('.' + this.swipername, { ...moren, ...this.myshuxing })
  },
  props: [
    'myshuxing',
    'swipername'
  ]

}
</script>
