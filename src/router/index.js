import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import layout from '@views/layout/layout.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: layout
    },
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
