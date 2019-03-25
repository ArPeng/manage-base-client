/**
 * 视频管理模块,
 * meta字段说明:
 *  title: 作为网页标题使用
 *  breadcrumb: 是否显示在面包屑导航上面
 *  disableBreadcrumb: 在面包屑导航上面点击是否会跳转
 */
import layout from '@components/layout'
import secondRouteView from '@components/secondRouteView'
const _import = file => () => import('@views/' + file + '.vue')
export default {
  path: '/video',
  name: 'video',
  meta: {
    breadcrumb: false,
    title: '视频管理'
  },
  component: layout,
  children: [
    {
      path: '/video/action',
      name: 'video.action',
      meta: {
        breadcrumb: false,
        title: ''
      },
      component: secondRouteView,
      children: [
        {
          path: '/video/action/upload',
          name: 'video.action.upload',
          meta: {
            breadcrumb: true,
            title: '视频上传'
          },
          component: _import('video/upload/index')
        },
        {
          path: '/video/action/transcoding',
          name: 'video.action.transcoding',
          meta: {
            breadcrumb: true,
            title: '视频转码'
          },
          component: _import('video/transcoding/index')
        }
      ]
    },
    {
      path: '/video/management',
      name: 'video.management',
      meta: {
        breadcrumb: false,
        title: ''
      },
      component: secondRouteView,
      children: [
        {
          path: '/video/management/items/1',
          name: 'video.management.items.1',
          props: {status: 1},
          meta: {
            breadcrumb: true,
            title: '已上架'
          },
          component: _import('video/management/items')
        },
        {
          path: '/video/management/items/99',
          name: 'video.management.items.99',
          props: {status: 99},
          meta: {
            breadcrumb: true,
            title: '待上架'
          },
          component: _import('video/management/items')
        }
      ]
    }
  ]
}
