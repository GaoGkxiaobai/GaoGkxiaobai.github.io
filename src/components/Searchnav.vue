<template>
  <ul ref="ul" class="hammerul">
    <slot></slot>
  </ul>
</template>
<script>
import Hammer from 'hammerjs'
export default {
  created () {

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
      var width = ul.offsetWidth
      if (left > -150) {
        left = -150
      }
      ul.style.left = left + 150 + 'px'
    })
  }
}
</script>
<style lang="scss" scoped>
ul {
  margin-top: 0.5rem;
  width: 150%;
  height: 0.4rem;
  padding: 0.01rem;
  position: relative;
  left: 0;
  transition: .5s;
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
ul {
  border-bottom: 0.01rem solid #e8e8ee;
}
</style>
