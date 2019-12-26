<template>
    <div class="topbox">
        <topTou></topTou>

        <router-view></router-view>
    </div>
</template>
<script>
import topTou from '@/components/topTou'
export default {
  components: {
    topTou
  }
}
</script>
<style lang="scss" scoped>
.topbox{
  margin-top: 0.5rem;
}
</style>
