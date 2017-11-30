/**
 * 管理员模块路由配置,
 * meta字段说明:
 *  title: 作为网页标题使用
 *  breadcrumb: 是否显示在面包屑导航上面
 *  disableBreadcrumb: 在面包屑导航上面点击是否会跳转
 */
import layout from '@components/layout'
import secondRouteView from '@components/secondRouteView'
const _import = file => () => import('@views/' + file + '.vue')
export default {
  path: '/permission',
  name: 'permission',
  meta: {
    breadcrumb: false,
    title: '权限管理'
  },
  component: layout,
  children: [
    {
      path: 'administrator',
      name: 'permission.administrator',
      meta: {
        breadcrumb: false,
        title: '管理员'
      },
      component: secondRouteView,
      children: [
        {
          path: 'list/:page(\\d+)?',
          name: 'permission.administrator.list',
          meta: {
            breadcrumb: true,
            title: '管理员列表'
          },
          component: _import('permission/administrator/list')
        },
        {
          path: 'create',
          name: 'permission.administrator.create',
          meta: {
            breadcrumb: true,
            title: '添加管理员'
          },
          component: _import('permission/administrator/create')
        },
        {
          path: 'update/:uuid',
          name: 'permission.administrator.update',
          meta: {
            breadcrumb: true,
            title: '修改管理员'
          },
          component: _import('permission/administrator/update')
        }
      ]
    },
    {
      path: 'group',
      name: 'permission.group',
      meta: {
        breadcrumb: false,
        title: '管理组'
      },
      component: secondRouteView,
      children: [
        {
          path: 'list/:page(\\d+)?',
          name: 'permission.group.list',
          meta: {
            breadcrumb: true,
            title: '管理组列表'
          },
          component: _import('permission/group/list')
        },
        {
          path: 'update/:id(\\d+)',
          name: 'permission.group.update',
          meta: {
            breadcrumb: true,
            title: '修改管理组'
          },
          component: _import('permission/group/update')
        },
        {
          path: 'create',
          name: 'permission.group.create',
          meta: {
            breadcrumb: true,
            title: '添加管理组'
          },
          component: _import('permission/group/create')
        }
      ]
    },
    {
      path: 'rule',
      name: 'permission.rule',
      meta: {
        breadcrumb: false,
        title: '权限'
      },
      component: secondRouteView,
      children: [
        {
          path: 'list/:pid(\\d+)?',
          name: 'permission.rule.list',
          meta: {
            breadcrumb: true,
            title: '权限列表'
          },
          component: _import('permission/rule/list')
        },
        {
          path: 'update/:id(\\d+)',
          name: 'permission.rule.update',
          meta: {
            breadcrumb: true,
            title: '修改权限'
          },
          component: _import('permission/rule/update')
        },
        {
          path: 'create',
          name: 'permission.rule.create',
          meta: {
            breadcrumb: true,
            title: '添加权限'
          },
          component: _import('permission/rule/create')
        }
      ]
    }
  ]
}
