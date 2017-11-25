<template>
  <el-menu
    default-active="2"
    :collapse="mini"
    background-color="#324157"
    text-color="#fff"
    class="sidebar"
    active-text-color="#409EFF">
      <menu-loop :data="menu"></menu-loop>
  </el-menu>
</template>
<script>
  import menuLoop from './menuLoop.vue'
  export default {
    components: {
      menuLoop
    },
    props: {
      mini: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        menu: []
      }
    },
    created () {
      this
        .$api
        .verification
        .sidebarMenu(this.$route.matched[0].name)
        .then(r => {
          this.menu = r
        })
    }
  }
</script>
<style scoped lang="sass"></style>
