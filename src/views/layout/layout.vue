<template>
  <div class="body layout">
    <sidebar></sidebar>
    <div class="content-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
  import { Navbar, Sidebar, AppMain } from './index'
  export default {
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    data () {
      return {}
    }
  }
</script>
<style scoped lang=stylus src="@styl/layout/layout.styl"></style>
