<template>
    <div class="listeninglisttou_waibox">
        <div class="listeninglisttou_box">
            <ul class="listeninglisttou_ul clear">
                <router-link v-for="data in this.list" :key="data.pinyin" :to="'/ting/'+data.pinyin" class="listeninglisttou_li" tag="li" activeClass="activetingtou">{{data.name}}</router-link>
            </ul>
            <div class="listeninglisttou_right">
                ➕
            </div>
        </div>
        <router-view></router-view>
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
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.listeninglisttou_waibox{
    overflow-y: hidden;
    // width: 100%;
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
        // float: right;
        position: absolute;
        right: 0;
        display: inline-block;
        border-left: 0.01rem solid #efefef;
        line-height: 0.43rem;
        text-align: center;
    }
    .listeninglisttou_ul{

        height: 0.45rem;
        // padding: 0;
        line-height: 0.45rem;
        display: inline-block;
        overflow-y: hidden;
        overflow-x: auto;
        width: 84.6%;
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
        }
        .activetingtou{
            font-size: 0.18rem;
            line-height: 0.45rem;
            position: relative;
            color: #40404c;
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
                border-bottom: 0.05rem solid #f06742;
            }
        }
    }
}
}

</style>
