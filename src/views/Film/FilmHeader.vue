<template>
<div>
    <div v-if="isFixed"
      style="background:white;text-align:center;height:40px;line-height:40px;">电影</div>
    <ul >
      <router-link to="/film/nowplaying" tag="li" activeClass="active">正在热映</router-link>
      <router-link to="/film/comingsoon" tag="li" activeClass="active">即将上映</router-link>
    </ul>
</div>

</template>
<script>
export default {
  props: [
    'isFixed'
  ]
}
</script>
<style lang="scss" scoped>

  .active{
    color:red;
    border-bottom:1px solid red;
  }

  ul{
    display: flex;
    list-style: none;
    padding-left: 0px;
    background-color: white;
    li{
      flex:1;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
  .fixed{
    position: fixed;
    top: 0;
    height: 80px;
    width: 100%;
    background-color: white;
  }
</style>
