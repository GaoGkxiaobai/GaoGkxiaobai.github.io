<template>
  <div class="resultall" v-if="$store.state.resultData">
    <h3 class="h3top">'{{$route.params.all}}'相关的主播</h3>
    <ul class="zhuboul" ref="ul">
      <li v-for="data in $store.state.resultData.userViews.users" :key="data.userInfo.uid">
        <img :src="data.userInfo.smallPic" alt />
        <div>
          <p>{{data.userInfo.nickname}}</p>
          <span>{{data.userInfo.followers_counts}}</span>
        </div>
      </li>
    </ul>
    <ul class="zhuanjiul">
      <h3>
        '{{$route.params.all}}'相关的专辑
        <span>更多></span>
      </h3>
      <li
        v-for="data in $store.state.resultData.albumViews.albums"
        :key="data.albumInfo.id"
        @click="resutltclick(data.albumInfo.id)"
      >
        <img :src="data.albumInfo.cover_path" alt />
        <div>
          <h3>{{data.albumInfo.title}}</h3>
          <p>{{data.albumInfo.recommend_reason || (data.albumInfo.intro).trim()}}</p>
          <p>
            <span>{{data.albumInfo.nickname}}</span>
            <span>
              <i class="iconfont icon-shengyin"></i>
              {{data.albumInfo.tracks}}
            </span>
            <span>
              <i class="iconfont icon-erji"></i>
              {{data.albumInfo.play | listenfilter}}
            </span>
          </p>
        </div>
      </li>
    </ul>

    <ul class="soundul">
      <h3>
        '{{$route.params.all}}'相关的声音
        <span>更多></span>
      </h3>
      <li v-for="data in $store.state.resultData.trackViews.tracks" :key="data.trackInfo.id">
        <img :src="data.trackInfo.album_cover_path" alt />
        <div>
          <h3>{{data.trackInfo.title}}</h3>
          <p>
            <span>播放：{{data.trackInfo.count_play |listenfilter}}</span>
            <span>评论：{{data.trackInfo.count_comment}}</span>
            <span>时长：{{data.trackInfo.duration }}</span>
          </p>
        </div>
      </li>
    </ul>

    <ul class="tingul">
      <h3>'{{$route.params.all}}'相关的听单</h3>
      <li v-for="data in $store.state.resultData.specialViews.specials" :key="data.id">
        <img
          :src="'http://imagev2.xmcdn.com/'+data.cover_path_small+'!op_type=3&columns=140&rows=140'"
          alt
        />
        <div>
          <h3>{{data.title}}</h3>
          <p>
            <span>播放次数：{{data.count}}</span>
            <span>{{data.updated_at |Timeupdate}}</span>
          </p>
        </div>
      </li>
    </ul>
    <bottom></bottom>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
import Vue from 'vue'
import bottom from '@/components/bottom'
// Vue.filter('time',(list)=>{

// })
Vue.filter('Timeupdate', function getTime (nS) {
  var date = new Date(parseInt(nS))
  var year = date.getFullYear()
  var mon = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + mon + '-' + day + '更新'
})
export default {
  components: {
    bottom
  },
  methods: {
    resutltclick (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  created () {
    this.$store.state.resultpath = this.$route.params.all
    this.$store.dispatch('getresultall', this.$route.params.all)
  },
  mounted () {
  },
  updated () {
    var square = document.querySelector('.' + this.$refs.ul.className)
    var hammer = new Hammer(square)
    hammer.on('swipeleft', function (e) {
      var ul = e.target.closest('ul')
      var left = ul.offsetLeft
      if (-left >= ul.offsetWidth / 2) {
        left = 150
      }
      ul.style.left = left - 200 + 'px'
    })
    hammer.on('swiperight', function (e) {
      var ul = e.target.closest('ul')
      var left = ul.offsetLeft
      if (left > -150) {
        left = -150
      }
      ul.style.left = left + 200 + 'px'
    })
  }
}
</script>
<style lang="scss" scoped>
.resultall {
  width: 100%;
  overflow: hidden;
}
.h3top {
  padding-left: 0.15rem;
  padding-top: 0.2rem;
  font: 0.18rem/0.18rem "宋体";
  color: #40404c;
}
.zhuboul {
  padding-left: 0.15rem;
  padding-top: 0.2rem;
  width: 250%;
  position: relative;
  left: 0;
  overflow-x: auto;
  transition: 0.5s;
  li {
    float: left;
    // overflow: hidden
    margin: 0.15rem 0 0 0.15rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      float: left;
      margin-right: 0.05rem;
    }
    div {
      float: left;
      position: relative;
      height: 0.4rem;
      p {
        font: 0.14rem/0.14rem "宋体";
        color: #40404c;
      }
      span {
        position: absolute;
        font: 0.12rem/0.12rem "宋体";
        color: #a3a3ac;
        top: 0.2rem;
      }
    }
  }
}
.zhuanjiul {
  padding-left: 0.15rem;
  padding-top: 0.2rem;
  h3 {
    font: 0.18rem/0.18rem "宋体";
    color: #40404c;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      float: right;
      margin-right: 0.2rem;
      font: 0.14rem/0.14rem "宋体";
      color: #ccc;
    }
  }
  li {
    width: 100%;
    padding: 0.15rem 0 0.15rem 0;
    overflow: hidden;
    border-bottom: 0.01rem solid #ccc;
    img {
      width: 0.7rem;
      height: 0.7rem;
      margin-right: 0.15rem;
      float: left;
    }
    div {
      float: left;
      width: 3.04rem;
      h3 {
        font: 0.16rem/0.16rem "宋体";
        color: #333;
      }
      p {
        width: 3rem;
        font: 0.13rem/0.13rem "宋体";
        color: #999;
        margin: 0.05rem 0 0.07rem 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          margin: 0 0.1rem 0 0;
        }
      }
    }
  }
}

.soundul {
  padding-left: 0.15rem;
  width: 100%;
  padding-top: 0.2rem;
  h3 {
    font: 0.18rem/0.18rem "宋体";
    color: #40404c;
    width: 100%;
    span {
      float: right;
      margin-right: 0.2rem;
      font: 0.14rem/0.14rem "宋体";
      color: #ccc;
    }
  }
  li {
    width: 100%;
    padding: 0.15rem 0 0.15rem 0;
    overflow: hidden;
    border-bottom: 0.01rem solid #ccc;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.15rem;
      float: left;
      border-radius: 50%;
    }
    div {
      // overflow: hidden;
      h3 {
        font: 0.16rem/0.22rem "宋体";
        color: #40404c;
        font-weight: 600;
      }
      p {
        width: 3rem;
        font: 0.12rem/0.12rem "宋体";
        color: #999;
        margin: 0.1rem 0 0.07rem 0.7rem;
        span {
          margin: 0 0.1rem 0 0;
        }
      }
    }
  }
}

.tingul {
  padding-left: 0.15rem;
  width: 100%;
  padding-top: 0.2rem;
  h3 {
    font: 0.18rem/0.18rem "宋体";
    color: #40404c;
    width: 100%;
    span {
      float: right;
      margin-right: 0.2rem;
      font: 0.14rem/0.14rem "宋体";
      color: #ccc;
    }
  }
  li {
    width: 100%;
    padding: 0.15rem 0 0.15rem 0;
    overflow: hidden;
    border-bottom: 0.01rem solid #ccc;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.15rem;
      float: left;
    }
    div {
      // overflow: hidden;
      h3 {
        font: 0.16rem/0.16rem "宋体";
        color: #40404c;
      }
      p {
        width: 3rem;
        font: 0.12rem/0.12rem "宋体";
        color: #999;
        margin: 0.1rem 0 0.07rem 0.7rem;
        span {
          margin: 0 0.1rem 0 0;
        }
      }
    }
  }
}
</style>
