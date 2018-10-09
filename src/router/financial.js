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
  path: '/financial',
  name: 'financial',
  meta: {
    breadcrumb: false,
    title: '财务管理'
  },
  component: layout,
  children: [
    {
      path: 'withdraw',
      name: 'financial.withdraw',
      meta: {
        breadcrumb: false,
        title: '提现管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/1/:page(\\d+)?',
          name: 'financial.withdraw.items_1',
          props: {status: 1},
          meta: {
            breadcrumb: true,
            title: '待处理'
          },
          component: _import('financial/withdraw/items')
        },
        {
          path: 'items/2/:page(\\d+)?',
          name: 'financial.withdraw.items_2',
          props: {status: 2},
          meta: {
            breadcrumb: true,
            title: '提现成功'
          },
          component: _import('financial/withdraw/items')
        },
        {
          path: 'items/3/:page(\\d+)?',
          name: 'financial.withdraw.items_3',
          props: {status: 3},
          meta: {
            breadcrumb: true,
            title: '提现失败'
          },
          component: _import('financial/withdraw/items')
        }
      ]
    },
    {
      path: 'refund',
      name: 'financial.refund',
      meta: {
        breadcrumb: false,
        title: '退款管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/1/:page(\\d+)?',
          name: 'financial.refund.items.1',
          props: {status: 1},
          meta: {
            breadcrumb: true,
            title: '待处理'
          },
          component: _import('financial/refund/items')
        },
        {
          path: 'items/2/:page(\\d+)?',
          name: 'financial.refund.items.2',
          props: {status: 2},
          meta: {
            breadcrumb: true,
            title: '退款中'
          },
          component: _import('financial/refund/items')
        },
        {
          path: 'items/3/:page(\\d+)?',
          name: 'financial.refund.items.3',
          props: {status: 3},
          meta: {
            breadcrumb: true,
            title: '退款成功'
          },
          component: _import('financial/refund/items')
        },
        {
          path: 'items/4/:page(\\d+)?',
          name: 'financial.refund.items.4',
          props: {status: 4},
          meta: {
            breadcrumb: true,
            title: '申请被拒绝'
          },
          component: _import('financial/refund/items')
        }
      ]
    }
  ]
}
