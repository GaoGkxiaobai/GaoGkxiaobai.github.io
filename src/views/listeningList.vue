<template>
    <div class="listbox">
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
<style lang="scss" scoped>
.listbox{
  margin-top: 0.5rem;
}
</style>
