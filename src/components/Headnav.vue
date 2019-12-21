<template>
    <ul>
     <router-link v-for="data in $store.state.headData" :to='data.moduleKey' :tag='li' :key='data.order' :activeClass='active'>
         {{data.moduleName}}
     </router-link>
    </ul>
</template>
<script>
export default {
  mounted () {
    if (this.$store.state.headData.length === 0) {
      this.$store.dispatch('getheadnav')
    }
  }
}
</script>
<style lang="scss" scoped>
ul{
    width: 100%;
    height: 0.4rem;
    li{
        float: left;
        width: 0.52rem;
        height: 0.2rem;
        padding: 0.07rem 0.125rem;
        font: 0.14rem/0.2rem "宋体";
        color: #72727b;
    }
}
.active{
    width: 0.52rem;
    height: 0.2rem;
    padding: 0.07rem 0.125rem;
    font: 0.14rem/0.2rem "宋体";
    color: #40404c;
}
</style>
