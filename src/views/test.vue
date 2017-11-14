<template>
</template>
<script>
  export default {
    data () {
      return {
        param: '测试参数' // 这里定义初始值, 如果不在vue内部可使用let关键词定义初始值
      }
    },
    created () {
      // 如果url带有test参数则取值test参数
      if (this.$route.param.test) {
        this.param = this.$route.param.test
      }
    }
  }
</script>
<style scoped lang="sass"></style>
