<template>
  <transition name="fade-in" appear>
    <router-view></router-view>
  </transition>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/view.styl"></style>
