<template>
<div id="detail" v-if="toulist.mainInfo">
  <div class="detail_shang">
    <div class="detail_shang_left">
      <img class="detail_zhu_tupian" :src="'http:'+ toulist.mainInfo.cover" alt="toulist.mainInfo.albumTitle">
      <i class="detail_zhu_yueduliang">{{toulist.mainInfo.playCount}}</i>
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
    <h2>节目({{toulist.tracksInfo.trackTotalCount}}) </h2>
    <ul>
      <router-link class="detail_jiemu_li" v-for="data in jiemulist" :key="data.id" tag="li" to="/" >
        <i class="iconfont icon-bofang"></i>
        <div class="detail_jiemu_li_div">
          <p>{{data.trackInfo.title}}</p>
        </div>
        <i class="iconfont icon-xiajiang" id="xia"></i>
      </router-link>
    </ul>
  </div>
</div>
</template>
<script>
import Axios from 'axios'
import Vue from 'vue'

Vue.filter('kongge', list => {
  // console.log(list)
  return list.replace(' ', '<span class="detail_zhongshang_span"><br></span>')
})

export default {
  data () {
    return {
      xiangqing: [],
      toulist: [],
      isxiangqing: false,
      xiangqinghuanzhi: '',
      jiemulist: []
    }
  },
  mounted () {
    // 获取id
    // console.log(this.$route.params) // 正在访问路由
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
    Axios({
      url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage?albumId=${this.$route.params.myid}&page=1&pageSize=10&asc=true`
    }).then((res2) => {
      console.log(res2.data.data.trackDetailInfos)
      this.jiemulist = res2.data.data.trackDetailInfos
    })
  },
  // props:['myid']
  methods: {
    gaixiangqing () {
      this.isxiangqing = !(this.isxiangqing)
    }
  }
}
</script>

<style lang="scss" scoped>
#detail{
  margin-top: 0.5rem;
  font-size: 0.2rem;
  line-height: 0.2rem;
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
    .detail_jiemu_li{
      padding: 0.12rem 0;
      position: relative;
      border-bottom: 0.01rem solid #ccc;
      i{
        font-size: 0.25rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
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
  }
}
</style>
