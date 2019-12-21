<template>
<!-- <keep-alive> -->
  <ul>
      <li v-for="data in comingsoon" :key="data.filmId">
          <div class="zuo">
          <img :src="data.poster" alt="data.name">
          </div>
          <div class="you">
              <h2>{{data.name}}</h2>
              <p v-if="data.grade">评分：{{data.grade}}</p>
              <p>{{data.premiereAt | maizuoTime}}</p>
              <p>导演：{{data.director}}</p>
              <p>
                <span v-for="(aa,i) in data.actors" :key="i">{{aa.name}} </span>
              </p>
              <!-- <p>{{  data.synopsis }}</p> -->
          </div>
      </li>
  </ul>
  <!-- </keep-alive> -->
</template>
<script>
import { mapState } from 'vuex'
import { Indicator } from 'mint-ui'
export default {
  computed: {
    ...mapState(['comingsoon'])
  },

  mounted () {
    if (this.comingsoon.length === 0) {
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // });
      this.$store.dispatch('getCommingsoon')
      Indicator.close()
    } else {
      // console.log('加载缓存')
    }
    // Indicator.close()
  }
}
</script>
<style lang="scss" scoped>
ul,ol,li{
  list-style: none;
}
ul{
  padding: 0;
}
li{
    overflow: hidden;
    // padding:5px;
    margin: 10px 0px;
    img{
      float: left;
      width: 100px;
    }
  }
  .zuo{
    margin-right: 4px;
  }
  .you{
    // margin-left: 10px;
    padding-left: 10px;
    overflow: hidden;
  }
  p{
    padding: 3px 0px;
    margin: 0px;
    // margin-left: 10px;
  }
</style>
