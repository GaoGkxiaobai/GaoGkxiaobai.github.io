<template>
  <div class="catediv">
      <ul
        class="menu _uWi"
      >
        <a :href="'#'+data.category.categoryId" v-for="data in datalist" :key="data.category.categoryId" class="item _uWi"  @click="click()">{{data.category.displayName}}</a>
      </ul>
      <ul v-for="data in datalist" :key="data.category.categoryId" class="rul" :id="data.category.categoryId">
        <h3><p>{{data.category.displayName}}</p>/共{{data.albumCount}}张专辑 <span>></span></h3>
        <li v-for="item in data.category.subCategories" :key="item.link" @click="categoryclick(item.link)">
           {{item.displayValue}}
        </li>
      </ul>

  </div>
</template>
<script>
import Axios from 'axios'
import { Picker } from 'mint-ui'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      datalist: []
    }
  },
  beforeMount () {
    Axios({
      url: `https://m.ximalaya.com/m-revision/page/category/queryCategories`
    }).then(res => {
      console.log(res.data.data)
      this.datalist = res.data.data
    })
  },
  mounted () {
    //  window.onscroll = this.myscroll
  },
  methods: {
    click (evt) {
      // document.querySelector('a').removeAttribute('class','');
      // console.log(evt)
      // evt.target.setAttribute('class','active')
    },
    categoryclick (id) {
      this.$router.push(`/jihe/${id}`)
    }
    // myscroll(){
    //   // console.log(this.$refs.scrolla[0])
    //   // console.log(document.documentElement.scrollTop)
    //   var list=[];
    //   var data=this.$refs.scroll;
    //   for(var i=0;i<data.length;i++){
    //     list.push(data[i].offsetTop)
    //   }
    // console.log(list.indexOf(document.documentElement.scrollTop))
    // for(var j=0;j<list.length;j++){
    //    if(document.documentElement.scrollTop>=list[j]){
    //      console.log(1111)
    //     document.querySelector(this.$refs.scrolla[j]).setAttribute('class','active')
    //    }
    // }
    // }
  }
}
</script>

<style lang="scss" scoped>
.catediv{
  overflow-y: auto;
  overflow-x: hidden;
}
.menu._uWi {
  width:0.9rem;
  margin-top: 0.6rem;
  float: left;
  box-sizing: border-box;
}
.menu .item._uWi {
  display: block;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.14rem;
  color: #72727b;
  position: re;
  border-bottom: 0.01rem solid #e8e8ee;
}
.rul{
  box-sizing: border-box;
  width: 3.2rem;
  overflow: hidden;
  // position: relative;
  float: right;
  margin-top: 0.6rem;
  // top: 0.6rem;
  // left: 1rem;
  padding: 0 0 0.075rem  0.075rem;
  h3{
    width: 90%;
    height: 0.5rem;
    font: 0.14rem/0.5rem "宋体";
    color: #fe7959;
    border-bottom: 0.01rem solid #e8e8ee;
    p{
       font: 0.16rem/0.5rem "宋体";
       display: inline-block;
    }
    span{
      float: right;
    }
  }
  li{
    float: left;
    font: 0.14rem/0.14rem "宋体";
    padding: 0.075rem;
    color: #7e8c8d;
  }
}
ul{
  a:nth-child(1){
  border-left:0.05rem solid #f86442;
  }
}
.active{
   border-left:0.05rem solid #f86442;
}
</style>
