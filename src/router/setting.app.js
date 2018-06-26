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
  path: '/setting/app',
  name: 'setting.app',
  meta: {
    breadcrumb: false,
    title: '应用设置'
  },
  component: layout,
  children: [
    {
      path: 'home',
      name: 'setting.app.home',
      meta: {
        breadcrumb: false,
        title: '应用首页'
      },
      component: secondRouteView,
      children: [
        {
          path: 'slide',
          name: 'setting.app.slide',
          meta: {
            breadcrumb: true,
            title: '应用首页轮播设置'
          },
          component: _import('setting/app/slide')
        },
        {
          path: 'block',
          name: 'setting.app.block',
          meta: {
            breadcrumb: true,
            title: '应用首页功能块设置'
          },
          component: _import('setting/app/block')
        },
        {
          path: 'brand',
          name: 'setting.app.brand',
          meta: {
            breadcrumb: true,
            title: '应用首页品牌'
          },
          component: _import('setting/app/brand')
        }
      ]
    }
  ]
}
