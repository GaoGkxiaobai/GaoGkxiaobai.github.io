<template>
    <!-- <div>
        {{this.top}}
        {{this.left}}
        {{shishi()}}
    </div> -->
    <ul class="toprightul">
        <li class="toprightli clear" v-for="(data,index) in list" :key="data.id">
          <span class="iconfont toprightliic">
            <!-- &#xe630; -->
            {{index+1}}
            </span>
          <img class="toprightliimg" :src="'https://imagev2.xmcdn.com/'+data.albumInfo.cover" alt="">
          <div class="toprightliright" >
            <!-- <img class="toprightliimg" :src="'https://imagev2.xmcdn.com/'+data.albumInfo.cover" alt=""> -->
            <h2>{{data.albumInfo.title}}</h2>
            <p>{{(data.albumInfo.customTitle)?data.albumInfo.customTitle:data.albumInfo.recommendReason}}</p>
            <span class="iconfont ">&#xe63a;</span>
            <span class="toprightlirightbofang">{{data.statCountInfo.playCount}}</span>
            <span class="iconfont ">&#xe87c;</span>
            <span>{{data.statCountInfo.trackCount}}</span>
          </div>
        </li>
    </ul>
</template>
<script>
import Axios from 'axios'
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
      Axios({
        url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${this.left}`
      }).then((res) => {
        // console.log(res.data.data.rankModuleInfoList)
        this.list = res.data.data.rankModuleInfoList
      })
    }
  },
  mounted () {
  // updated(){
    Axios({
      url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${this.left}`
    }).then((res) => {
      // console.log(res.data.data.rankModuleInfoList)
      this.list = res.data.data.rankModuleInfoList
    })
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
.toprightul{
    width: 100%;
    font-size: 0.2rem;
    .toprightli{
      width: 100%;
      padding: 0.15rem 0.1rem 0.15rem 0;
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
</style>
