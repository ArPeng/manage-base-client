import router from '@router'
// 加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  to.matched.some((record, index, arr) => {
    if (index === arr.length - 1) {
      // 设置网页标题
      document.title = record.name
    }
  })
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
