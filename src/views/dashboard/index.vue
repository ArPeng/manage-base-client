<template>
  <div class="body">
    {{message}}
  </div>
</template>
<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        message: '控制面板'
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/dashboard/index.styl"></style>
