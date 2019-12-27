<template>
  <div>
    <div v-for="(data,i) in $store.state.allsearchData" :key="i" class="toli" @click="searchclick(data.word)">
      <span>{{i+1}}</span>
      <p>{{data.word}}</p>
      <i v-if="(data.shift)==1" class="iconfont icon-web-icon-"></i>
      <i v-if="(data.shift)==-1" class="iconfont icon-xiajiang"></i>
      <i v-if="(data.shift)==0" class="iconfont icon-iconjian"></i>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    this.$store.dispatch('getallsearch', this.$route.params.search)
  },
  watch: {
    $route () {
      this.$store.dispatch('getallsearch', this.$route.params.search)
    }
  },
  methods: {
    searchclick (data) {
      this.$store.state.resultpath = data
      this.$router.push(`/result/all/${data}`)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  margin-top: 0.1rem;
  .toli {
    height: 0.45rem;
    position: relative;
    span {
      font: 0.16rem/0.45rem "宋体";
      color: #dabda6;
      position: absolute;
    }
    p {
      width: 3.6rem;
      display: inline-block;
      font: 0.16rem/0.45rem "宋体";
      color: #333333;
      border-bottom: 0.01rem solid rgba(231, 230, 230, 0.5);
      margin-left: 0.1rem;
      position: absolute;
      left: 0.2rem;
    }
    i {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .toli:nth-child(1) {
    span {
      font: 0.2rem/0.45rem "宋体";
      color: #ef0b0b;
      position: absolute;
    }
  }

  .toli:nth-child(2) {
    span {
      font: 0.2rem/0.45rem "宋体";
      color: #f86442;
    }
  }
  .toli:nth-child(3) {
    span {
      font: 0.2rem/0.45rem "宋体";
      color: #f8a642;
    }
  }
  .icon-web-icon- {
    color: red;
  }
  .icon-xiajiang {
    color: green;
  }
  .icon-iconjian {
    color: #ccc;
  }
}
</style>
