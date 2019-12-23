<template>
<div class="box">
  <div class="paihangLeft">
    <!-- <router-link to="all" class="paihangLeft_p" tag="p" activeClass="active">热门</router-link>
    <router-link to="youshengshu" class="paihangLeft_p" tag="p" activeClass="active">有声书</router-link>
    <router-link to="xiangsheng" class="paihangLeft_p" tag="p" activeClass="active">相声评书</router-link>
    <router-link to="ertong" class="paihangLeft_p" tag="p" activeClass="active">儿童</router-link>
    <router-link to="renwen" class="paihangLeft_p" tag="p" activeClass="active">人文</router-link>
    <router-link to="lishi" class="paihangLeft_p" tag="p" activeClass="active">历史</router-link>
    <router-link to="yinyue" class="paihangLeft_p" tag="p" activeClass="active">音乐</router-link>
    <router-link to="jiaoyu" class="paihangLeft_p" tag="p" activeClass="active">教育培训</router-link>
    <router-link to="waiyu" class="paihangLeft_p" tag="p" activeClass="active">外语</router-link>
    <router-link to="yule" class="paihangLeft_p" tag="p" activeClass="active">娱乐</router-link>
    <router-link to="qinggan" class="paihangLeft_p" tag="p" activeClass="active">情感生活</router-link>
    <router-link to="shancye" class="paihangLeft_p" tag="p" activeClass="active">商业财经</router-link>
    <router-link to="toutiao" class="paihangLeft_p" tag="p" activeClass="active">头条</router-link>
    <router-link to="jiankang" class="paihangLeft_p" tag="p" activeClass="active">健康养生</router-link>
    <router-link to="guangbo" class="paihangLeft_p" tag="p" activeClass="active">广播剧</router-link>
    <router-link to="xiqu" class="paihangLeft_p" tag="p" activeClass="active">戏曲</router-link>
    <router-link to="keji" class="paihangLeft_p" tag="p" activeClass="active">IT科技</router-link>
    <router-link to="lvyou" class="paihangLeft_p" tag="p" activeClass="active">旅游</router-link>
    <router-link to="yingshi" class="paihangLeft_p" tag="p" activeClass="active">影视</router-link>
    <router-link to="shishang" class="paihangLeft_p" tag="p" activeClass="active">时尚生活</router-link>
    <router-link to="qiche" class="paihangLeft_p" tag="p" activeClass="active">汽车</router-link>
    <router-link to="erciyuan" class="paihangLeft_p" tag="p" activeClass="active">二次元</router-link>
    <router-link to="diantai" class="paihangLeft_p" tag="p" activeClass="active">电台</router-link> -->

    <router-link v-for="data in topLeftList" :key="data.pinyin" :to="'/top/'+top+'/'+data.pinyin" class="paihangLeft_p" tag="p" activeClass="active" >{{data.name}}</router-link>
    <!-- <p>{{shi()}}</p> -->

  </div>
  <router-view class="r"></router-view>
</div>

</template>
<script>
export default {
  data () {
    return {
      topLeftList: [
        { name: '热门', pinyin: 'all' }, { name: '有声书', pinyin: 'youshengshu' }, { name: '相声评书', pinyin: 'xiangsheng' },
        { name: '儿童', pinyin: 'ertong' }, { name: '人文', pinyin: 'renwen' }, { name: '历史', pinyin: 'lishi' }, { name: '音乐', pinyin: 'yinyue' },
        { name: '教育培训', pinyin: 'jiaoyu' }, { name: '外语', pinyin: 'waiyu' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' },
        { name: '商业财经', pinyin: 'shangye' }, { name: '头条', pinyin: 'toutiao' }, { name: '健康养生', pinyin: 'jiankang' }, { name: '广播剧', pinyin: 'guangbo' },
        { name: '戏曲', pinyin: 'xiqu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '旅游', pinyin: 'lvyou' }, { name: '影视', pinyin: 'yingshi' },
        { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'diantai' }
      ],
      topRightList: []
    }
  },
  props: [
    'top'
  ],
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
