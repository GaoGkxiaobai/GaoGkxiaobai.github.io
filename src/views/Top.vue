<template>
    <div>
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
