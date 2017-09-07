<template>
  <div
    :class="{mini: mini}"
    class="sidebar-container"
  >
    <div
      v-if="!mini"
      class="menu">
        <ul>
          <li
            v-for="item in menu"
            class="item"
          :class="{open:item.open}">
            <div
              v-waves
              @click="item.open = !item.open"
              class="item-content">
              <div class="an-mall-icon icon">&#xe61c;</div>
              <div class="text">{{item.name}}</div>
              <div class="an-mall-icon triangle">&#xe71a;</div>
            </div>
            <ul
              v-if="typeof item.children !== 'undefined' && item.children.length > 0"
              >
              <li
                v-for="child in item.children"
                class="item"
                :class="{open: child.open}">
                <div
                  v-waves
                  @click="child.open = !child.open"
                  class="item-content">
                  <div class="an-mall-icon icon"></div>
                  <div class="text">{{child.name}}</div>
                  <div class="an-mall-icon triangle">&#xe71a;</div>
                </div>
                <ul
                  v-if="typeof child.children !== 'undefined' && typeof child.children.length !== 'undefined' && child.children.length > 0"
                  >
                  <li class="item" v-for="lastItem in child.children">
                    <div v-waves class="item-content">
                      <div class="an-mall-icon icon"></div>
                      <div class="text">{{lastItem.name}}</div>
                      <!--<div class="an-mall-icon triangle">&#xe71a;</div>-->
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      mini: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        menu: [
          {
            name: '控制面板',
            open: false,
            children: [
              {
                name: '测试',
                open: false,
                children: [
                  {
                    name: '测试'
                  },
                  {
                    name: '测试'
                  },
                  {
                    name: '测试'
                  },
                  {
                    name: '测试'
                  },
                  {
                    name: '测试'
                  }
                ]
              },
              {
                name: '测试'
              },
              {
                name: '测试'
              },
              {
                name: '测试'
              },
              {
                name: '测试'
              }
            ]
          }
        ]
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/sidebar.styl"></style>
