<template>
  <div class="body">
    <div class="body-header">
      <div class="title">{{$lang('控制台')}}</div>
      <ui-user-info></ui-user-info>
    </div>
    <div class="body-content">
        <div class="container">
          <div
            class="item"
            @click="$router.push('/administrator')">
            <div class="an-mall-icon icon">&#xe6c4;</div>
            <div class="name">管理员</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import uiUserInfo from './userInfo.vue'
  export default {
    components: {
      uiUserInfo
    },
    name: 'dashboard',
    data () {
      return {
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/dashboard/index.styl"></style>
