<template>
    <div>all</div>
</template>

<script>
export default {

  beforeMount () {
    this.$store.dispatch('getresultall')
  }
}
</script>
