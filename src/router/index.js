import Vue from 'vue'
import Router from 'vue-router'
// 权限管理
import permission from './permission'
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
    permission
  ]
})
