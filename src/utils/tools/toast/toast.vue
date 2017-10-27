<template>
  <mu-toast v-if="show" :message="message"></mu-toast>
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
      }
    }
  }
</script>
