<template>
  <div class="navbar-container">
    <div
      v-waves
      @click="$store.dispatch('ToggleSidebar')"
      class="an-mall-icon hamburger-icon"
      :class="{mini: sidebarStatus}">&#xe65f;</div>
    <ui-breadcrumbs>
      <template>
        <ui-breadcrumbs-item
          :value="$lang('控制台')"
          to="/dashboard"
        ></ui-breadcrumbs-item>
      </template>
    </ui-breadcrumbs>
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
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/navbar.styl"></style>
