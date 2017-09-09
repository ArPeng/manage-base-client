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
      redirect: '/dashboard',
      component: layout,
      children: [
        {
          path: 'administrator',
          name: '管理员',
          component: _import('administrator/index')
        }
      ]
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
    },
    {
      path: '*',
      name: '404',
      component: _import('errorPage/404')
    }
  ]
})
