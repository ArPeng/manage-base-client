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
          name: 'setting.app.home.slide',
          meta: {
            breadcrumb: true,
            title: '应用首页轮播设置'
          },
          component: _import('setting/app/home/slide')
        },
        {
          path: 'block',
          name: 'setting.app.home.block',
          meta: {
            breadcrumb: true,
            title: '应用首页功能块设置'
          },
          component: _import('setting/app/home/block')
        },
        {
          path: 'brand',
          name: 'setting.app.home.brand',
          meta: {
            breadcrumb: true,
            title: '应用首页品牌'
          },
          component: _import('setting/app/home/brand')
        }
      ]
    },
    {
      path: 'ratio',
      name: 'setting.app.ratio',
      meta: {
        breadcrumb: false,
        title: '分成比例设置'
      },
      component: secondRouteView,
      children: [
        {
          path: 'member',
          name: 'setting.app.ratio.index',
          meta: {
            breadcrumb: true,
            title: '分成比例设置'
          },
          component: _import('setting/app/ratio/index')
        }
      ]
    },
    {
      path: 'agent',
      name: 'setting.app.agetn',
      meta: {
        breadcrumb: false,
        title: '代理商设置'
      },
      component: secondRouteView,
      children: [
        {
          path: 'upgrade',
          name: 'setting.app.agent.upgrade',
          meta: {
            breadcrumb: true,
            title: '升级配置'
          },
          component: _import('setting/app/agent/index')
        }
      ]
    }
  ]
}
