<template>
  <div class="navbar-container">
    <div
      v-waves
      @click="$store.dispatch('ToggleSidebar')"
      class="an-mall-icon hamburger-icon"
      :class="{mini: sidebarStatus}">&#xe65f;</div>
    <mu-breadcrumb class="breadcrumbs">
      <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
      <mu-breadcrumb-item href="/">VideoGame</mu-breadcrumb-item>
      <mu-breadcrumb-item>Download</mu-breadcrumb-item>
    </mu-breadcrumb>
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
