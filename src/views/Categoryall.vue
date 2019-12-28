<template>
  <div class="catediv">
    <div class="catediv_left">
      <ul
        class="menu _uWi"
      >
        <a :href="'#'+data.category.categoryId" v-for="data in datalist" :key="data.category.categoryId" class="item _uWi"  @click="click($event)">{{data.category.displayName}}</a>
      </ul>
    </div>
    <div class="catediv_right">
      <div class="catediv_right_nei">
         <ul v-for="data in datalist" :key="data.category.categoryId" class="rul" :id="data.category.categoryId">
          <h3><p>{{data.category.displayName}}</p>/共{{data.albumCount}}张专辑 <span>></span></h3>
          <li v-for="item in data.category.subCategories" :key="item.link" @click="categoryclick(item.link)">
            {{item.displayValue}}
          </li>
        </ul>
      </div>

    </div>

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
      this.datalist = res.data.data
    })
  },
  mounted () {
    //  window.onscroll = this.myscroll
  },
  methods: {
    click (evt) {
      console.log(evt)
      var ul = evt.target.closest('ul')
      var c = evt.target.closest('ul').children
      for (var item of c) {
        item.removeAttribute('class')
        item.setAttribute('class', 'item _uWi')
      }
      ul.firstElementChild.style.borderLeft = 0
      evt.target.setAttribute('class', 'item _uWi active')
      document.documentElement.scrollTop += 300
      document.body.scrollTop += 300
    },
    categoryclick (id) {
      this.$router.push(`/jihe${id}`)
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
  // overflow-y: auto;
  overflow: hidden;
  .catediv_left{
    height: 100%;
    overflow: hidden;
    width:0.9rem;
    margin-top: 0.6rem;
    // float: left;
    position:absolute;
    box-sizing: border-box;
  }
  .catediv_right{
    height: 100%;
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
    width: 3.16rem;
    top: 0.6rem;
    left: 1rem;
    .catediv_right_nei{
      overflow: auto;
      height: 100%;
    }
  }
}
.menu._uWi {
  // width:0.9rem;
  // margin-top: 0.6rem;
  // // float: left;
  position: relative;
  // box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
}
.menu .item._uWi {
  display: block;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.14rem;
  color: #72727b;
  position: relative;
  border-bottom: 0.01rem solid #e8e8ee;
}
.rul{
  box-sizing: border-box;
  width: 3.16rem;
  overflow-y: auto;
  // overflow: auto;
  // position: relative;
  // float: right;
  // margin-top: 0.6rem;
  // top: 0.6rem;
  // left: 1rem;
  padding: 0 0 0.075rem  0.075rem;
  h3{
    padding: 0.05rem;
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
