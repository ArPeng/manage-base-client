import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Sign模块
// 后台首页
import SignIndex from '@modules/sign/index'
// 登录页
import SignIn from '@modules/sign/sign_in'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sign_index',
      component: SignIndex
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn
    }
  ]
})
