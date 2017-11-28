<template>
  <el-menu
    v-loading="loading"
    default-active="2"
    :collapse="mini"
    background-color="#324157"
    text-color="#fff"
    class="sidebar"
    active-text-color="#409EFF">
      <menu-loop :data="menu" :mini="mini"></menu-loop>
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
        menu: [],
        loading: false
      }
    },
    created () {
      let autoLoading = setTimeout(() => {
        this.loading = true
      }, 3000)
      this
        .$api
        .verification
        .sidebarMenu(this.$route.matched[0].name)
        .then(r => {
          clearTimeout(autoLoading)
          this.loading = false
          this.menu = r
        })
    }
  }
</script>
<style scoped lang="sass"></style>
