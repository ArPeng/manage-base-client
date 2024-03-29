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
  path: '/basic',
  name: 'basic',
  meta: {
    breadcrumb: false,
    title: '系统基础数据配置'
  },
  component: layout,
  children: [
    {
      path: 'category',
      name: 'basic.category',
      meta: {
        breadcrumb: false,
        title: '商品分类'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/:pid(\\d+)?',
          name: 'basic.category.items',
          meta: {
            breadcrumb: true,
            title: '分类列表'
          },
          component: _import('basic/category/items')
        },
        {
          path: 'create/:pid(\\d+)?',
          name: 'basic.category.create',
          meta: {
            breadcrumb: true,
            title: '添加分类'
          },
          component: _import('basic/category/create')
        },
        {
          path: 'edit/:id',
          name: 'basic.category.edit',
          meta: {
            breadcrumb: true,
            title: '编辑分类'
          },
          component: _import('basic/category/edit')
        }
      ]
    },
    {
      path: 'attribute',
      name: 'basic.attribute',
      meta: {
        breadcrumb: false,
        title: '商品属性'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items',
          name: 'basic.attribute.items',
          meta: {
            breadcrumb: true,
            title: '属性列表'
          },
          component: _import('basic/attribute/items')
        }
      ]
    },
    {
      path: 'brand',
      name: 'basic.brand',
      meta: {
        breadcrumb: false,
        title: '品牌管理'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/:page(\\d+)?',
          name: 'basic.brand.items',
          meta: {
            breadcrumb: true,
            title: '品牌列表'
          },
          component: _import('basic/brand/items')
        },
        {
          path: 'edit/:id(\\d+)',
          name: 'basic.brand.edit',
          meta: {
            breadcrumb: true,
            title: '编辑品牌'
          },
          component: _import('basic/brand/edit')
        },
        {
          path: 'create',
          name: 'basic.brand.create',
          meta: {
            breadcrumb: true,
            title: '新增品牌'
          },
          component: _import('basic/brand/create')
        }
      ]
    },
    {
      path: 'express',
      name: 'basic.express',
      meta: {
        breadcrumb: false,
        title: '快递公司'
      },
      component: secondRouteView,
      children: [
        {
          path: 'items/:page(\\d+)?',
          name: 'basic.express.items',
          meta: {
            breadcrumb: true,
            title: '列表'
          },
          component: _import('basic/express/items')
        }
      ]
    }
  ]
}
