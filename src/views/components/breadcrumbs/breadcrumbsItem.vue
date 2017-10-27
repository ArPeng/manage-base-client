<template>
    <div
      class="breadcrumbs-item"
      :class="{disabled:disabled}"
      @click="jump(to)">
      <span class="breadcrumbs-item-text">{{title}}</span>
      <span class="breadcrumbs-item-delimiter">{{delimiter}}</span>
    </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      delimiter: {
        type: [String, Boolean],
        default: '/'
      },
      to: {
        type: String,
        default: '/'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      jump (path) {
        if (this.disabled) {
          return false
        }
        this.$router.push(path)
      }
    }
  }
</script>
