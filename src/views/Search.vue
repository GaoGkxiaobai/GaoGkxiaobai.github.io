<template>
  <div class="div">
    <div class="top">
      <input type="text" v-model="mytxt" />
      <span @click="go">取消</span>
    </div>
    <searchnav></searchnav>
    <router-view></router-view>
    <searchlist v-if="ishow" :mytxt="mytxt"></searchlist>
  </div>
</template>
<script>
import searchnav from '@/components/Searchnav'
import searchlist from '@/components/Searchlist'

export default {
  data () {
    return {
      mytxt: '',
      ishow: false
    }
  },
  created () {
    this.$store.state.searchlistData = []
  },
  watch: {
    mytxt () {
      if (this.mytxt.length <= 0) {
        this.ishow = false
      } else {
        this.ishow = true
      }
    }
  },
  components: {
    searchnav,
    searchlist
  },
  methods: {
    go () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 0.14rem;
  box-sizing: border-box;
  .top {
    padding: 0;
    width: 100%;
    height: 0.5rem;
    position: fixed;
    top: 0.08rem;
    background: white;
    overflow: hidden;
    input {
      width: 3.04rem;
      height: 0.3rem;
      border: none;
      background: #eff1e4;
      color: black;
      border-radius: 0.2rem;
      padding-left: 0.3rem;
    }
    span {
      font: 0.16rem/0.3rem "宋体";
      color: #333333;
      position: absolute;
      padding-left: 0.1rem;
    }
  }
}
</style>
