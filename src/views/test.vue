<template>
  <div >
    <template v-for="two_menu in two_menus">
      <h2 v-if="two_menu.children.length <= 1" :name="two_menu">小于1</h2>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        two_menus: []
      }
    },
    created () {
      window.alert('aaa')
      setTimeout(() => {
        this.two_menus.push({
          children: [1, 2, 3, 4]
        })
        this.two_menus.push({
          children: [1]
        })
      }, 2000)
    }
  }
</script>
<style scoped lang="sass"></style>
