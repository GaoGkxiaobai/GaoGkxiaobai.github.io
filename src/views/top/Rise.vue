<template>
  <div class="paihangLeft">
    <router-link v-for="data in topLeftList" :key="data.pinyin" :to="data.pinyin" class="paihangLeft_p" tag="p" activeClass="active">{{data.name}}</router-link>
    <p>{{shi()}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      topLeftList: [
        { name: '1热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
        { name: '1儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
        { name: '1教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
        { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
        { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
        { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
      ],
      topRightList: []
    }
  },
  props: [
    'tou', 'left'
  ],
  methods: {
    shi () {
      console.log(this.tou, this.left)
    }
  }
}
</script>

<style lang="scss" scoped>
.paihangLeft{
  width: 72.58px;
  overflow-y: hidden;
  position: relative;
  .paihangLeft_p{
    position: relative;
    background: #fff;
    display: block;
    height: 50px;
    line-height: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
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
    width: 5px;
    height: 50px;
    background-color: #f86442;
  }
}
}

</style>
