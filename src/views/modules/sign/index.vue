<template>
  <div class="body">
    
  </div>
</template>
<script>
  export default {
    data () {
      return {
        open: false,
        trigger: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        targetOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      }
    },
    mounted () {
      this.trigger = this.$refs.button.$el
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      handleClose (e) {
        this.open = false
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/modules/sign/index.styl"></style>
