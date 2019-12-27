<template>
  <div class="resultall" v-if="$store.state.resultalbumData">
    <ul class="albumnav">
      <li @click="categoryclick" :class=" b ?'red':''">{{feilei}}</li>
      <li @click="orderclick" :class=" b ?'red':''">{{paixu}}</li>
      <li @click="payclick" :class=" b ?'red':''">{{fufei}}</li>
    </ul>
    <div class="zhezhao" v-if="zhezhao" @click="zhe()"></div>
    <div class="nav" v-if="isorder">
      <li
        ref="div"
        v-for="data in order"
        :key="data.path"
        @click="oclick(data.path, $event)"
      >{{data.name}}</li>
    </div>
    <div class="nav" v-if="ispay">
      <li
        ref="div"
        v-for="data in pay"
        :key="data.path"
        @click="pclick(data.path, $event)"
      >{{data.name}}</li>
    </div>
    <div class="category" v-if="iscategory">
      <li
        v-for="data in category"
        :key="data.categoryId"
        @click="cclick('&category_id='+data.categoryId, $event)"
      >{{data.categoryName}}</li>
    </div>
    <ul class="zhuanjiul">
      <li
        v-for="data in $store.state.resultalbumData.albumViews.albums"
        :key="data.albumInfo.id"
        @click="resutltclick(data.albumInfo.id)"
      >
        <img :src="data.albumInfo.cover_path" alt />
        <div>
          <h3>{{data.albumInfo.title}}</h3>
          <p>{{data.albumInfo.recommend_reason || (data.albumInfo.intro).trim()}}</p>
          <p>
            <span>{{data.albumInfo.nickname}}</span>
            <span>
              <i class="iconfont icon-shengyin"></i>
              {{data.albumInfo.tracks}}
            </span>
            <span>
              <i class="iconfont icon-erji"></i>
              {{data.albumInfo.play | listenfilter}}
            </span>
          </p>
        </div>
      </li>
    </ul>
    <bottom></bottom>
  </div>
</template>

<script>
import bottom from '@/components/bottom'
import axios from 'axios'
import { GET_RESULTALBUM_DATA } from '@/store/type'

export default {
  components: {
    bottom
  },
  data () {
    return {
      order: [
        { name: '相关度', path: '&condition=relation' },
        { name: '最多播放', path: '&condition=play' },
        { name: '最新上传', path: '&condition=recent' }
      ],
      //   condition=relation
      pay: [
        { name: '全部', path: '&paidFilter=false' },
        { name: '免费', path: '&paidFilter=true&fq=is_paid%3Afalse%2C' },
        { name: '付费', path: '&paidFilter=true&fq=is_paid%3Atrue%2C' }
      ],
      //   paidFilter=false
      category: null,
      iscategory: false,
      ispay: false,
      isorder: false,
      zhezhao: false,
      list: [],
      feilei: '分类',
      paixu: '排序方式',
      fufei: '是否付费',
      b: false
    }
  },
  methods: {
    resutltclick (id) {
      this.$router.push(`/detail/${id}`)
    },
    categoryclick () {
      this.ispay = false
      this.isorder = false
      this.iscategory = true
      this.zhezhao = true
    },
    orderclick () {
      this.ispay = false
      this.isorder = true
      this.iscategory = false
      this.zhezhao = true
    },
    payclick () {
      this.iscategory = false
      this.ispay = true
      this.isorder = false
      this.zhezhao = true
    },
    oclick (path, evt) {
      this.paixu = evt.target.innerHTML
      var c = evt.target.closest('div').children
      evt.target.closest('div').firstElementChild.style.color = '#72727b'
      this.b = true
      for (var item of c) {
        item.removeAttribute('class')
      }
      evt.target.setAttribute('class', 'red')
      this.list[2] = path
      axios({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${
          this.$store.state.resultpath
        }&core=album&page=1&rows=10${this.list.join('')}`
      }).then(res => {
        this.$store.commit(GET_RESULTALBUM_DATA, res.data.data)
      })
    },
    pclick (path, evt) {
      this.fufei = evt.target.innerHTML
      var c = evt.target.closest('div').children
      evt.target.closest('div').firstElementChild.style.color = '#72727b'
      this.b = true
      for (var item of c) {
        item.removeAttribute('class')
      }
      evt.target.setAttribute('class', 'red')
      this.list[1] = path
      axios({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${
          this.$store.state.resultpath
        }&core=album&page=1&rows=10${this.list.join('')}`
      }).then(res => {
        this.$store.commit(GET_RESULTALBUM_DATA, res.data.data)
      })
    },
    zhe () {
      this.zhezhao = false
      this.ispay = false
      this.isorder = false
      this.iscategory = false
    },
    cclick (path, evt) {
      this.feilei = evt.target.innerHTML
      var c = evt.target.closest('div').children
      evt.target.closest('div').firstElementChild.style.color = '#666666'
      evt.target.closest('div').firstElementChild.style.background = '#f3f4f5'
      this.b = true
      for (var item of c) {
        item.removeAttribute('class')
      }
      evt.target.setAttribute('class', 'active')
      this.list[0] = path
      axios({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${
          this.$store.state.resultpath
        }&core=album&page=1&rows=10${this.list.join('')}`
      }).then(res => {
        this.$store.commit(GET_RESULTALBUM_DATA, res.data.data)
      })
    }
  },
  created () {
    axios
      .get(
        `https://m.ximalaya.com/m-revision/page/search/allCategory?kw=${this.$route.params.album}`
      )
      .then(res => {
        this.category = res.data.data.categories
      })
  },

  mounted () {
    this.$store.state.resultpath = this.$route.params.album
    this.$store.dispatch('getresultalbum', this.$route.params.album)
  }
}
</script>
<style lang="scss" scoped>
.resultall {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.albumnav {
  width: 100%;
  overflow: hidden;
  height: 0.4rem;
  position: relative;
  z-index: 200;
  background: white;
  border-bottom: 0.01rem solid rgba(197, 196, 196, 0.5);
  li {
    float: left;
    width: 1.18rem;
    padding: 0 0.1rem;
    font: 0.14rem/0.4rem "宋体";
    color: #72727b;
    text-align: center;
  }
}
.nav {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;
  background: white;
  overflow: hidden;
  border-radius: 0 0 0.2rem 0.2rem;
  position: relative;
  z-index: 200;
  li {
    width: 100%;
    height: 0.4rem;
    font: 0.14rem/0.4rem "宋体";
    color: #72727b;
    text-align: center;
  }
  li:first-child {
    color: #fe7959;
  }
}
.category {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem 0.2rem 0.15rem;
  background: white;
  border-radius: 0 0 0.2rem 0.2rem;
  position: relative;
  overflow: hidden;
  z-index: 200;
  li {
    float: left;
    font: 0.14rem/0.14rem "宋体";
    color: #666666;
    padding: 0.05rem 0.15rem;
    margin: 0.15rem 0.15rem 0 0;
    background: #f3f4f5;
  }
  li:first-child {
    color: #fe7959;
    background: rgba(254, 121, 89, 0.1);
  }
}
.zhuanjiul {
  padding-left: 0.15rem;
  padding-top: 0.2rem;
  h3 {
    font: 0.18rem/0.1rem "宋体";
    color: #40404c;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      float: right;
      margin-right: 0.2rem;
      font: 0.14rem/0.14rem "宋体";
      color: #ccc;
    }
  }
  li {
    width: 100%;
    padding: 0.15rem 0 0.15rem 0;
    overflow: hidden;
    border-bottom: 0.01rem solid #ccc;
    img {
      width: 0.7rem;
      height: 0.7rem;
      margin-right: 0.15rem;
      float: left;
    }
    div {
      float: left;
      width: 3.04rem;
      h3 {
        font: 0.16rem/0.16rem "宋体";
        color: #333;
        margin-bottom: 0.1rem;
      }
      p {
        width: 3rem;
        font: 0.13rem/0.13rem "宋体";
        color: #999;
        margin: 0.05rem 0 0.07rem 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          margin: 0 0.1rem 0 0;
        }
      }
    }
  }
}
.zhezhao {
  height: 100%;
  left: 0;
  top: 0.4rem;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  position: absolute;
  background: rgba(197, 196, 196, 0.3);
  z-index: 10;
}
li.active {
  color: #fe7959;
  background: rgba(254, 121, 89, 0.1);
}
li.red{
  color: red;
}

</style>
