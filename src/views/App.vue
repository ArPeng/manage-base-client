<template>
  <transition name="fade-in" appear>
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'app'
}
</script>
