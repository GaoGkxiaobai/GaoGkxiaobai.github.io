<template>
<indexcomponent :boolean='boolean'></indexcomponent>
</template>
<script>
import indexcomponent from '@/components/Indexcomponet'
export default {
  data () {
    return {
      boolean: true
    }
  },
  components: {
    indexcomponent
  }
}
</script>
