import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import layout from '@views/layout/layout.vue'
import view from '@views/layout/view.vue'
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
          component: view,
          children: [
            {
              path: '',
              name: '管理员',
              component: _import('administrator/index')
            },
            {
              path: 'group',
              name: '管理组',
              component: _import('administrator/group')
            },
            {
              path: 'rule',
              name: '管理组',
              component: _import('administrator/rule')
            }
          ]
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
    },
    {
      path: '/test',
      name: 'test',
      component: _import('test')
    }
  ]
})
