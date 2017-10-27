<template>
  <div
    v-if="show"
    :style="{zIndex: zIndex}"
    @click="$emit('bgEvent')"
    class="show-loading">
    <mu-circular-progress
      v-if="!message"
      :size="60"
      color="#30b08f"
      :strokeWidth="6">
    </mu-circular-progress>
    <div v-else class="loading-message">
      <div class="animation">
        <mu-circular-progress
        :size="40"
        color="#30b08f"
        :strokeWidth="5">
        </mu-circular-progress>
      </div>
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: ''
      },
      zIndex: {
        type: Number,
        default: 100
      }
    }
  }
</script>
<style scoped lang="stylus">
  .show-loading
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    display flex
    align-items center
    justify-content center
    background-color rgba(255,255,255,0.5)
    .loading-message
      width auto
      height 60px
      background-color #ffffff
      border-radius 5px
      box-shadow 0 0 10px #555
      display flex
      .animation
        width 60px
        height 60px
        display flex
        align-items center
        justify-content center
      .message
        padding-right 2rem
        height 60px
        font-size 1.3rem
        color #000000
        line-height 60px
</style>
