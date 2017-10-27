<template>
  <div class="body layout">
    <sidebar
      :mini="Boolean(sidebar.mini)"></sidebar>
    <div class="content-container">
      <navbar
        :sidebar-status="Boolean(sidebar.mini)"></navbar>
      <div class="main-container">
        <ui-view></ui-view>
      </div>
    </div>
  </div>
</template>
<script>
  import { Navbar, Sidebar, UiView } from './index'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Navbar,
      Sidebar,
      UiView
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    data () {
      return {}
    },
    methods: {
    }
  }
</script>
<style scoped lang=stylus src="@styl/layout/layout.styl"></style>
