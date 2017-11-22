<template>
  <el-container>
    <el-header>
      <div class="sub-title">控制台</div>
      <ui-user-info>
      </ui-user-info>
    </el-header>
    <el-main>
      <ul>
        <li @click="jump({name: 'permission'})">
          <div class="item-content">
            <div class="an-mall-icon icon">&#xe606;</div>
            <div class="title">权限管理</div>
          </div>
        </li>
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
      return {}
    },
    created () {
    }
  }
</script>
<style scoped lang="sass" src="@sass/dashboard/index.sass"></style>
