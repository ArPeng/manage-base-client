<template>
  <div class="userinfo" :style="{color:color}" ref="button" @click="open = !open">
    <div class="avatar">
      <img
        :onerror="`javascript:this.src='${require('@assets/defaultAvatar.jpg')}'`"
        :src="userInfo.avatar">
    </div>
    <div class="username">杨陈鹏</div>
    <div
      class="an-mall-icon triangle"
      :class="{open:open}"
    >&#xe657;</div>
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
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'userInfo',
    props: ['color'],
    data () {
      return {
        open: false,
        trigger: null
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    mounted () {
      this.trigger = this.$refs.button
    }
  }
</script>
<style scoped lang="stylus">
  @import "../../styles/stylus/basic"
  .userinfo
    height 100%
    padding 0 10px
    margin 0 10px
    display flex
    align-items center
    cursor pointer
    transition background-color 0.5s
    color $font-light
    &:hover
      background-color $bg-dark-light-hover
      .username,.triangle
        color $font-light
      .avatar>img
        transform rotate(360deg)
    .avatar
      width 30px
      height @width
      border-radius @width
      background-color $bg-light-dark
      >img
        width @width
        height @width
        border-radius @border-radius
        transition transform .5s
        transform rotate(0deg)
    .username
      font-size 14px
      margin-left 5px
    .triangle
      width 20px
      height 20px
      font-size 14px
      margin-left 5px
      transform rotate(0deg)
      transition transform .3s
      display flex
      align-items center
      justify-content center
      &.open
        transform rotate(-180deg)
</style>
