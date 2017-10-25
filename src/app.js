// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.productionTip = false
import App from '@views/App'
import router from '@router'
import Mixins from '@mixins'
Vue.mixin(Mixins)
/* 引入muse-ui组件 */
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUi)
// 导入接口api
import Api from '@api/plugin'
Vue.use(Api)
// 加载store
import store from '@store'
// 加载animate.css
// import 'vue2-animate/dist/vue2-animate.min.css'
// 加载公共css
import '@styl/common'
// 加载工具插件
// import Tool from '@utils/tools'
// Vue.use(Tool)
// 加载material-design-icons
// 自定义指令
import './directives'
// 权限检测
import './permission'
// 导入公共组件
import '@components'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
