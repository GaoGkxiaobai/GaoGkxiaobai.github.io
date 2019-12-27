<template>
    <div id="fenleijihe">
      <router-link id="fanhui" tag="div" to="/category/">返回</router-link>
        <div class="listeninglisttou_waibox">
            <div class="listeninglisttou_box"  v-if="isjiahao==false">
                <ul class="listeninglisttou_ul clear">
                    <router-link :to="'/jihe/'+this.lei+'/quanbu/'" class="listeninglisttou_li" tag="li" activeClass="activetingtou">全部</router-link>
                    <router-link v-for="data in leilist" :key="data.position" :to="'/jihe'+data.link" class="listeninglisttou_li" tag="li" activeClass="activetingtou">{{data.metaDataValue}}</router-link>
                </ul>
                <div class="listeninglisttou_right" @click="dianjijiahao()">
                    ➕
                </div>

            </div>
            <div class="isjiahao_box" v-if="isjiahao==true">
                <p class="isjiahao_left">请选择分类</p>
                <div class="isjiahao_right" @click="dianjichenghao()">
                    ➖
                </div>
                <ul class="isjiahao_ul clear" >
                    <router-link :to="'/jihe/'+this.lei+'/quanbu/'" class="isjiahao_li" tag="li" activeClass="activetingtou">全部</router-link>
                    <router-link v-for="data in leilist" :key="data.position" :to="'/jihe'+data.link" class="isjiahao_li" tag="li" activeClass="activetingtou">{{data.metaDataValue}}</router-link>
                </ul>
            </div>
        </div>
        <div class="jihe_tou">
          <!-- <router-link tag="a" >全部</router-link> -->
          <span @click="zonghe()" :class="(paihang==0)?'active':''">综合排序</span>
          <span @click="zuiduo()" :class="(paihang==2)?'active':''">最多播放</span>
          <span @click="zuijin()" :class="(paihang==1)?'active':''">最近更新</span>
          <i class="jihe_tou_saixuan" @click="saixuan()">{{issaixuan?'收起':'筛选'}}</i>
          <div class="jihe_tou_false" v-if="issaixuan">
            <div class="jihe_tou_false_div" v-for="data in jutilist" :key="data.id"><span :class="shaixuan[data.name]==data.displayName?'active':''" @click="shaixuanactive(data.name,data.displayName)">{{data.displayName}}</span><span  v-for="item in data.metaValues" :key="item.id"  :class="shaixuan[data.name]==item.displayName?'active':''"  @click="shaixuanactive(data.name,item.displayName)">{{item.displayName}}</span></div>
          </div>
        </div>
        <ul class="jihe_list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check='false'>
          <router-link tag="li" :to="'/detail/'+data.id" class="jihe_list_li" v-for="data in list.albumBriefDetailInfos" :key="data.id">
            <!-- <li class="jihe_list_li" v-for="data in list.albumBriefDetailInfos" :key="data.id"> -->
                <img class="jihe_list_li_img" :src="'http://imagev2.xmcdn.com/'+data.albumInfo.cover" :alt="data.albumInfo.title">
                <div class="jihe_list_li_div">
                    <h3 class="jihe_list_li_div_h3">{{data.albumInfo.title}}</h3>
                    <p class="jihe_list_li_div_p">{{data.albumInfo.salePoint}}</p>
                    <p>
                        <i class="iconfont icon-shengyin"></i><span class="jihe_list_li_div_span">{{data.statCountInfo.trackCount | filter}}</span>
                        <i class="iconfont icon-erji"></i><span class="jihe_list_li_div_span">{{data.statCountInfo.playCount | filter}}</span>
                    </p>
                </div>
            <!-- </li> -->
          </router-link>
        </ul>
    </div>
</template>
<script>
import Axios from 'axios'
import { Indicator } from 'mint-ui'
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
      leilist: [],
      jutilist: [],
      list: [],
      isjiahao: false,
      issaixuan: false,
      paihang: 0,
      shaixuan: {},
      index: 1,
      loading: false
    }
  },
  props: ['lei', 'juti'],
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    let aaa = `https://m.ximalaya.com/m-revision/page/category/queryCategoryPage?categoryCode=${this.lei}`
    if (this.juti != 'quanbu') {
      aaa += `&subCategoryCode=${this.juti}`
    }
    aaa += `&page=1&pageSize=30&sort=${this.paihang}`
    Axios({
      url: aaa
      // 全部：https://m.ximalaya.com/m-revision/page/category/queryCategoryPage?categoryCode=youshengshu&pageSize=30&sort=0
    }).then((res) => {
      Indicator.close()
      this.leilist = res.data.data.subCategories
      this.jutilist = res.data.data.categoryMetaDatas
      for (let i = 0; i < this.jutilist.length; i++) {
        this.shaixuan[this.jutilist[i].name] = this.jutilist[i].displayName
      }
      this.list = res.data.data.firstPageCategoryAlbums
      console.log(this.list)
    })
  },
  watch: {
    $route (to, from) {
      this.dianjichenghao()
      this.jiazai()
    }
  },
  methods: {
    zonghe () {
      this.paihang = 0
      this.shaixuanjiazai()
    },
    zuiduo () {
      this.paihang = 2
      this.shaixuanjiazai()
    },
    zuijin () {
      this.paihang = 1
      this.shaixuanjiazai()
    },
    dianjijiahao () {
      this.isjiahao = true
      this.issaixuan = false
    },
    dianjichenghao () {
      this.isjiahao = false
      this.issaixuan = false
    },
    shaixuanjiazai () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.index = 1
      let aaa = `https://m.ximalaya.com/m-revision/page/category/queryCategoryPage?categoryCode=${this.lei}`
      if (this.juti != 'quanbu') {
        aaa += `&subCategoryCode=${this.juti}`
      }
      aaa += `&page=1&pageSize=30&sort=${this.paihang}`
      for (let i = 0, z = 0, x = 0; i < this.jutilist.length; i++) {
        if (this.shaixuan[this.jutilist[i].name] != this.jutilist[i].displayName) {
          if (z == 0) {
            aaa += '&metas='
            z++
          }
          for (let j = 0; j < this.jutilist[i].metaValues.length; j++) {
            if (this.shaixuan[this.jutilist[i].name] == this.jutilist[i].metaValues[j].displayName) {
              if (x != 0) {
                aaa += '-'
              }
              x++
              aaa += `${this.jutilist[i].id}_${this.jutilist[i].metaValues[j].id}`
            }
          }
        }
      }
      Axios({
        url: aaa
      }).then((res) => {
        Indicator.close()
        this.leilist = res.data.data.subCategories
        this.jutilist = res.data.data.categoryMetaDatas
        this.list = res.data.data.firstPageCategoryAlbums
      })
    },
    jiazai () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.index = 1
      let aaa = `https://m.ximalaya.com/m-revision/page/category/queryCategoryPage?categoryCode=${this.lei}`
      if (this.juti != 'quanbu') {
        aaa += `&subCategoryCode=${this.juti}`
      }
      aaa += `&page=1&pageSize=30&sort=${this.paihang}`
      Axios({
        url: aaa
        // 全部：https://m.ximalaya.com/m-revision/page/category/queryCategoryPage?categoryCode=youshengshu&pageSize=30&sort=0
      }).then((res) => {
        Indicator.close()
        this.leilist = res.data.data.subCategories
        this.jutilist = res.data.data.categoryMetaDatas
        for (let i = 0; i < this.jutilist.length; i++) {
          this.shaixuan[this.jutilist[i].name] = this.jutilist[i].displayName
        }
        this.list = res.data.data.firstPageCategoryAlbums
      })
    },
    loadMore () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.loading = true
      this.index += 1
      let aaa = `https://m.ximalaya.com/m-revision/page/category/queryCategoryAlbumsByPage?categoryCode=${this.lei}`
      if (this.juti != 'quanbu') {
        aaa += `&subCategoryCode=${this.juti}`
      }
      console.log(this.index)
      aaa += `&page=${this.index}&pageSize=30&sort=${this.paihang}`
      for (let i = 0, z = 0, x = 0; i < this.jutilist.length; i++) {
        if (this.shaixuan[this.jutilist[i].name] != this.jutilist[i].displayName) {
          if (z == 0) {
            aaa += '&metas='
            z++
          }
          for (let j = 0; j < this.jutilist[i].metaValues.length; j++) {
            if (this.shaixuan[this.jutilist[i].name] == this.jutilist[i].metaValues[j].displayName) {
              if (x != 0) {
                aaa += '-'
              }
              x++
              aaa += `${this.jutilist[i].id}_${this.jutilist[i].metaValues[j].id}`
            }
          }
        }
      }
      // https://m.ximalaya.com/m-revision/page/category/queryCategoryPage?categoryCode=youshengshu&subCategoryCode=wenxue&page=3&pageSize=30&sort=0
      // https://m.ximalaya.com/m-revision/page/category/queryCategoryAlbumsByPage?categoryCode=youshengshu&subCategoryCode=wenxue&page=3&pageSize=30&sort=0
      console.log(aaa)
      Axios({
        url: aaa
      }).then((res) => {
        Indicator.close()
        // this.leilist = res.data.data.subCategories
        // this.jutilist = res.data.data.categoryMetaDatas
        // this.list = res.data.data.firstPageCategoryAlbums
        // this.list.albumBriefDetailInfos = res.data.data.albumBriefDetailInfos
        // console.log(this.list.albumBriefDetailInfos)
        // console.log(res.data.data.albumBriefDetailInfos)
        this.list.albumBriefDetailInfos = [...this.list.albumBriefDetailInfos, ...res.data.data.albumBriefDetailInfos]
        // console.log(this.list.albumBriefDetailInfos)
        this.loading = false
      })
    },
    saixuan () {
      this.issaixuan = !(this.issaixuan)
    },
    shaixuanactive (name, displayName) {
      this.shaixuan[name] = displayName
      this.shaixuanjiazai()
    }
  }

}
</script>
<style lang="scss" scoped>

.listeninglisttou_waibox{
    overflow-y: hidden;
    transition: all .2s;
    border-bottom: 0.01rem solid #e8e8e8;
    position: fixed;
    top: 50px;
    z-index: 200;
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
        height: 3.45rem;
        overflow: auto;
        padding: 0.075rem 5%;
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

#fenleijihe{
    margin-top: 1rem;
    font-size: 0.2rem;
    font-weight: 400;
    background-color: white;
    .jihe_tou{
        padding-left: 0.15rem;
        position: relative;
        span{
            display: inline-block;
            padding: 0.06rem 0.12rem;
            font-size: 0.14rem;
            color: #a3a3ac;
            margin: 0.08rem 0;
        }
        .active{
            color: #f86442;
            border-radius: 0.15rem;
            border: 0.01rem solid rgba(254,121,89,.5);
            margin-right: 0.04rem;
        }
        .jihe_tou_saixuan{
            float: right;
            padding: 0.06rem 0.12rem;
            background: #f3f4f5;
            border-radius: 0.14rem;
            text-align: center;
            color: #a3a3ac;
            font-size: 0.12rem;
            margin: 0.12rem 0.2rem;
        }
        .jihe_tou_false{
            position: absolute;
            width: 100%;
            left: 0;
            background-color: white;
            .jihe_tou_false_div{
                padding-left: 0.15rem;
                overflow-y: auto;
                white-space: nowrap;
                // height: 0.33rem;
            }
        }
    }
    .jihe_list{
        width: 96%;
        height: auto;
        margin-left: 4%;
        .jihe_list_li{
            padding: 0.15rem 0.1rem 0.15rem 0;
            .jihe_list_li_img{
                display: inline-block;
                width: 0.7rem;
                height: 0.7rem;
                margin-right: 0.15rem;
                // float: left;
            }
            .jihe_list_li_div{
                height: 0.72rem;
                // display: inline-block;
                float: right;
                width: 3.0244rem;
                .jihe_list_li_div_h3{
                    font-size: 0.16rem;
                    color: #333;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 100%;
                    text-overflow: ellipsis;
                }
                .jihe_list_li_div_p{
                    margin: 0.05rem 0 0.07rem;
                    font-size: 0.13rem;
                    line-height: 0.13rem;
                    height: 0.13rem;
                    overflow: hidden;
                    white-space: nowrap;
                    color: #999;
                    width: 100%;
                    text-overflow: ellipsis;
                }
                .jihe_list_li_div_span{
                    margin-right: 0.1rem;
                    line-height: 0.2rem;
                    color: #999;
                    font-size: 0.12rem;
                    padding: 0 0.1rem;
                }
            }
        }
    }
    #fanhui{
      // height: 0.5rem;
      background-color: white;
      font-size: 0.18rem;
      width: 0.7rem;
      position: fixed;
      top: 0.15rem;
      left: 0.15rem;
      z-index: 500;
      text-align: center;
    }
}

</style>
