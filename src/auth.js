/**
 * 权限以及登录验证
 */
import Vue from 'vue'
import router from '@router'
import WhiteList from '@config/whiteList'
import Store from '@store'
let isLoading = null
/**
 * 全局路由前置钩子
 */
router.beforeEach((to, from, next) => {
  const $vue = new Vue()
  to.matched.some((match, idx) => {
    if ((to.matched.length - 1) === idx) {
      // 设置网页标题
      document.title = match.meta.title ? match.meta.title : match.name
      let token = $vue.getToken()
      // // 过滤免登录白名单 todo 过滤白名单移动到后端验证之后,临时解决白名单内的路由获取不到用户信息
      if ($vue.inArray(match.name, WhiteList)) {
        next()
      } else {
        if (!token) {
          // 本地token不存在,直接跳转到登录界面
          $vue.$message($vue.$lang('请登录'))
          next({
            name: 'signIn'
          })
        } else {
          _auth(match, next)
        }
      }
    }
  })
})

/**
 * 全局路由后置钩子
 */
router.afterEach((to, from) => {
  if (isLoading) {
    const $vue = new Vue()
    clearTimeout(isLoading)
    $vue.closeLoading()
  }
})
/**
 * todo 目前只验证登录,此处应该要验证权限
 * @param match
 * @param next
 * @private
 */
let _auth = (match, next) => {
  const $vue = new Vue()
  isLoading = setTimeout(() => {
    $vue.showLoading()
  }, 4000)
  // 发送验证请求
  $vue
    .$api
    .sign
    .verification(match.name)
    .then(r => {
      clearTimeout(isLoading)
      $vue.closeLoading()
      // todo 暂时在这个地方判断白名单
      if ($vue.inArray(match.name, WhiteList)) {
        Store.dispatch('setUserInfo', r.info)
        next()
      } else {
        // 权限不足
        if (r.status === 10011) {
          $vue.$message.error('权限不足,访问被拒绝!')
          next({
            name: '401'
          })
          return false
        }
        if (r.status === 10004) {
          $vue.$message.error('未找到令牌(Token)!')
          next({
            name: 'signIn'
          })
          return false
        }
        if (r.status === 10005) {
          $vue.$message.error('登录已过期!')
          next({
            name: 'signIn'
          })
          return false
        }
        if (r.info.status === 2) {
          $vue.$message.error('您的账号已被禁用,请联系管理员!')
          next({
            name: 'signIn'
          })
          return false
        }

        Store.dispatch('setUserInfo', r.info)
        next()
      }
    })
    .catch(e => {
      clearTimeout(isLoading)
      $vue.closeLoading()
      throw new Error(e)
    })
}
