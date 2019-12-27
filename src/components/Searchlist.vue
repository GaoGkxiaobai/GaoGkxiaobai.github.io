<template>
  <div class="con">
    <div v-for="data in $store.state.searchlistData.albumResultList" :key="data.id" class="listdiv" @click="click(data.id)">
      <img :src="data.imgPath" alt />
      <div>
        <h3>{{data.keyword}}</h3>
        <p>
          <span>{{data.category}}</span>
          <span>
            <i class="iconfont icon-shengyin"></i>
            {{data.play |listenfilter}}
          </span>
          <span>
            <i class="iconfont icon-erji"></i>
            {{data.tracks}}集
          </span>
        </p>
      </div>
    </div>
    <ul>
      <li
        v-for="data in  $store.state.searchlistData.queryResultList"
        :key="data.id"
      @click="listclick(data.keyword)">{{data.keyword}}</li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.filter('listenfilter', list => {
  function transform (value) {
    let newValue = ['', '', '']
    let fr = 1000
    const ad = 1
    let num = 3
    const fm = 1
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
}) // 数字格式
export default {
  mounted () {
    this.$store.dispatch('getsearch', this.mytxt)
  },
  methods: {
    click (id) {
      this.$router.push({ name: 'detail', params: { myid: id } })
    },
    listclick (data) {
      this.$store.state.resultpath = data
      this.$router.push(`/result/all/${data}`)
    }
  },
  props: ['mytxt']
}
</script>
<style lang="scss" scoped>
.con {
  position: absolute;
  z-index: 500;
  background: white;
  width: 100%;
  height: 100%;
  top: 0.5rem;
}
.listdiv {
  width: 100%;
  overflow: hidden;
  img {
    width: 0.4rem;
    height: 0.4rem;
    float: left;
    margin-right: 0.1rem;
  }
  div {
    float: left;
    h3 {
      padding: 0.05rem;
      height: 0.14rem;
      font: 0.14rem/0.14rem "宋体";
      color: #40404c;
    }
    p {
        height: 0.16rem;
        margin-top: 0.15rem;
        position: relative;
      span:nth-child(1) {
        font: 0.12rem/0.12rem "宋体";
        color: #a3a3ac;
        margin-right: 0.1rem;
        position: absolute;
        top:0;
        left: 0.1rem;
        border: 0.01rem solid #ccc;
      }
      span:nth-child(2) {
        font: 0.12rem/0.12rem "宋体";
        color: #a3a3ac;
        margin-right: 0.1rem;
        position: absolute;
        top:0;
        left: 0.7rem;
      }
      span:nth-child(3) {
        font: 0.12rem/0.12rem "宋体";
        color: #a3a3ac;
        margin-right: 0.1rem;
        position: absolute;
        top:0;
        left: 1.5rem;
      }
    }
  }
}
ul {
  width: 100%;
  li {
    height: 0.4rem;
    width: 100%;
    font: 0.14rem/0.4rem "宋体";
    color: #40404c;
    border-bottom: 0.01rem solid rgba(231, 230, 230, 0.5);
  }
}
</style>
