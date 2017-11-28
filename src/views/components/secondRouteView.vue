<!--
---- 二级菜单路由视图
--->
<template>
    <router-view></router-view>
</template>
<script>
  export default {
    data () {
      return {
        identification: ''
      }
    },
    created () {
      this.auth()
    }
  }
</script>
<style scoped lang="sass"></style>
