<template>
  <ul ref="ul" class="hammerul">
    <router-link
      v-for="data in $store.state.headData"
      :to="'/index/'+data.moduleKey"
      tag="li"
      :key="data.order"
      activeClass="active"
      :class="isflex?'flex':'lf'"
    >{{data.moduleName}}</router-link>
  <router-link
      to="/category"
      tag="li"
      key="category"
      activeClass="active"
      :class="isflex?'flex':'lf'"
    >更多</router-link>
  </ul>

</template>
<script>
import Hammer from 'hammerjs'
export default {
  props: ['isflex'],
  created () {
    if (this.$store.state.headData.length === 0) {
      this.$store.dispatch('getheadnav', this.$route.name)
    }
  },
  mounted () {
    var square = document.querySelector('.' + this.$refs.ul.className)
    var hammer = new Hammer(square)
    hammer.on('swipeleft', function (e) {
      var ul = e.target.parentNode
      var left = ul.offsetLeft
      if (left <= 0) {
        left = 0
      }
      ul.style.left = left - 150 + 'px'
    })
    hammer.on('swiperight', function (e) {
      var ul = e.target.parentNode
      var left = ul.offsetLeft
      if (left > -150) {
        left = -150
      }
      ul.style.left = left + 150 + 'px'
    })
  },

  methods: {
  }
}
</script>
<style lang="scss" scoped>
ul {
  margin-top: 0.5rem;
  width: 150%;
  height: 0.4rem;
  margin-bottom: 0.1rem;
  padding: 0.01rem;
  position: relative;
  left: 0;
  transition: .5s;
  border-bottom: 0.01rem solid #e8e8ee;
  li {
    float: left;
    height: 0.2rem;
    margin: 0.07rem 0.125rem;
    font: 0.14rem/0.2rem "宋体";
    color: #72727b;
    text-align: center;
    padding-bottom: 0.13rem;

  }
}
.active {
  height: 0.2rem;
  margin: 0.07rem 0.125rem;
  font: 0.18rem/0.2rem "宋体";
  color: #40404c;
  border-bottom: 0.03rem solid red;
}
.flex {
  width: 150%;
  position: fixed;
  top: 0;
  background: white;
  z-index: 200;
}
</style>
