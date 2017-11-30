<template>
  <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="breadcrumb in breadcrumbs">
        <el-breadcrumb-item style="line-height: 20px" :key="breadcrumb.name" v-if="breadcrumb.title">
          <span class="no-redirect" v-if="!breadcrumb.breadcrumb">{{breadcrumb.title}}</span>
          <router-link v-else :to="{ name: breadcrumb.name }">{{breadcrumb.title}}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
  <!--<transition-group name="breadcrumb">-->
    <!--<el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">-->
      <!--<span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>-->
      <!--<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>-->
    <!--</el-breadcrumb-item>-->
  <!--</transition-group>-->
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
          name: 'dashboard',
          breadcrumb: true
        })
        routes.some((route, idx) => {
          this.breadcrumbs.push({
            title: route.meta.title,
            breadcrumb: route.meta.breadcrumb,
            name: route.name
          })
        })
      }
    },
    created () {
      this.createBreadcrumbs(this.$route.matched)
    }
  }
</script>
<style scoped lang="sass">
  .app-breadcrumb.el-breadcrumb
    display: inline-block
    font-size: 14px
    line-height: 50px
    .no-redirect
      font-weight: 400
      color: #5a5e66
      cursor: text
</style>
