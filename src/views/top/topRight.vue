<template>
    <div class="waicheng">
      <ul class="toprightul clear ggk1">
        <li class="toprightli clear" v-for="(data,index) in list" :key="data.id">
          <span class="iconfont toprightliic color1 spancolor" v-if="index==0">
            &#xe630;
          </span>
          <span class="iconfont toprightliic color2 spancolor" v-else-if="index==1">
            &#xe634;
          </span>
          <span class="iconfont toprightliic color3 spancolor" v-else-if="index==2">
            &#xe631;
          </span>
          <span class="iconfont toprightliic" v-else>
            {{index+1}}
          </span>
          <img class="toprightliimg" v-lazy="'https://imagev2.xmcdn.com/'+data.albumInfo.cover" :alt="data.albumInfo.title">
          <div class="toprightliright" >
            <!-- <img class="toprightliimg" :src="'https://imagev2.xmcdn.com/'+data.albumInfo.cover" alt=""> -->
            <h2>{{data.albumInfo.title}}</h2>
            <p>{{(data.albumInfo.customTitle)?data.albumInfo.customTitle:data.albumInfo.recommendReason}}</p>
            <span class="iconfont ">&#xe63a;</span>
            <span class="toprightlirightbofang">{{(data.statCountInfo.playCount||data.statCountInfo.subscribeCount) | filter}}</span>
            <span class="iconfont ">&#xe87c;</span>
            <span>{{data.statCountInfo.trackCount}}</span>
          </div>
        </li>
    </ul>
    </div>

</template>
<script>
import Axios from 'axios'
import { Indicator } from 'mint-ui'
// import BScroll from 'better-scroll'
import Vue from 'vue'

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
      list: []
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to.path);
      this.rightlist()
    }
  },
  props: ['top', 'left'],
  methods: {
    rightlist () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      Axios({
        url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${this.left}`
      }).then((res) => {
        // console.log(res.data.data.rankModuleInfoList)
        Indicator.close()
        this.list = res.data.data.rankModuleInfoList
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    //   this.$nextTick(() => {
    // // console.log(1)
    //   new BScroll('.ggk1', {
    //     scrollbar: {
    //       fade: true,
    //       interactive: false // 1.8.0 新增
    //     }
    //   })
    // })
    }
  },
  mounted () {
  // updated(){
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    Axios({
      url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${this.left}`
    }).then((res) => {
      // console.log(res.data.data.rankModuleInfoList)
      Indicator.close()
      this.list = res.data.data.rankModuleInfoList
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })
    // this.$nextTick(() => {
    // // console.log(1)
    //   new BScroll('.ggk1', {
    //     scrollbar: {
    //       fade: true,
    //       interactive: false // 1.8.0 新增
    //     }
    //   })
    // })
  }
  // beforeUpdate() {
  //   // console.log(1)
  //   Axios({
  //     url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${this.left}`
  //   }).then((res) => {
  //     console.log(res.data.data.rankModuleInfoList)
  //     this.list = res.data.data.rankModuleInfoList
  //   })
  // }

  // updated() {
  //   // console.log(1)
  //   Axios({
  //     url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${this.left}`
  //   }).then((res) => {
  //     console.log(res.data.data.rankModuleInfoList)
  //     this.list = res.data.data.rankModuleInfoList
  //   })
  // }
}
</script>
<style lang="scss" scoped>
//   position: absolute;
  //   top:0;
  //   left: 0.73rem;
  //   width: 3.37rem;
  //   overflow: hidden;
.waicheng{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .toprightul{
    width:calc(100% + 0.17rem);
    height:calc(100% + 0.17rem);
    font-size: 0.2rem;
    position: relative;
    // width: 100%;
    // height: 100%;
    overflow: auto;
    .toprightli{
      // width: 100%;
      width: calc(100% - 0.27rem);
      padding: 0.15rem 0.27rem 0.15rem 0;
      border-bottom: 0.01rem solid #ccc;
      .toprightliic{
        float: left;
        margin: 0.03rem 0;
        // display: inline-block;
        width: 0.34rem;
        height: 0.19rem;
        text-align: center;
        // font-size: 0.1022rem;
      }
      .toprightliimg{
          // display: inline-block;
          float: left;
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 0.04rem;
          margin-right: 0.15rem
        }
      .toprightliright{
        // float: right;
        // display: inline-block;
        // width: 100%;
        h2{
          font-size: 0.16rem;
          line-height: 0.16rem;
          // display: inline-block;
          //---多行文本超出隐藏-----
          display: -webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow: hidden;
          //-----------------------
        }
        p{
          font-size: 0.13rem;
          line-height: 0.13rem;
          // width: 2.0608rem;
          //---单行文本超出隐藏-----
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          //-----------------------
          color: #999;
          margin: 0.05rem 0 0.1rem;
        }
        span{
          font-size: 0.12rem;
          line-height: 0.12rem;
          color: #999;
          padding: 0 0.01rem;
        }
        .toprightlirightbofang{
          margin-right: 0.1rem;
        }
      }
    }
}
.spancolor{
  font-size: 0.2rem;
  line-height: 0.2rem;
}
.color1{
  color: red;
}
.color2{
  color: orangered;
}
.color3{
  color: orange;
}
}

</style>
