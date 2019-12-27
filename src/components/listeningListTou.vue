<template>
    <div class="listeninglisttou_waibox">
        <div class="listeninglisttou_box" v-if="isjiahao==false" :class="(ishuadong)?'fixed':'xianshi'">
            <ul class="listeninglisttou_ul clear"   :class="(ishuadong)?'fixed':''" >
                <router-link v-for="data in this.list" :key="data.pinyin" :to="'/ting/'+data.pinyin" class="listeninglisttou_li" tag="li" activeClass="activetingtou">{{data.name}}</router-link>
            </ul>
            <div class="listeninglisttou_right" :class="(ishuadong)?'fixed':''" @click="dianjijiahao()">
                ➕
            </div>

        </div>
        <div class="isjiahao_box" v-if="isjiahao==true">
            <p class="isjiahao_left">请选择分类</p>
            <div class="isjiahao_right" @click="dianjichenghao()">
                ➖
            </div>
            <ul class="isjiahao_ul clear" >
                <router-link v-for="data in this.list" :key="data.pinyin" :to="'/ting/'+data.pinyin" class="isjiahao_li" tag="li" activeClass="activetingtou">{{data.name}}</router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        { name: '有声书', pinyin: 'youshengshu' }, { name: '音乐', pinyin: 'yinyue' }, { name: '相声评书', pinyin: 'xiangsheng' }, { name: '热门', pinyin: 'remen' },
        { name: '儿童', pinyin: 'ertong' }, { name: '娱乐', pinyin: 'yule' }, { name: '情感生活', pinyin: 'qinggan' }, { name: '外语', pinyin: 'waiyu' }, { name: '人文', pinyin: 'renwen' },
        { name: '商业财经', pinyin: 'shangye' }, { name: '历史', pinyin: 'lishi' }, { name: '个人成长', pinyin: 'jiaoyu' }, { name: 'IT科技', pinyin: 'keji' }, { name: '头条', pinyin: 'toutiao' },
        { name: '影视', pinyin: 'yingshi' }, { name: '戏曲', pinyin: 'xiqu' }, { name: '广播剧', pinyin: 'guangbojv' }, { name: '健康养生', pinyin: 'jiankang' },
        { name: '脱口秀', pinyin: 'tuokouxiu' }, { name: '旅游', pinyin: 'lvyou' },
        { name: '时尚生活', pinyin: 'shishang' }, { name: '汽车', pinyin: 'qiche' }, { name: '二次元', pinyin: 'erciyuan' }, { name: '电台', pinyin: 'zhexue' }
      ],
      ishuadong: true,
      oldscrollTop: 0,
      isjiahao: false
    }
  },
  mounted () {
    window.onscroll = this.xiala
  },
  beforeDestroy () {
    window.onscroll = null
  },
  watch: {
    $route (to, from) {
      this.dianjichenghao()
    }
  },
  methods: {
    dianjijiahao () {
      this.isjiahao = true
    },
    dianjichenghao () {
      this.isjiahao = false
    },
    xiala () {
      // if ((document.documentElement.scrollTop + 10 || document.body.scrollTop + 10) >=
      //     this.$store.state.topH
      // ) {
      //     // 判断滚动距离
      //     // document.documentElement.scrollTop  页面滚动距离
      //     // document.body.scrollTop  页面滚动距离兼容写法
      //     this.isflex = true
      //     this.he = document.documentElement.scrollTop + 10 || document.body.scrollTop + 10
      // } else {
      //     this.isflex = false
      // }
      if ((document.documentElement.scrollTop || document.body.scrollTop) < this.oldscrollTop) {
        this.ishuadong = true
      }
      if ((document.documentElement.scrollTop || document.body.scrollTop) > this.oldscrollTop) {
        this.ishuadong = false
      }
      this.oldscrollTop = (document.documentElement.scrollTop || document.body.scrollTop)
    }
  }
}
</script>
<style lang="scss" scoped>
.listeninglisttou_waibox{
    overflow-y: hidden;
    transition: all .2s;
    border-bottom: 0.01rem solid #e8e8e8;
    // width: 100%;
    .fixed{
        position: fixed;
        top: 0.5rem;
        z-index: 100;
        background-color: white;
        transition: all .2s;
    }
    .xianshi{
        height: 0;
        transform: translateY(-100%);
        transition: all .2s;
    }
    .listeninglisttou_box{

    // width: 100%;
    height: 0.45rem;
    font-size: 0.14rem;
    // overflow: hidden;
    line-height: 0.45rem;
    position: relative;
    border-bottom: 0.01rem solid #a3a3ac;
    .listeninglisttou_right{
        width: 0.44rem;
        height: 0.43rem;
        float: right;
        // position: absolute;
        right: 0;
        // display: inline-block;
        border-left: 0.01rem solid #efefef;
        line-height: 0.43rem;
        text-align: center;
        background-color: white;
    }
    .listeninglisttou_ul{

        height: 0.45rem;
        // padding: 0;
        background-color: white;
        line-height: 0.45rem;
        display: inline-block;
        overflow-y: hidden;
        overflow-x: auto;
        width: 3.69rem;
        white-space: nowrap;
        .listeninglisttou_li{
            font-size: 0.14rem;
            color: #a3a3ac;
            height: 0.45rem;
            line-height: 0.45rem;
            // float: left;
            display: inline-block;
            position: relative;
            top: 0;
            padding: 0 0.15rem;
            background-color: white;
        }
        .activetingtou{
            font-size: 0.18rem;
            line-height: 0.45rem;
            position: relative;
            color: #40404c;
            background-color: white;
            &::before{
                content: '';
                display: inline-block;
                position: absolute;
                width: 0.3rem;
                left: 50%;
                transform: translateX(-50%);
                // height: 0.1rem;
                bottom: 0rem;
                text-align: center;
                background-color: white;
                border-bottom: 0.05rem solid #f06742;
            }
        }
    }
}

.isjiahao_box{
    background-color: white;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    height: 0.45rem;
    font-size: 0.14rem;
    line-height: 0.45rem;
    z-index: 100;
    border-bottom: 0.01rem solid #a3a3ac;
    .isjiahao_left{
        font-size: 0.14rem;
        color: #a3a3ac;
        text-align: center;
        line-height: 0.45rem;
        display: inline-block;
        padding-left: 0.15rem;
        position: relative;

    }
    .isjiahao_right{
        width: 0.44rem;
        height: 0.43rem;
        float: right;
        border-left: 0.01rem solid #efefef;
        line-height: 0.43rem;
        text-align: center;
        background-color: white;
    }
    .isjiahao_ul{
        border-top: 0.01rem solid #a3a3ac;
        position: absolute;
        width: 100%;
        background-color: white;
        overflow: auto;
        padding: 0.075rem 5%;
        height: 3.45rem;
        .isjiahao_li{
            background: #f3f4f5;
            color: #40404c;
            font-size: 0.16rem;
            height: 0.32rem;
            line-height: 0.32rem;
            display: inline-block;
            margin: 0.075rem 2%;
            text-align: center;
            width: 26%;
        }
    }

}

}

</style>
