<template>
<div>
    <searchnav>
      <router-link
      :to="'/result/all/'+path"
      tag="li"
      key="1"
      activeClass="active"
    >全部</router-link>
    <router-link
      :to="'/result/album/'+path"
      tag="li"
      key="2"
      activeClass="active"
    >专辑</router-link>
    <router-link
      :to="'/result/sound/'+path"
      tag="li"
      key="3"
      activeClass="active"
    >声音</router-link>
    </searchnav>
    <router-view :path="path"></router-view>
    </div>
</template>

<script>
import searchnav from '@/components/Searchnav'
export default {
  data () {
    return {
      path: ''
    }
  },
  components: {
    searchnav
  },
  created () {
    //  console.log(this.$route.params.all)
    this.path = this.$route.params.all
  }

}
</script>
