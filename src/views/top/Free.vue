<template>
<div class="waichenga">
  <div class="box">
    <div class="paihangLeft">

      <router-link v-for="data in topLeftList[this.top]"  :key="data.pinyin" :to="'/top/'+top+'/'+data.pinyin"  class="paihangLeft_p" tag="p" activeClass="active" >{{data.name}}</router-link>
      <!-- <p>{{shi()}}</p> -->

    </div>
    <router-view class="r"></router-view>
  </div>
</div>

</template>
<script>
// import Axios from 'axios'
// import BScroll from 'better-scroll'
export default {

  data () {
    return {
      topLeftList: {
        free: [// 免费
          { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        rise: [// 飙升
          { name: '总榜', pinyin: 'all' }, { name: '新品', pinyin: 'all1' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        paid: [// 付费
          { name: '热门', pinyin: 'all' }, { name: '新品', pinyin: 'all1' }, { name: 'VIP', pinyin: 'all2' }, { name: '飙升', pinyin: 'all3' }, { name: '有声书', pinyin: 'youshengshu' },
          { name: '人文', pinyin: 'renwen' }, { name: '教育培训', pinyin: 'jiaoyu' }, { name: '商业财经', pinyin: 'shangye' }, { name: '历史', pinyin: 'lishi' },
          { name: '外语', pinyin: 'waiyu' }, { name: '儿童', pinyin: 'ertong' }, { name: '相声评书', pinyin: 'xiangsheng' }, { name: '艺术', pinyin: 'yishu' }
        ],
        subscribe: [// 订阅
          { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        reputation: [// 好评
          { name: '热门', pinyin: 'all' }, { name: '头条', pinyin: 'toutiao' }, { name: '音乐', pinyin: 'yinyue' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '娱乐', pinyin: 'yule' }, { name: '外语', pinyin: 'waiyu' },
          { name: '儿童', pinyin: 'ertong' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '商业财经', pinyin: 'shangye' }, { name: '历史', pinyin: 'lishi' },
          { name: '情感生活', pinyin: 'qinggan' }, { name: '相声评书', pinyin: 'xiangsheng' }, { name: '教育培训', pinyin: 'jiaoyu' },
          { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: '电台', pinyin: 'diantai' }, { name: 'IT科技', pinyin: 'keji' }, { name: '汽车', pinyin: 'qiche' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '二次元', pinyin: 'erciyuan' }, { name: '时尚生活', pinyin: 'shishang' }, { name: '人文', pinyin: 'renwen' }
        ]
      },
      // topLeftList: [],
      topRightList: [],
      touzhi: this.top,
      list: [
        { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
        { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
        { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
        { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
        { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
        { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
      ]
    }
  },
  props: [
    'top'
  ],
  mounted () {
    // new BScroll('.ggk', {
    //   scrollbar: {
    //     fade: true,
    //     interactive: false // 1.8.0 新增
    //   }
    // })
  },
  // mounted () {
  //   Axios({
  //     url: '/revision/rank/v2/cluster'
  //     // http://m.ximalaya.com/revision/rank/v2/cluster
  //     // https://www.ximalaya.com/revision/rank/v2/cluster
  //   }).then((res) => {
  //     // console.log(res.data.data.clusterType)
  //     this.topLeftList=res.data.data.clusterType
  //     console.log(this.topLeftList)
  //   })
  // },
  watch: {
    // $route(to , from ){
    //   // console.log('慌了')

    //   this.huantou()
    // }
  },
  methods: {
    // shi () {
    //   console.log(this.top)
    // }
    // 换头时触发
    // huantou(){
    //   if(this.top!=this.touzhi){
    //     // console.log(1)

    //     this.list=

    //     this.touzhi=this.top;

    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.waichenga{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .box{
    position: relative;
    width:calc(100% + 17px);
    height:calc(100% + 17px);
    overflow: auto;
  }
  .paihangLeft{
    width: 100%;
    overflow: hidden;
    position: relative;
    .paihangLeft_p{
      position: relative;
      width: 0.73rem;
      background-color: #eff1f4;
      display: block;
      height: 0.5rem;
      line-height: 0.5rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      font-size: 0.14rem;
      color: #72727b;
      font-family: PingFangSC-Regular;
      position: relative;
      // background-color: rgba(0, 0, 0, .2);
      &::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #aaaaaa;
        transform: scaleY(.5);
        transform-origin: 50% 100%;
      }
  }
  .active{
    background-color: white;
    &::before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0.05rem;
      height: 0.5rem;
      background-color: #f86442;
    }
  }

  }
  .r{
    position: absolute;
    top:0;
    left: 0.73rem;
    width: 3.37rem;
    overflow: hidden;
  }
}

</style>
