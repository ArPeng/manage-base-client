<template>
  <div class="navbar-container">
    <div
      v-waves
      @click="$store.dispatch('ToggleSidebar')"
      class="an-mall-icon hamburger-icon"
      :class="{mini: sidebarStatus}">&#xe65f;</div>
    <ui-breadcrumbs>
      <template v-for="(item, idx) in breadcrumbs">
        <ui-breadcrumbs-item
          :title="item.title"
          :to="item.path"
          :disabled="breadcrumbs.length === (idx + 1)"
        ></ui-breadcrumbs-item>
      </template>
    </ui-breadcrumbs>
    <div class="tabs">
      <template v-for="(tab, idx) in tabs">
        <div
          class="tab"
          :class="{active: tab.active}"
          @click.self="jump(tab.path)">
          <div @click.self="jump(tab.path)" class="text">{{tab.title}}</div>
          <div @click="close(idx)" class="icon">×</div>
        </div>
      </template>
    </div>
    <div class="user-info">
      <ui-user-info color="#48576a"></ui-user-info>
    </div>
  </div>
</template>
<script>
  import uiUserInfo from '@views/dashboard/userInfo.vue'
  export default {
    components: {
      uiUserInfo
    },
    props: {
      sidebarStatus: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        breadcrumbs: [],
        tabs: []
      }
    },
    methods: {
      close (idx) {
        if (idx === 0 && this.tabs.length === 1) {
          return false
        }
        if (this.tabs[idx].active) {
          this.jump(this.tabs[this.tabs.length - 1].path)
        }
        this.tabs =
          this.tabs.filter((item, index) => {
            return idx !== index
          })
      },
      createTabs (route) {
        let hasEle = false
        this.tabs =
          this.tabs.map(item => {
            if (item.name === route.name) {
              hasEle = true
            }
            item.active = (item.name === route.name)
            return item
          })
        if (!hasEle) {
          this.tabs.push({
            name: route.name,
            title: route.meta.title,
            path: route.path,
            active: true
          })
        }
      },
      createBreadCrumbs (route) {
        this.breadcrumbs = []
        this.breadcrumbs.push({
          title: '控制台',
          path: '/dashboard',
          name: 'dashboard',
          disabled: false
        })
        route.matched.map((item, idx) => {
          if (idx !== 0) {
            this.breadcrumbs.push({
              title: item.meta.title,
              path: item.path,
              name: item.name
            })
          }
        })
      }
    },
    watch: {
      $route (val) {
        this.createBreadCrumbs(val)
        this.createTabs(val)
      }
    },
    created () {
      this.createBreadCrumbs(this.$route)
      this.createTabs(this.$route)
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/navbar.styl"></style>
