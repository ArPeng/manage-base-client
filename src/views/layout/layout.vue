<template>
  <div class="body layout">
    <sidebar
      :mini="Boolean(sidebar.mini)"></sidebar>
    <div class="content-container">
      <navbar
        :sidebar-status="Boolean(sidebar.mini)"></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
  import { Navbar, Sidebar, AppMain } from './index'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    data () {
      return {}
    }
  }
</script>
<style scoped lang=stylus src="@styl/layout/layout.styl"></style>
