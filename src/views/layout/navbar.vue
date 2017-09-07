<template>
  <div class="navbar-container">
    <div
      v-waves
      @click="$store.dispatch('ToggleSidebar')"
      class="an-mall-icon hamburger-icon"
      :class="{mini: sidebarStatus}">&#xe65f;</div>
  </div>
</template>
<script>
  export default {
    props: {
      sidebarStatus: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {}
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/navbar.styl"></style>
