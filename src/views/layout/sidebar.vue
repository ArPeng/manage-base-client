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
              <div
                v-if="typeof item.children !== 'undefined' &&
                item.children.length > 0"
                class="an-mall-icon triangle">&#xe71a;</div>
            </div>
            <ul
              v-if="typeof item.children !== 'undefined' &&
              item.children.length > 0"
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
                  <div
                    v-if="
                    typeof child.children !== 'undefined' &&
                    child.children.length > 0"
                    class="an-mall-icon triangle">&#xe71a;</div>
                </div>
                <ul
                  v-if="
                  typeof child.children !== 'undefined' &&
                  typeof child.children.length !== 'undefined' &&
                  child.children.length > 0"
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
    <div
      v-if="mini"
      class="menu-mini">
      <ul>
        <template v-for="(item, idx) in menu">
          <li
            @mouseenter="mouseEnter(
              idx,
              typeof item.children !== 'undefined'
              && item.children.length > 0 ? item.children : [item])"
            @mouseleave="mouseLeave"
            class="item"
            :ref="'first_'+idx"
          >
            <div
              v-waves class="item-content">
              <span class="an-mall-icon icon">&#xe61c;</span>
            </div>
          </li>
        </template>
      </ul>
      <div
        ref="secondMenu"
        @mouseenter="mouseEnterSecond"
        @mouseleave="mouseLeaveSecond"
        :style="{top: secondMenuTop+'px'}"
        class="second-menu">
        <ul>
          <template v-for="(menu, idx) in secondMenu">
            <li
              :ref="'second_'+idx"
              @mouseenter="secondMouseEnter(
              idx,
              typeof menu.children !== 'undefined'
              && menu.children.length > 0 ? menu.children : null)"
              @mouseleave="secondMouseLeave(
              idx,
              typeof menu.children !== 'undefined'
              && menu.children.length > 0 ? menu.children : null)"
              class="item">
              <div
                v-waves class="item-content">
                <!--<span class="an-mall-icon icon">&#xe61c;</span>-->
                <div class="text">{{menu.name}}</div>
                <div
                  v-if="typeof menu.children !== 'undefined' &&
                menu.children.length > 0"
                  class="an-mall-icon triangle">&#xe71a;</div>
              </div>
            </li>
          </template>
        </ul>
      </div>
      <div
        ref="thirdMenu"
        :style="{top: thirdMenuTop+'px'}"
        class="third-menu">
        <ul>
          <template v-for="(menu, idx) in thirdMenu">
            <li
              class="item"
              @mouseenter="thirdMouseEnter"
              @mouseleave="thirdMouseLeave">
              <div
                v-waves class="item-content">
                <!--<span class="an-mall-icon icon">&#xe61c;</span>-->
                <div class="text">{{menu.name}}</div>
                <div
                  v-if="typeof menu.children !== 'undefined' &&
                menu.children.length > 0"
                  class="an-mall-icon triangle">&#xe71a;</div>
              </div>
            </li>
          </template>
        </ul>
      </div>
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
        secondMenu: [],
        thirdMenu: [],
        autoCloseSecondMenu: null,
        autoCloseThirdMenu: null,
        secondMenuTop: 0, // 二级菜单Y轴定位距离
        thirdMenuTop: 0, // 三级级菜单Y轴定位距离
        menu: [
          {
            name: '控制面板12',
            open: false
          },
          {
            name: '控制面板',
            open: false,
            children: [
              {
                name: '测试1',
                open: false,
                children: [
                  {
                    name: '测试2'
                  },
                  {
                    name: '测试3'
                  },
                  {
                    name: '测试4'
                  },
                  {
                    name: '测试5'
                  },
                  {
                    name: '测试6'
                  }
                ]
              },
              {
                name: '测试7',
                open: false,
                children: [
                  {
                    name: '测试7'
                  },
                  {
                    name: '测试8'
                  },
                  {
                    name: '测试9'
                  },
                  {
                    name: '测试10'
                  },
                  {
                    name: '测试11'
                  }
                ]
              },
              {
                name: '测试8'
              },
              {
                name: '测试9'
              },
              {
                name: '测试10'
              }
            ]
          },
          {
            name: '控制面板11',
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
    },
    methods: {
      // 鼠标移入第一级菜单列表
      mouseEnter (idx, item) {
        let dom = this.$refs['first_' + idx][0]
        if (this.autoCloseSecondMenu) {
          clearTimeout(this.autoCloseSecondMenu)
        }
        this.secondMenu = item
        this.$refs.secondMenu.style.display = 'block'
        this.secondMenuTop = dom.offsetTop
      },
      // 鼠标移出第一级菜单列表
      mouseLeave () {
        this.autoCloseSecondMenu = setTimeout(() => {
          this.$refs.secondMenu.style.display = 'none'
        }, 500)
      },
      // 鼠标移入第二级菜单块
      mouseEnterSecond () {
        if (this.autoCloseSecondMenu) {
          clearTimeout(this.autoCloseSecondMenu)
        }
        if (this.autoCloseThirdMenu) {
          clearTimeout(this.autoCloseThirdMenu)
        }
      },
      // 鼠标移出二级菜单块
      mouseLeaveSecond () {
        this.autoCloseSecondMenu = setTimeout(() => {
          this.$refs.secondMenu.style.display = 'none'
        }, 500)
      },
      // 鼠标移入二级菜单列表
      secondMouseEnter (idx, item) {
//        if (!item) {
//          this.secondMouseLeave()
//          return false
//        }
        if (this.autoCloseThirdMenu) {
          clearTimeout(this.autoCloseThirdMenu)
        }
        this.thirdMenu = item
        this.$refs.thirdMenu.style.display = 'block'
        this.thirdMenuTop = this.secondMenuTop + (idx * 56)
      },
      // 鼠标移出二级菜单列表
      secondMouseLeave () {
        console.log('鼠标移出二级菜单列表')
        this.autoCloseThirdMenu = setTimeout(() => {
          this.$refs.thirdMenu.style.display = 'none'
        }, 500)
      },
      // 鼠标移入三级惨淡
      thirdMouseEnter () {
        if (this.autoCloseSecondMenu) {
          clearTimeout(this.autoCloseSecondMenu)
        }
        if (this.autoCloseThirdMenu) {
          clearTimeout(this.autoCloseThirdMenu)
        }
      },
      // 鼠标移出三级菜单
      thirdMouseLeave () {
        this.autoCloseSecondMenu = setTimeout(() => {
          this.$refs.secondMenu.style.display = 'none'
        }, 500)
        this.autoCloseThirdMenu = setTimeout(() => {
          this.$refs.thirdMenu.style.display = 'none'
        }, 500)
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/layout/sidebar.styl"></style>
