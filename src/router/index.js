import Vue from 'vue'
import Router from 'vue-router'
import layout from '@components/layout'
// import permission from './permission'
const _import = file => () => import('@views/' + file + '.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: {
        title: '控制台'
      },
      component: _import('dashboard/index')
    },
    {
      path: '/sign_in',
      name: 'signIn',
      meta: {
        title: '登录'
      },
      component: _import('sign/signIn')
    },
    {
      path: '/permission',
      name: 'permission',
      meta: {
        title: '权限管理'
      },
      component: layout,
      // redirect: '/permission/administrator/list',
      children: [
        {
          path: 'administrator',
          name: 'permission.administrator.list',
          redirect: '/permission/administrator/list',
          component: _import('permission/administrator/list')
        }
      ]
    }
  ]
})
