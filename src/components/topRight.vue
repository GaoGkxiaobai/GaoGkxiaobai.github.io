<template>
    <!-- <div>
        {{this.top}}
        {{this.left}}
        {{shishi()}}
    </div> -->
    <ul class="toprightul">
        <li class="toprightli"></li>
    </ul>
</template>
<script>
export default {
  props: ['top', 'left'],
  methods: {
    // shishi () {
    //   console.log(this.top, this.left)
    // }
  }
}
</script>
<style lang="scss" scoped>
.toprightul{
    width: 100%;

}
</style>
