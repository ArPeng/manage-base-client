/**
 * 订单模块路由,
 * meta字段说明:
 *  title: 作为网页标题使用
 *  breadcrumb: 是否显示在面包屑导航上面
 *  disableBreadcrumb: 在面包屑导航上面点击是否会跳转
 */
import layout from '@components/layout'
import secondRouteView from '@components/secondRouteView'
const _import = file => () => import('@views/' + file + '.vue')
export default {
  path: '/order',
  name: 'order',
  meta: {
    breadcrumb: false,
    title: '订单管理'
  },
  component: layout,
  children: [
    {
      path: 'manager',
      name: 'order.manager',
      meta: {
        breadcrumb: false,
        title: '订单管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/1/:page(\\d+)?',
          name: 'order.manager.items.1',
          meta: {
            breadcrumb: true,
            title: '待付款'
          },
          props: {status: 1},
          component: _import('order/manager/items')
        },
        {
          path: 'items/2/:page(\\d+)?',
          name: 'order.manager.items.2',
          meta: {
            breadcrumb: true,
            title: '待发货'
          },
          props: {status: 2},
          component: _import('order/manager/items')
        },
        {
          path: 'items/3/:page(\\d+)?',
          name: 'order.manager.items.3',
          meta: {
            breadcrumb: true,
            title: '待收货'
          },
          props: {status: 3},
          component: _import('order/manager/items')
        },
        {
          path: 'items/4/:page(\\d+)?',
          name: 'order.manager.items.4',
          meta: {
            breadcrumb: true,
            title: '已取消'
          },
          props: {status: 4},
          component: _import('order/manager/items')
        },
        {
          path: 'items/5/:page(\\d+)?',
          name: 'order.manager.items.5',
          meta: {
            breadcrumb: true,
            title: '已删除'
          },
          props: {status: 5},
          component: _import('order/manager/items')
        },
        {
          path: 'items/6/:page(\\d+)?',
          name: 'order.manager.items.6',
          meta: {
            breadcrumb: true,
            title: '交易关闭'
          },
          props: {status: 6},
          component: _import('order/manager/items')
        },
        {
          path: 'items/7/:page(\\d+)?',
          name: 'order.manager.items.7',
          meta: {
            breadcrumb: true,
            title: '交易完成'
          },
          props: {status: 7},
          component: _import('order/manager/items')
        },
        {
          path: 'items/99/:page(\\d+)?',
          name: 'order.manager.items.99',
          meta: {
            breadcrumb: true,
            title: '全部订单'
          },
          props: {status: 99},
          component: _import('order/manager/items')
        }
      ]
    }
  ]
}
