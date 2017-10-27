import Vue from 'vue'
import Router from 'vue-router'
const _import = file => () => import('@/views/' + file + '.vue')
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
          name: 'administrator',
          component: view,
          meta: {
            title: '管理员'
          },
          children: [
            {
              path: '',
              name: 'administrator.list',
              meta: {
                title: '管理员列表'
              },
              component: _import('administrator/index')
            },
            {
              path: 'group',
              name: 'administrator.group',
              meta: {
                title: '管理组'
              },
              component: _import('administrator/group')
            },
            {
              path: 'rule',
              name: 'administrator.rule',
              meta: {
                title: '权限'
              },
              component: _import('administrator/rule')
            }
          ]
        }
      ]
    },
    {
      path: '/dashboard',
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
      path: '*',
      name: '404',
      meta: {
        title: '404'
      },
      component: _import('errorPage/404')
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '测试'
      },
      component: _import('test')
    }
  ]
})
