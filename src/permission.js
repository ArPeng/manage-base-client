/**
 * 权限检测
 */
import router from '@router'
// 加载进度条
import Store from '@store'
import NProgress from 'nprogress'
import WhiteList from '@config/white-list'
import Vue from 'vue'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  to.matched.some((record, index, arr) => {
    if (index === arr.length - 1) {
      document.title = record.meta.title ? record.meta.title : record.name
      let $vue = new Vue()
      let token = $vue.getToken()
      // 路由不在白名单且没有token
      if (!$vue.inArray(record.name, WhiteList) &&
        !token) {
        $vue.$utils.toast('请登陆!')
        next('/sign_in')
      } else if (!$vue.inArray(record.name, WhiteList) &&
        token) {
        let loading = setTimeout(() => {
          $vue.$utils.loading()
        }, 100)
        $vue
          .$api
          .sign
          .verificationToken()
          .then(r => {
            clearTimeout(loading)
            if (r.status === 10000) {
              if (r.info.status === 1) {
                // 缓存用户信息
                Store.dispatch('setUserInfo', r.info)
                next()
              } else {
                $vue.$utils.toast($vue.$lang('你账号已被禁用,请联系管理员!'))
                next('/sign_in')
              }
            }
            if (r.status === 10003) {
              $vue.$utils.toast($vue.$lang('登录已过期,请重新登录!'))
              next('/sign_in')
            }
            if (r.status === 10004) {
              $vue.$utils.toast('请登陆!')
              next('/sign_in')
            }
          })
      } else if ($vue.inArray(record.name, WhiteList)) {
        next()
      }
    }
  })
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
