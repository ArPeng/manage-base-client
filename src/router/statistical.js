/**
 * 财务模块,
 * meta字段说明:
 *  title: 作为网页标题使用
 *  breadcrumb: 是否显示在面包屑导航上面
 *  disableBreadcrumb: 在面包屑导航上面点击是否会跳转
 */
import layout from '@components/layout'
import secondRouteView from '@components/secondRouteView'
const _import = file => () => import('@views/' + file + '.vue')
export default {
  path: '/statistical',
  name: 'statistical',
  meta: {
    breadcrumb: false,
    title: '统计'
  },
  component: layout,
  children: [
    {
      path: 'member',
      name: 'statistical.member',
      meta: {
        breadcrumb: false,
        title: '用户统计'
      },
      component: secondRouteView,
      children: [
        {
          path: 'register',
          name: 'statistical.member.register',
          props: {status: 1},
          meta: {
            breadcrumb: true,
            title: '注册'
          },
          component: _import('statistical/member')
        }
      ]
    }
  ]
}
