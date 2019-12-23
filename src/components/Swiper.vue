<template>
  <div :class="'swiper-container zcj '+swipername ">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper' // 引入swiperjs
import 'swiper/css/swiper.min.css' // 引入swiper css
export default {
  data () {
    return {
      default: {
        loop: true,
        // direction:"vertical",
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    }
  },
  mounted () {
    new Swiper('.' + (this.swipername ? this.swipername : 'zcj'), Object.assign(this.default, this.path))
  },
  props: ['path', 'swipername']
}
</script>
