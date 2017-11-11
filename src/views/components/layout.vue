<template>
  <el-container>
    <ui-menu :mini="sidebar.mini"></ui-menu>
    <el-container>
      <el-header style="height: 50px">
        <div
          class="an-mall-icon hamburger-icon"
          @click="$store.dispatch('ToggleSidebar')"
          :class="{mini: sidebar.mini}"
          v-waves>&#xe65f;</div>
        <div class="breadcrumb-box">
          <breadcrumb></breadcrumb>
        </div>
        <!--<tags></tags>-->
        <ui-user-info color="rgb(72, 87, 106)"></ui-user-info>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!--<el-footer></el-footer>-->
    </el-container>
  </el-container>
</template>
<script>
  import {mapGetters} from 'vuex'
  import uiMenu from '@components/menu.vue'
//  import tags from '@components/tags.vue'
  import breadcrumb from '@components/breadcrumb.vue'
  import uiUserInfo from '@components/userInfo.vue'
  export default {
    components: {
      uiUserInfo,
      breadcrumb,
//      tags,
      uiMenu
    },
    computed: {
      ...mapGetters(['sidebar'])
    },
    data () {
      return {
        mini: false
      }
    }
  }
</script>
<style scoped lang="sass" src="@sass/components/layout.sass"></style>
