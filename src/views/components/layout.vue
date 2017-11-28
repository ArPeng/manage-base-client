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
  import api from '@api'
  import Store from '@store'
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
    },
    /**
     * @purpose 进入之前获取该权限内的所有子权限
     * @param to
     * @param from
     * @param next
     */
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      api
        .verification
        .identification(to.matched[0].name)
        .then(r => {
          Store.dispatch('setPermission', r)
          next()
        })
    },
    created () {
      this
        .$api
        .verification
        .identification(this.$route.matched[0].name)
        .then(r => {
          this.$store.dispatch('setPermission', r)
        })
    }
  }
</script>
<style scoped lang="sass" src="@sass/components/layout.sass"></style>
