// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@views/App'
import router from '@router'
// import element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自定义指令
import '@directive'
import Mixins from '@mixins'
// 加载store
import store from '@store'
// import common.sass
import '@sass/common'
// 导入接口api
import Api from '@api/plugin'
// 导入权限验证
import '@/auth'
Vue.use(Api)
Vue.mixin(Mixins)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
