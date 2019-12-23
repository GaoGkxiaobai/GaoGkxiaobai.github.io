<template>
    <!-- <div>
        {{this.top}}
        {{this.left}}
        {{shishi()}}
    </div> -->
    <ul class="toprightul">
        <li class="toprightli">
          <span class="iconfont icon-paihang"></span>
          <!-- <img src="" alt=""> -->
        </li>
    </ul>
</template>
<script>
import Axios from 'axios'
export default {
  props: ['top', 'left'],
  methods: {
    // shishi () {
    //   console.log(this.top, this.left)
    // }
  },
  mounted () {
    Axios({
      url: `https://m.ximalaya.com/m-revision/page/rank/queryRank?clusterCode=${this.top}&categoryCode=${left}`
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
.toprightul{
    width: 100%;

}
</style>
