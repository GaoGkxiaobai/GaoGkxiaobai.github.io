<template>
    <ul>
     <router-link v-for="data in $store.state.headData" :to="data.moduleKey" tag='li' :key='data.order' activeClass='active' :class="isflex?'flex':'lf'">
         {{data.moduleName}}
     </router-link>
    </ul>
</template>
<script>
export default {
  props: ['isflex'],
  created () {
    if (this.$store.state.headData.length === 0) {
      this.$store.dispatch('getheadnav')
    }
  }
}
</script>
<style lang="scss" scoped>
ul{
  margin-top: 0.5rem;
    width: 100%;
    height: 0.4rem;
    overflow-x: hidden;
    margin-bottom:0.1rem;
    padding: 0.01rem;
    li{
        float: left;

        height: 0.2rem;
        margin: 0.07rem 0.125rem;
        font: 0.14rem/0.2rem "宋体";
        color: #72727b;
        text-align: center;
        padding-bottom:0.13rem;
    }
}
.active{
    height: 0.2rem;
    margin: 0.07rem 0.125rem;
    font: 0.18rem/0.2rem "宋体";
    color: #40404c;
    border-bottom: 0.03rem solid red;
}
ul{
    border-bottom:0.01rem solid #e8e8ee;
}
.flex {
  width: 100%;
  position: fixed;
  top: 0;
  background: white;
  z-index: 200;
}

</style>
