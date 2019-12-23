<template>
    <div>
        <listeningListTou></listeningListTou>
        <router-view></router-view>
    </div>
</template>
<script>
import listeningListTou from '@/components/listeningListTou'
export default {
  components: {
    listeningListTou
  }
}
</script>
