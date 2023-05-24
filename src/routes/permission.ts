import router from '@/routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { storeToRefs } from 'pinia'
import { getToken } from '@/utils/auth'
import useStore from '@/stores'
import { getPageTitle } from '@/utils/util'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach(async (to, from, next) => {
  // 设置网站title
  document.title = getPageTitle(to.meta.title as string)
  NProgress.start()
  const { menuStore, userStore } = useStore()
  const { isAsyncRoute, getAllFrontMenus } = storeToRefs(menuStore)
  const hasToken = getToken()
  const whiteList: string | string[] = ['/admin/login', '/404', ...getAllFrontMenus.value] // 路由白名单
  // 路由拦截部分
  if (hasToken) {
    // 判断token
    // 全局唯一状态，除了刷新 否则只改变一次
    if (!isAsyncRoute.value) {
      isAsyncRoute.value = true
      await userStore.getUserRoles()
      next({ ...to, replace: true }) //解决刷新空白页
    } else {
      next()
      NProgress.done()
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else if (to.path.includes('/admin')) {
      next(`/admin/login?redirect=${to.path}`)
      NProgress.done()
    } else {
      next('/404')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
