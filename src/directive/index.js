/**
 * 全局指令注册钩子
 */
import Vue from 'vue'
import waves from './waves'
Vue.directive('waves', waves)

// 滚动事件,加载更多
Vue.directive('scroll', {
  bind: (el, binding, vnode) => {
    let eventAction = true
    let distance = 100
    el.onscroll = (e) => {
      // 获取可滚动的高度
      let scrollHeight = e.target.scrollHeight - e.target.offsetHeight
      // 获取事件执行区域
      let eventArea = scrollHeight - e.target.scrollTop
      if (
        typeof binding.value === 'function' &&
        eventArea < distance &&
        eventAction
      ) {
        eventAction = false
        binding.value()
      } else if (eventArea > distance) {
        eventAction = true
      }
    }
  }
})
