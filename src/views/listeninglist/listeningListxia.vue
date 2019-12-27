<template>
    <div class="listenlinglist">
        <!-- {{this.tou}} -->
        <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        >
          <li v-for="data in tingdanlist" :key="data.id" class="listenlinglistli" >
            <img v-lazy="'http:'+data.coverPathSmall" :alt="data.intro">
            <div class="listenlinglistliright">
                <h3>{{data.title}}</h3>
                <p>
                  <i class="iconfont icon-shengyin" v-if="data.contentType==2"></i>
                  <i class="iconfont icon-bofang" v-else-if="data.contentType==1"></i>
                  <span class="spanjiange">{{data.dataCount | filter}}</span>
                  <span>{{data.releaseAt | Time}}</span>
                </p>
            </div>
          </li>
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

// 年月日
Vue.filter('Time', function getTime (nS) {
  var date = new Date(parseInt(nS) * 1000)
  var year = date.getFullYear()
  var mon = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + mon + '-' + day + '更新'
})

export default {
  data () {
    return {
      tingdanlist: [],
      index: 1
    }
  },
  props: ['tou'],
  mounted () {
    // Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    //   });
    this.index = 1
    Axios({
      url: `/revision/subject/categorySubjectList/${this.tou}?pageNum=1&pageSize=20`
    }).then((res) => {
      this.tingdanlist = res.data.data.subjects
    })
  },
  watch: {
    $route (to, from) {
      this.huantou()
    }
  },
  methods: {
    // 换头时触发
    huantou () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.index = 1
      Axios({
        url: `/revision/subject/categorySubjectList/${this.tou}?pageNum=1&pageSize=20`
      }).then((res) => {
        Indicator.close()
        this.tingdanlist = res.data.data.subjects
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    },
    loadMore () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.loading = true
      this.index++
      Axios({
        url: `/revision/subject/categorySubjectList/${this.tou}?pageNum=${this.index}&pageSize=20`
      }).then((res) => {
        Indicator.close()
        this.tingdanlist = [...this.tingdanlist, ...res.data.data.subjects]
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
image[lazy=loading] {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0.15rem 0;
  float: left;
}
    .listenlinglist{
        font-size: 0.2rem;
        // overflow: hidden;
        .listenlinglistli{
          img{
            // display: inline-block;
            width: 0.7rem;
            height: 0.7rem;
            margin: 0.15rem 0;
            float: left;
          }
          width: 96%;
          margin-left: 4%;
          height: 1rem;
          position: relative;
          // position: fixed;
          &::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: 0.01rem solid #e5e3e3;
          }
          .listenlinglistliright{
            margin: 0.15rem 0 0rem 0.1rem;
            float: left;
            width: 73.889%;
            h3{
              height: 0.44rem;
              width: 100%;
              font-size: 0.16rem;
              color: #40404c;
              line-height: 0.22rem;
              display: -webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:2;
              overflow: hidden;
            }
            p{
              color: #a3a3ac;
              margin-top: 0.1rem;
              font-size: 0.12rem;
              line-height: 0.17rem;
              .spanjiange{
                margin-left: 0.045rem;
                margin-right: 0.14rem;
              }
            }
          }
        }
    }
</style>
