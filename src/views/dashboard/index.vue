<template>
  <el-container>
    <el-header>
      <div class="sub-title">控制台</div>
      <ui-user-info>
      </ui-user-info>
    </el-header>
    <el-main>
      <ul>
        <template v-for="item in menu">
          <li @click="jump({name: item.identification})">
            <div class="item-content">
              <template v-if="item.icon_class">
                <div
                  :class="item.icon_family"
                  class="icon">
                  <span :class="item.icon_class"></span>
                </div>
              </template>
              <div class="title">{{item.name}}</div>
            </div>
          </li>
        </template>
      </ul>
    </el-main>
  </el-container>
</template>
<script>
  import uiUserInfo from '@components/userInfo.vue'
  export default {
    components: {
      uiUserInfo
    },
    data () {
      return {
        menu: []
      }
    },
    methods: {
      // 跳转之前先获取侧边栏菜单
//      getSidebar (identification, id) {
//        let auto = setTimeout(() => {
//          this.showLoading()
//        }, 500)
//        this
//          .$api
//          .verification
//          .sidebarMenu(id)
//          .then(r => {
//            clearTimeout(auto)
//            this.closeLoading()
//          })
//      }
    },
    created () {
      // 获取dashboard菜单
      this
        .$api
        .verification
        .dashboard()
        .then(r => {
          this.menu = r
          console.log(r)
        })
    }
  }
</script>
<style scoped lang="sass" src="@sass/dashboard/index.sass"></style>
