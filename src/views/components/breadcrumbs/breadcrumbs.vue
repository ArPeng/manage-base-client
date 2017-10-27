<template>
  <div class="breadcrumbs">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    created () {
      console.log(this.$route)
    }
  }
</script>
