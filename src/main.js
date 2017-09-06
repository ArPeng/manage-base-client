// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.productionTip = false
import App from '@views/App'
import router from './router'
/* 引入muse-ui组件 */
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUi)
// 加载多语言处理插件
import Language from '@utils/language'
Vue.use(Language)
// 加载公共css
import '@styl/common.styl'
// 加载工具插件
// import Tool from '@utils/tools'
// Vue.use(Tool)
// 加载material-design-icons
import './permission'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
