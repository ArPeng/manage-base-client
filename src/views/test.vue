<template>
  <div class="content">测试</div>
</template>
<script>
//  import Vue from 'vue'
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    created () {
      this.$toast('测试弹窗toast', (r) => {
        console.log('回调了')
      })
//      console.log(new Vue())
//      this
//        .$api
//        .sign
//        .signByPassword('13123144888', 'yangchenpeng1991')
//        .then(r => {
//          console.log(r)
//        })
    }
  }
</script>
<style scoped lang="stylus"></style>
