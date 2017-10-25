<template>
  <div>
    <transition name="fade-in" appear>
      <router-view></router-view>
    </transition>
    <mu-toast
      v-if="toast.show"
      :message="toast.message"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'toast'
      ])
    },
    methods: {
    },
    watch: {
      toast: function (val, old) {
        if (!val.show) {
          old.callback()
        }
      }
    },
    created () {
    }
  }
</script>
