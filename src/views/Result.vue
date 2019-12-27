<template>
<div>
    <searchnav>
      <router-link
      :to="'/result/all/'+this.$store.state.resultpath"
      tag="li"
      key="1"
      activeClass="active"
    >全部</router-link>
    <router-link
      :to="'/result/album/'+this.$store.state.resultpath"
      tag="li"
      key="2"
      activeClass="active"
    >专辑</router-link>
    <router-link
      :to="'/result/sound/'+this.$store.state.resultpath"
      tag="li"
      key="3"
      activeClass="active"
    >声音</router-link>
    </searchnav>
    <router-view></router-view>
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
  }
  // created () {
  //   this.path = this.$route.params.all
  // }

}
</script>
