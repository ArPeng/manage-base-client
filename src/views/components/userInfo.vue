<template>
  <div
    class="user-info pull-right"
    :style="{color:color}"
    @click="open = !open">
    <div class="avatar">
      <img :src="userInfo.avatar" :onerror="`javascript:this.src='${require('@assets/defaultAvatar.jpg')}'`" />
    </div>
    <div class="username">{{userInfo.name}}</div>
    <div class="an-mall-icon triangle icon-up1" :class="{open: open}"></div>
    <transition name="el-zoom-in-top">
      <div
        ref="userInfoList"
        class="user-info-list"
        :style="{bottom: `-${toBottom}px`}"
        v-show="open">
        <div
          class="user-info-item"
          @click="jump({name: 'signIn'})">
          <div class="an-mall-icon icon" >&#xe7ec;</div>
          <div class="text">退出</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      color: {
        type: String,
        default: '#ffffff'
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    data () {
      return {
        // 打开以及关闭下拉列表
        open: false,
        // 距离顶部的定位
        toBottom: 0
      }
    },
    mounted () {
      this.toBottom =
        this.$refs.userInfoList.children.length * 40 + 20
    }
  }
</script>
<style scoped lang="sass" src="@sass/components/userInfo.sass"></style>
