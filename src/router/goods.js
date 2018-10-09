/**
 * 系统基础数据配置,
 * meta字段说明:
 *  title: 作为网页标题使用
 *  breadcrumb: 是否显示在面包屑导航上面
 *  disableBreadcrumb: 在面包屑导航上面点击是否会跳转
 */
import layout from '@components/layout'
import secondRouteView from '@components/secondRouteView'
const _import = file => () => import('@views/' + file + '.vue')
export default {
  path: '/goods',
  name: 'goods',
  meta: {
    breadcrumb: false,
    title: '商品'
  },
  component: layout,
  children: [
    {
      path: 'manager',
      name: 'goods.manager',
      meta: {
        breadcrumb: false,
        title: '商品管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/99/:page(\\d+)?',
          name: 'goods.manager.items.99',
          meta: {
            breadcrumb: true,
            title: '已上架'
          },
          props: {status: 99},
          component: _import('goods/manager/items')
        },
        {
          path: 'items/2/:page(\\d+)?',
          name: 'goods.manager.items.2',
          meta: {
            breadcrumb: true,
            title: '已下架'
          },
          props: {status: 2},
          component: _import('goods/manager/items')
        },
        {
          path: 'items/1/:page(\\d+)?',
          name: 'goods.manager.items.1',
          meta: {
            breadcrumb: true,
            title: '草稿箱'
          },
          props: {status: 1},
          component: _import('goods/manager/items')
        },
        {
          path: 'items/3/:page(\\d+)?',
          name: 'goods.manager.items.3',
          meta: {
            breadcrumb: true,
            title: '回收站'
          },
          props: {status: 3},
          component: _import('goods/manager/items')
        },
        {
          path: 'create',
          name: 'goods.manager.create',
          meta: {
            breadcrumb: true,
            title: '添加商品'
          },
          component: _import('goods/manager/create')
        },
        {
          path: 'edit/:id',
          name: 'goods.manager.edit',
          meta: {
            breadcrumb: true,
            title: '编辑商品'
          },
          component: _import('goods/manager/edit')
        }
      ]
    }
  ]
}
