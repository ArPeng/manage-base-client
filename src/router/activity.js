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
  path: '/activity',
  name: 'activity',
  meta: {
    breadcrumb: false,
    title: '活动管理'
  },
  component: layout,
  children: [
    {
      path: 'new/product',
      name: 'activity.new.product',
      meta: {
        breadcrumb: false,
        title: '新品管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/:page(\\d+)?',
          name: 'activity.new.product.items',
          meta: {
            breadcrumb: true,
            title: '新品列表'
          },
          component: _import('activity/newProduct/items')
        }
      ]
    },
    {
      path: 'special.offer',
      name: 'activity.special.offer',
      meta: {
        breadcrumb: false,
        title: '特价管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/:page(\\d+)?',
          name: 'activity.special.offer.items',
          meta: {
            breadcrumb: true,
            title: '特价列表'
          },
          component: _import('activity/specialOffer/items')
        }
      ]
    }
  ]
}
