<template>
  <div class="main-container">
    <transition name="fade-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/app_main.styl"></style>
