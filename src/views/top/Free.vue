<template>
<div class="box">
  <div class="paihangLeft">
    <router-link v-for="data in topLeftList.freeList"  :key="data.pinyin" :to="'/top/'+top+'/'+data.pinyin"  class="paihangLeft_p" tag="p" activeClass="active" >{{data.name}}</router-link>
    <!-- <p>{{shi()}}</p> -->

  </div>
  <router-view class="r"></router-view>
</div>

</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      topLeftList: {
        freeList: [
          { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        riseList: [
          {
    "rankClusterCategories": [
        {
            "rankClusterTitle": "总榜",
            "categoryCode": "all0",
        },
        {
            "rankClusterTitle": "新品",
            "categoryCode": "all1",
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 158,
            "rankClusterTitle": "有声书",
            "categoryId": 3,
            "categoryCode": "youshengshu",
            "position": 3,
            "rankId": 298,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 161,
            "rankClusterTitle": "相声评书",
            "categoryId": 12,
            "categoryCode": "xiangsheng",
            "position": 4,
            "rankId": 300,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 159,
            "rankClusterTitle": "儿童",
            "categoryId": 6,
            "categoryCode": "ertong",
            "position": 5,
            "rankId": 299,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 180,
            "rankClusterTitle": "人文",
            "categoryId": 39,
            "categoryCode": "renwen",
            "position": 6,
            "rankId": 319,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 168,
            "rankClusterTitle": "历史",
            "categoryId": 9,
            "categoryCode": "lishi",
            "position": 7,
            "rankId": 307,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 163,
            "rankClusterTitle": "音乐",
            "categoryId": 2,
            "categoryCode": "yinyue",
            "position": 8,
            "rankId": 302,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 170,
            "rankClusterTitle": "教育培训",
            "categoryId": 13,
            "categoryCode": "jiaoyu",
            "position": 9,
            "rankId": 309,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 165,
            "rankClusterTitle": "外语",
            "categoryId": 5,
            "categoryCode": "waiyu",
            "position": 10,
            "rankId": 304,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 164,
            "rankClusterTitle": "娱乐",
            "categoryId": 4,
            "categoryCode": "yule",
            "position": 11,
            "rankId": 303,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 169,
            "rankClusterTitle": "情感生活",
            "categoryId": 10,
            "categoryCode": "qinggan",
            "position": 12,
            "rankId": 308,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 167,
            "rankClusterTitle": "商业财经",
            "categoryId": 8,
            "categoryCode": "shangye",
            "position": 13,
            "rankId": 306,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 162,
            "rankClusterTitle": "头条",
            "categoryId": 1,
            "categoryCode": "toutiao",
            "position": 14,
            "rankId": 301,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 166,
            "rankClusterTitle": "健康养生",
            "categoryId": 7,
            "categoryCode": "jiankang",
            "position": 15,
            "rankId": 305,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 171,
            "rankClusterTitle": "广播剧",
            "categoryId": 15,
            "categoryCode": "guangbojv",
            "position": 16,
            "rankId": 310,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 172,
            "rankClusterTitle": "戏曲",
            "categoryId": 16,
            "categoryCode": "xiqu",
            "position": 17,
            "rankId": 311,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 174,
            "rankClusterTitle": "IT科技",
            "categoryId": 18,
            "categoryCode": "keji",
            "position": 18,
            "rankId": 313,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 178,
            "rankClusterTitle": "旅游",
            "categoryId": 22,
            "categoryCode": "lvyou",
            "position": 19,
            "rankId": 315,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 177,
            "rankClusterTitle": "影视",
            "categoryId": 23,
            "categoryCode": "yingshi",
            "position": 20,
            "rankId": 316,
            "rankType": 2
        },
        {
            "rankClusterTypeId": 5,
            "rankClusterId": 179,
            "rankClusterTitle": "时尚生活",
            "categoryId": 31,
            "categoryCode": "shishang",
            "position": 21,
            "rankId": 318,
            "rankType": 2
        },
        {
            "rankClusterTitle": "汽车",
            "categoryCode": "qiche",
        },
        {
            "rankClusterTitle": "二次元",
            "categoryCode": "erciyuan",
        }
    ]
}
          { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        paidList: [
          { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        subscribeList: [
          { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
          { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
          { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
          { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
        ],
        reputationList: [
          { name: '热门', pinyin: 'all' }, { name: '头条', pinyin: 'toutiao' }, { name: '音乐', pinyin: 'yinyue' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '娱乐', pinyin: 'yule' }, { name: '外语', pinyin: 'waiyu' },
          { name: '儿童', pinyin: 'ertong' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '商业财经', pinyin: 'shangye' }, { name: '历史', pinyin: 'lishi' },
          { name: '情感生活', pinyin: 'qinggan' }, { name: '相声评书', pinyin: 'xiangsheng' },{ name: '教育培训', pinyin: 'jiaoyu' },
          { name: '广播剧', pinyin: 'guangbo' },
          { name: '戏曲', pinyin: 'xiqu' }, { name: '电台', pinyin: 'diantai' }, { name: 'IT科技', pinyin: 'keji' }, { name: '汽车', pinyin: 'qiche' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
          { name: '二次元', pinyin: 'erciyuan' }, { name: '时尚生活', pinyin: 'shishang' }, { name: '人文', pinyin: 'renwen' }
        ],
      },
      // topLeftList: [],
      topRightList: []
    }
  },
  props: [
    'top'
  ],
  mounted () {
    Axios({
      url: '/revision/rank/v2/cluster'
      // http://m.ximalaya.com/revision/rank/v2/cluster
      // https://www.ximalaya.com/revision/rank/v2/cluster
    }).then((res) => {
      // console.log(res.data.data.clusterType)
      this.topLeftList=res.data.data.clusterType
      console.log(this.topLeftList)
    })
  },
  methods: {
    shi () {
      console.log(this.top)
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  position: relative;
}
.paihangLeft{
  width: 100%;
  overflow: hidden;
  position: relative;
  .paihangLeft_p{
    position: relative;
    width: 0.73rem;
    background: #fff;
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
    background-color: rgba(0, 0, 0, .2);
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

</style>
