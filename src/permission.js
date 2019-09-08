import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开启进度条
  // 去的地址如果以/home为起始 就判断有没有带token
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 放行
      next()
    } else {
      // 没有的话跳转
      next('/login')
    }
  } else {
    // 如果没有以/home 可以认为你是安全的 不需要控制页面
    next()
  }
})
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})

export default router
