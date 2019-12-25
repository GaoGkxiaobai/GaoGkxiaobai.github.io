<template>
  <div>
    <headnav :class="isflex?'flex':''"></headnav>
    <swiper
      v-if="$store.state.indexData.focusImages"
      :path="{
      slidesPerView: '1',
      centeredSlides: true,
      spaceBetween: 30,
      }"
    >
      <div
        class="swiper-slide"
        v-for="item in $store.state.indexData.focusImages"
        :key="item.adFocusPictureDetail.adId"
      >
        <img :src="item.adFocusPictureDetail.cover" alt />
      </div>
    </swiper>

    <ul class="navul">
      <router-link tag="li" :to="data.link" v-for="data in $store.state.indexData.tomatoes" :key="data.order">
        <img v-lazy="data.img" alt />
        <p>{{data.name}}</p>
      </router-link>
    </ul>
    <div>
      <ul
        v-for="(data,i) in $store.state.indexData.moduleRankDatas"
        :key="i"
        class="ful"
      >
        <li
          v-for="item in data.albumBriefDetailInfos"
          :key="item.id"
          @click="indexclick(item.id,item.anchorInfo.id)"
        >
          <img v-lazy="'http://imagev2.xmcdn.com/'+item.albumInfo.cover" alt />
          <div>
            <h3>{{item.albumInfo.title}}</h3>
            <p>{{item.albumInfo.subTitle }}</p>
            <p>
              <span>
                <i class="iconfont icon-shengyin"></i>
                {{item.statCountInfo.trackCount}}
              </span>
              <span>
                <i class="iconfont icon-erji"></i>
                {{item.statCountInfo.playCount |listenfilter}}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="5"
      infinite-scroll-immediate-check="false"
      class="moveul"
      v-if="$store.state.moveData"
    >
      <h3>更多推荐</h3>
      <li v-for="data in $store.state.moveData" :key="data.data.id">
        <img v-lazy="'http://imagev2.xmcdn.com/'+data.data.albumInfo.cover" alt />
        <div>
          <h3>{{data.data.albumInfo.title}}</h3>
          <p>{{data.data.albumInfo.customTitle}}</p>
          <p>
            <span>
              <i class="iconfont icon-shengyin"></i>
              {{data.data.statCountInfo.trackCount}}
            </span>
            <span>
              <i class="iconfont icon-erji"></i>
              {{data.data.statCountInfo.playCount |listenfilter}}
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import headnav from '@/components/Headnav'
import swiper from '@/components/Swiper'
import { Indicator, InfiniteScroll, Lazyload } from 'mint-ui'
import Vue from 'vue'
Vue.filter('movefilter', list => {
  return list.replace(/\d+/, '')
})
Vue.filter('listenfilter', list => {
  function transform (value) {
    let newValue = ['', '', '']
    let fr = 1000
    const ad = 1
    let num = 3
    const fm = 1
    while (value / fr >= 1) {
      fr *= 10
      num += 1
    }
    if (num <= 4) {
      // 千
      newValue[1] = '千'
      newValue[0] = parseInt(value / 1000) + ''
    } else if (num <= 8) {
      // 万
      const text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
      // tslint:disable-next-line:no-shadowed-variable
      const fm = text1 === '万' ? 10000 : 10000000
      newValue[1] = text1
      newValue[0] = value / fm + ''
    } else if (num <= 16) {
      // 亿
      let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
      text1 = (num - 8) / 4 > 1 ? '万亿' : text1
      text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
      // tslint:disable-next-line:no-shadowed-variable
      let fm = 1
      if (text1 === '亿') {
        fm = 100000000
      } else if (text1 === '千亿') {
        fm = 100000000000
      } else if (text1 === '万亿') {
        fm = 1000000000000
      } else if (text1 === '千万亿') {
        fm = 1000000000000000
      }
      newValue[1] = text1
      newValue[0] = parseInt(value / fm) + ''
    }
    if (value < 1000) {
      newValue[1] = ''
      newValue[0] = value + ''
    }
    return newValue.join('')
  }
  return transform(+list)
}) // 数字格式
export default {
  data () {
    return {
      isflex: false,
      loading: false,
      nonull: false
    }
  },
  components: {
    headnav,
    swiper
  },
  watch: {
    $route (to, from) {
      console.log(to.path)
    }
  },
  beforeCreate () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
  },
  created () {
    this.$store.dispatch('getindexdata', this.$route.name)
  },
  mounted () {
    window.onscroll = this.myscroll
  },
  beforeDestroy () {
    window.onscroll = null
    this.$store.state.indexData = []
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.$store.state.moveData = []
  },
  props: ['boolean'],
  methods: {
    indexclick (id, aid) {
      // this.$router.push(`/detail/${id}`);
      this.$router.push({ name: 'detail', params: { myid: id, aid: aid } })
    },
    myscroll () {
      if (
        (document.documentElement.scrollTop + 10 ||
          document.body.scrollTop + 10) >= this.$store.state.topH
      ) {
        // 判断滚动距离
        // document.documentElement.scrollTop  页面滚动距离
        // document.body.scrollTop  页面滚动距离兼容写法
        this.isflex = true
        this.he =
          document.documentElement.scrollTop + 10 ||
          document.body.scrollTop + 10
      } else {
        this.isflex = false
      }
    },
    loadMore () {
      this.loading = true
      this.$store.dispatch('getMove', this.$route.name)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.swiper-slide {
  width: 200%;
  img {
    height: 1.39rem;
    width: 3.23rem;
    overflow: auto;
  }
}
// .swiper-slide-prev{

// }
// .swiper-slide-next{

// }
.swiper-slide-active{
  left:0.5rem;
}
div {
  width: 100%;
  overflow: hidden;
  ul.navul {
    overflow: hidden;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.1rem;
    li {
      float: left;
      margin: 0.1rem;
      img {
        width: 0.34rem;
        height: 0.34rem;
        border-radius: 50%;
      }
      p {
        font: 0.12rem/0.12rem "宋体";
        color: #666666;
      }
    }
  }

  .moveul {
    width: 100%;
    padding: 0.15rem;
    h3 {
      width: 100%;
      height: 0.24rem;
      font: 0.18rem/0.24rem "宋体";
      color: #333333;
      font-weight: bold;
      span {
        // display: inline-block;
        // width: 3rem;
        // text-align: right;
        float: right;
        margin-right: 0.3rem;
        font: 0.12rem/0.24rem "宋体";
        color: #72727b;
      }
    }
    li {
      width: 100%;
      overflow: hidden;
      padding: 0.15rem 0.1rem 0.15rem 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 0.7rem;
        height: 0.7rem;
        float: left;
        margin-right: 0.2rem;
      }
      div {
        float: left;
        width: 2.89rem;
        h3 {
          font: 0.16rem/0.16rem "宋体";
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          font: 0.13rem/0.13rem "宋体";
          color: #999999;
          margin: 0.05rem 0 0.07rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          font: 0.13rem/0.13rem "宋体";
          color: #999999;
          margin-right: 0.2rem;
        }
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }

  ul.ful {
    width: 100%;
    overflow: hidden;
    margin: 0.17rem 0 0.17rem 0.15rem;
    h3 {
      width: 100%;
      height: 0.24rem;
      font: 0.18rem/0.24rem "宋体";
      color: #333333;
      font-weight: bold;
      margin: 0 0 0.17rem 0;
    }
    li {
      float: left;
      width: 1.22rem;
      height: 1.75rem;
      overflow: hidden;
      margin: 0 0.03rem;
      img {
        width: 1.22rem;
        height: 1.22rem;
        display: block;
      }
      div {
        h3 {
          margin: 0;
          font: 0.13rem/0.13rem "宋体";
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0.06rem 0 0.11rem 0;
        }
        p {
          display: none;
        }
        span {
          display: none;
        }
      }
    }
    li:nth-child(3) ~ li {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 0.15rem 0.1rem 0.15rem 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 0.7rem;
        height: 0.7rem;
        float: left;
        margin-right: 0.2rem;
      }
      div {
        float: left;
        width: 2.89rem;
        h3 {
          font: 0.16rem/0.16rem "宋体";
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }
        p {
          display: block;
          font: 0.13rem/0.13rem "宋体";
          color: #999999;
          margin: 0.05rem 0 0.07rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: inline-block;
          font: 0.13rem/0.13rem "宋体";
          color: #999999;
          margin-right: 0.2rem;
        }
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
</style>
