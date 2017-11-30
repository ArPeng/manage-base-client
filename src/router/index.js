import Vue from 'vue'
import Router from 'vue-router'
// 权限管理
import permission from './permission'
// 系统设置
import setting from './setting'
// import permission from './permission'
const _import = file => () => import('@views/' + file + '.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    permission,
    setting,
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
      path: '/401',
      name: '401',
      meta: {
        title: '无权限'
      },
      component: _import('errorPage/401')
    },
    {
      path: '*',
      name: '404',
      meta: {
        title: '未找到页面'
      },
      component: _import('errorPage/404')
    }
  ]
})
