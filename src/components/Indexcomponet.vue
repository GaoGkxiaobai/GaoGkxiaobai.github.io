<template>
    <div>
     <headnav></headnav>
     <slot></slot>
     <ul v-for="(data,i) in $store.state.indexData" :key='i'>
       <h3>{{data.moduleInfo.displayName}} <span>更多></span></h3>
       <li v-for="item in data.albumBriefDetailInfos" :key="item.id" @click="indexclick(item.id)">
         <img :src="'http://imagev2.xmcdn.com/'+item.albumInfo.cover" alt="">
         <h3>{{item.albumInfo.title}}</h3>
         <p>{{item.albumInfo.subTitle}}</p>
         <p><span><i></i>{{item.statCountInfo.trackCount}}</span><span><i></i>{{item.statCountInfo.playCount}}</span></p>
       </li>
     </ul>
    </div>
</template>
<script>
import headnav from '@/components/Headnav'
export default {
  components: {
    headnav
  },
  mounted () {
    if (this.$store.state.indexData.length === 0) {
      this.$store.dispatch('getindexdata')
    }
  },
  methods: {
    indexclick (id) {
      console.log(id)
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
ul{
  width: 100%;
  h3{
    width: 100%;
    height: 0.24rem;
    padding: 0 0.15rem;
    font: 0.18rem/0.24rem "宋体";
    color: #333333;
    span{
      text-align: right;
          font: 0.12rem/0.24rem "宋体";
          color: #72727b;
    }
  }
  li{
    overflow: hidden;
    padding: 0.1rem 0.15rem 0.1rem 0;
    border-bottom: 1px solid #ccc;
    img{
      width: 0.7rem;
      height: 0.7rem;
      float: left;
      margin-right: 0.2rem;
    }
    h3{
       font: 0.16rem/0.16rem "宋体";
    color: #333333;
    }
    p{
       font: 0.13rem/0.13rem "宋体";
    color: #999999;
    margin: 0.05rem 0 0.07rem;
    }
    span{
       font: 0.11rem/0.11rem "宋体";
    color: #999999;
    }
  }
}
</style>
