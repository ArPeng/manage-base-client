/**
 * 系统设置路由模块,
 * meta字段说明:
 *  title: 作为网页标题使用
 *  breadcrumb: 是否显示在面包屑导航上面
 */
import layout from '@components/layout'
import secondRouteView from '@components/secondRouteView'
const _import = file => () => import('@views/' + file + '.vue')
export default {
  path: '/setting',
  name: 'setting',
  meta: {
    breadcrumb: false,
    title: '系统设置'
  },
  component: layout,
  children: [
    {
      path: 'rules',
      name: '权限相关',
      meta: {
        breadcrumb: false,
        title: ''
      },
      component: secondRouteView,
      children: [
        {
          path: 'rule_white_list',
          name: 'setting.rules.white_list',
          meta: {
            breadcrumb: true,
            title: '路由白名单'
          },
          component: _import('setting/ruleWhiteList')
        }
      ]
    }
  ]
}
