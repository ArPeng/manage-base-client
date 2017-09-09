<template>
  <div class="body">
    <div class="body-header">
      <div class="title">{{$lang('控制台')}}</div>
      <div class="userinfo" ref="button" @click="open = !open">
        <div class="avatar">
          <img :src="require('@assets/avatar.gif')">
        </div>
        <div class="username">杨陈鹏</div>
        <div
          class="an-mall-icon triangle"
          :class="{open:open}"
        >&#xe657;</div>
      </div>
      <!--<mu-raised-button label="点这里"/>-->
      <mu-popover
        :trigger="trigger"
        :anchorOrigin="{vertical: 'bottom', horizontal: 'right'}"
        :targetOrigin="{vertical: 'top', horizontal: 'right'}"
        :open="open"
        @close="open = false">
        <mu-menu>
          <!--<mu-menu-item title="个人资料" />-->
          <mu-menu-item title="退出" leftIcon="exit_to_app" @click="$router.push('/sign_in')" />
        </mu-menu>
      </mu-popover>
    </div>
    <div class="body-content">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        open: false,
        trigger: null
      }
    },
    mounted () {
      this.trigger = this.$refs.button
    }
  }
</script>
<style scoped lang="stylus" src="@styl/dashboard/index.styl"></style>
