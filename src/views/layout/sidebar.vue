<template>
  <div
    v-waves
    :class="{mini: mini}"
    class="sidebar-container"
  >
    <div class="menu">

    </div>
  </div>
</template>
<script>
  export default {
    props: {
      mini: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {}
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/sidebar.styl"></style>
