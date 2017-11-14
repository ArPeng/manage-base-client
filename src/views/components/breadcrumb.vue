<template>
  <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
  <el-breadcrumb separator="/">
    <template v-for="breadcrumb in breadcrumbs">
      <el-breadcrumb-item style="line-height: 20px" :to="{ name: breadcrumb.name }">
        {{breadcrumb.title}}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
  export default {
    data () {
      return {
        breadcrumbs: []
      }
    },
    watch: {
      $route (routes) {
        this.createBreadcrumbs(routes.matched)
      }
    },
    methods: {
      createBreadcrumbs (routes) {
        this.breadcrumbs = []
        this.breadcrumbs.push({
          title: '控制台',
          name: 'dashboard'
        })
        routes.some((route, idx) => {
          if (route.meta.breadcrumb) {
            this.breadcrumbs.push({
              title: route.meta.title,
              name: route.name
            })
          }
        })
      }
    },
    created () {
      this.createBreadcrumbs(this.$route.matched)
    }
  }
</script>
<style scoped lang="sass"></style>
