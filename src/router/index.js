import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: '控制面板',
      component: _import('dashboard/index')
    },
    {
      path: '/sign_in',
      name: '登录',
      component: _import('sign/signIn')
    }
  ]
})
