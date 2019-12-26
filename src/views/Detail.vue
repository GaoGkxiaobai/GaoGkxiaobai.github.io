<template>
<div id="detail" v-if="toulist.mainInfo">
  <div class="detail_shang">
    <div class="detail_shang_left">
      <img class="detail_zhu_tupian" :src="'http:'+ toulist.mainInfo.cover" alt="toulist.mainInfo.albumTitle">
      <i class="detail_zhu_yueduliang">{{toulist.mainInfo.playCount | filter}}</i>
    </div>
    <div class="detail_shang_right">
      <h2>{{toulist.mainInfo.albumTitle}}</h2>
      <a href="#">
        <img :src="'http:'+toulist.anchorInfo.anchorCover" :alt="toulist.anchorInfo.anchorName">
        <i>{{toulist.anchorInfo.anchorName}}</i>
      </a>
      <p>
        <span class="detail_shang_right_span">已订阅{{toulist.anchorInfo.subscribeCount}}人</span>
        <a class="detail_shang_right_dingyue" href="#">+ 免费订阅</a>
        <!-- <span class="detail_zhongshang_span"></span> -->
      </p>
    </div>
  </div>
  <h3 v-if="xiangqing.albumInfo" @click="gaixiangqing()" :class=" isxiangqing?'detail_zhongshang_h3_true':'detail_zhongshang_h3_false'">{{xiangqing.albumInfo.customTitle}}</h3>
  <div v-if="isxiangqing" class="detail_zhongshang">
    <p v-html="xiangqing.albumInfo.shortIntro"></p>
  </div>
  <div class="detail_jiemu">
    <h2 class="detail_jiemu_h2">节目({{toulist.tracksInfo.trackTotalCount}}) <span class="detail_jiemu_h2_span">批量下载</span> </h2>
    <ul>
      <router-link class="detail_jiemu_li" v-for="data in jiemulist" :key="data.id" tag="li" to="/" >
        <i class="iconfont icon-bofang"></i>
        <div class="detail_jiemu_li_div">
          <p>{{data.trackInfo.title}}</p>
        </div>
        <i class="iconfont icon-xiajiang" id="xia"></i>
      </router-link>
    </ul>
    <p v-if="jiemu" class="detail_jiemu_p" @click="jiemujiazai()">加载更多</p>
  </div>
  <div class="xiangsizhuanji">
    <h2 class="xiangsizhuanji_h2">相似专辑</h2>
    <ul class="xiangsizhuanji_ul">
      <router-link class="xiangsizhuanji_li" v-for="data in xiangsizhuanjilist" :key="data.id" tag="li" to="/" >
        <div class="xiangsizhuanji_li_img">
          <img :src="'http://imagev2.xmcdn.com/'+data.albumInfo.cover" :alt="data.albumInfo.title">
          <p class="xiangsizhuanji_li_img_p">
            <i class="iconfont icon-bofang"></i>
            {{data.statCountInfo.playCount | filter}}
          </p>
        </div>
        <div class="xiangsizhuanji_li__div">
          <p class="xiangsizhuanji_li__div_p">{{data.albumInfo.title}}</p>
        </div>
      </router-link>
    </ul>
    <div v-if="isxiangsizhuanjil" class="xiangsizhuanji_div" @click="xiangsizhuanjihuan()"><i>↻换一批</i></div>
    <div v-else class="xiangsizhuanji_div_false" @click="xiangsizhuanjihuan()"><i>↻换一批</i></div>
  </div>
  <Bottom></Bottom>
</div>
</template>
<script>
import Axios from 'axios'
import Vue from 'vue'
import Bottom from '@/components/bottom'

Vue.filter('kongge', list => {
  return list.replace(' ', '<span class="detail_zhongshang_span"><br></span>')
})
// 数字格式
Vue.filter('filter', list => {
  function transform (value) {
    let newValue = ['', '', '']
    let fr = 1000
    let num = 3
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
})

export default {
  data () {
    return {
      xiangqing: [],
      toulist: [],
      isxiangqing: false,
      xiangqinghuanzhi: '',
      jiemulist: [],
      jiemulistid: 1,
      jiemu: true,
      xiangsizhuanjilist: [],
      xiangsizhuanjilistid: 1,
      isxiangsizhuanjil: true
    }
  },
  components: {
    Bottom
  },
  mounted () {
    // 获取id
    // console.log(this.$route.params) // 正在访问路由
    // 头部信息
    Axios({
      url: `/revision/album?albumId=${this.$route.params.myid}`
    }).then(res => {
      // console.log(res.data.data)
      this.toulist = res.data.data
      Axios({
        url: `https://m.ximalaya.com/m-revision/common/anchor/queryAnchorAlbumsByPage?anchorId=${this.toulist.anchorInfo.anchorId}&page=1&pageSize=3&asc=false`
      }).then(res1 => {
        // console.log(res1.data.data.albumBriefDetailInfos[0])
        this.xiangqing = res1.data.data.albumBriefDetailInfos[0]
        this.xiangqing.albumInfo.shortIntro = this.xiangqing.albumInfo.shortIntro.replace(' ', '<br><br>')
      })
    })
    // 节目
    Axios({
      url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage?albumId=${this.$route.params.myid}&page=1&pageSize=10&asc=true`
    }).then((res2) => {
      // console.log(res2.data.data.trackDetailInfos)
      if (Math.floor(res2.data.data.totalCount / res2.data.data.pageSize) == res2.data.data.page) {
        this.jiemu = false
      }
      this.jiemulist = res2.data.data.trackDetailInfos
    })
    // 相似专辑
    Axios({
      url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumRelatedRecommendAlbums?albumId=${this.$route.params.myid}&page=1&pageSize=6`
    }).then((res3) => {
      // console.log(res3.data.data.albumBriefDetailInfos)
      if (Math.floor(res3.data.data.totalCount / res3.data.data.pageSize) == res3.data.data.page) {
        this.isxiangsizhuanjil = false
      }
      this.xiangsizhuanjilist = res3.data.data.albumBriefDetailInfos
    })
  },
  // props:['myid']
  methods: {
    gaixiangqing () {
      this.isxiangqing = !(this.isxiangqing)
    },
    // 加载更多
    jiemujiazai () {
      this.jiemulistid++
      Axios({
        url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage?albumId=${this.$route.params.myid}&page=${this.jiemulistid}&pageSize=10&asc=true`
      }).then((res) => {
        // console.log(res2.data.data.trackDetailInfos)
        if (Math.floor(res.data.data.totalCount / res.data.data.pageSize) == res.data.data.page) {
          this.jiemu = false
        }
        this.jiemulist = [...this.jiemulist, ...res.data.data.trackDetailInfos]
      })
    },
    // 换一批
    xiangsizhuanjihuan () {
      this.xiangsizhuanjilistid++
      // console.log(this.xiangsizhuanjilistid)
      Axios({
        url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumRelatedRecommendAlbums?albumId=${this.$route.params.myid}&page=${this.xiangsizhuanjilistid}&pageSize=6`
      }).then((res2) => {
        // console.log(res2.data.data.albumBriefDetailInfos)
        if (Math.floor(res2.data.data.totalCount / res2.data.data.pageSize) == res2.data.data.page) {
          this.isxiangsizhuanjil = false
        }
        this.xiangsizhuanjilist = res2.data.data.albumBriefDetailInfos
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#detail{
  margin-top: 0.5rem;
  font-size: 0.2rem;
  line-height: 0.2rem;
  font-weight: 400;
  img{
    width: 0.95rem;
    height: 0.95rem;
  }
  //最上面的部分
  .detail_shang{
    background-color: #b1a867;
    // width: 100%;
    height: 1.38rem;
    padding: 0.3rem 0.2rem 0.1rem 0.2rem;
    .detail_shang_left{
      position: relative;
      width: 0.95rem;
      height: 0.95rem;
      display: inline-block;
      margin-right: 0.24rem;
      .detail_zhu_tupian{
        border-radius: 0.06rem;
        width: 0.95rem;
        height: 0.95rem;
      }
      .detail_zhu_yueduliang{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: linear-gradient(90deg,rgba(0,0,0,0) 0,rgba(0,0,0,.25) 100%);
        padding: 0.04rem 0.1rem 0.04rem 0.05rem;
        font-size: 0.12rem;
        line-height: 0.142rem;
        font-weight: 700;
        height: 0.142rem;
        text-align: center;
        color: #fff;
      }
    }
    .detail_shang_right{
      // display: inline-block;
      width: 2.54rem;
      float: right;
      h2{
        font-size: 0.17rem;
        color: #fff;
        line-height: 0.23rem;
        height: 0.46rem;
      }
      a{
        display: block;
        padding: 0.1rem 0;
        position: relative;
        height: 0.2rem;
        img{
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          // display: inline-block;
          float: left;
        }
        i{
          padding-left: 0.06rem;
          line-height: 0.2rem;
          height: 0.2rem;
          float: left;
          font-size: 0.12rem;
          // display: inline-block;
          color: rgba(255,255,255,.81);
        }
      }
      p{
        padding: 0.1rem 0 0 0.1rem;
        border-top: 0.01rem solid rgba(255,255,255,.4);
        .detail_shang_right_span{
          display: inline-block;
          margin: 0.1rem auto -.2rem 0;
          font-size: 0.12rem;
          color: #fff;
        }
        .detail_shang_right_dingyue{
          background: #fff;
          color: #000;
          font-size: 0.14rem;
          float: right;
          width: 0.9053rem;
          height: 0.28rem;
          line-height: 0.28rem;
          border-radius: 0.28rem;
          text-align: center;
          padding: 0;
        }
      }
    }
  }
  //详情部分
  .detail_zhongshang_h3_false{
    padding: 0.2rem 0.15rem 0;
    color: rgba(0,0,0,.8);
    &::after{
      content: '＋';
      color: red;
    }
  }
  .detail_zhongshang_h3_true{
    padding: 0.2rem 0.15rem 0;
    color: rgba(0,0,0,.8);
    &::after{
      content: '-';
      color: red;
    }
  }
  .detail_zhongshang{
    padding: 0.1rem 0.15rem 0;
    p{
      color: rgba(0,0,0,.8);
      font-size: 0.16rem;
      line-height: 0.3rem;
    }
  }
  .detail_jiemu{
    padding: 0.15rem 0.15rem 0;
    .detail_jiemu_h2{
      font-size: 0.18rem;
      color: #333;
      font-weight: 700;
      // position: relative;
      .detail_jiemu_h2_span{
        float: right;
        font-size: 0.14rem;
        color: #f86442;
      }
    }
    .detail_jiemu_li{
      padding: 0.12rem 0;
      position: relative;
      border-bottom: 0.01rem solid #ccc;
      i{
        font-size: 0.25rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(0,0,0,.4);
      }
      .detail_jiemu_li_div{
        display: inline-block;
        width: 3.22rem;
        p{
          width: 100%;
          margin-left: 0.35rem;
          font: 0.16rem "宋体";
          color: #333;
        }

      }
      #xia {
          position: absolute;
          right: 0;
        }
    }
    .detail_jiemu_p{
      text-align: center;
      font-size: 0.15rem;
      padding: 0.17rem 0;
      color: #f86442;
      font-weight: 700;
    }
  }
  //相似专辑
  .xiangsizhuanji{
    padding: 0.15rem 0.15rem 0.22rem 0.15rem;
    margin-bottom: 0.1rem;
    background-color: #fff;
    // font-weight: 400;
    .xiangsizhuanji_h2{
      font-size: 0.18rem;
      color: #333;
      font-weight: 700;
      padding-bottom: 0.1rem;
    }
    .xiangsizhuanji_div{
      margin: 0.1rem auto 0.02rem;
      padding: 0.07rem 0.1rem;
      background: #f24821;
      color: #fff;
      font-size: 0.14rem;
      width: 0.72rem;
      border: 0.01rem solid transparent;
      text-align: center;
      border-radius: 0.14rem;
    }
    .xiangsizhuanji_div_false{
      margin: 0.1rem auto 0.02rem;
      padding: 0.07rem 0.1rem;
      font-size: 0.14rem;
      width: 0.72rem;
      text-align: center;
      border-radius: 0.14rem;
      background: #fff;
      border: 0.01rem solid #c3c3c3;
      color: #c3c3c3;
      pointer-events: none;
    }
    .xiangsizhuanji_ul{
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      flex-flow: wrap;
      .xiangsizhuanji_li{
        width: 30%;
        // display: inline-block;

        .xiangsizhuanji_li_img{
          width: 100%;
          position: relative;
          img{
            display: inline-block;
            width: 1.1519rem;
            height: 1.1519rem;
          }
          .xiangsizhuanji_li_img_p{
            position: absolute;
            bottom: 0;
            left: 0;
            color: white;
            font-size: 0.12rem;
            line-height: 0.18rem;
          }
        }
        .xiangsizhuanji_li__div{
          font-size: 0.13rem;
          line-height: 0.18rem;
          color: #333;
          padding: 0.06rem 0 0.11rem 0;
          height: 0.53rem;
          overflow: hidden;
          .xiangsizhuanji_li__div_p{
            display: -webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
