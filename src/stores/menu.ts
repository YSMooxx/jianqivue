import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { computed, ref, toRaw } from 'vue'
import router, { adminRoutes, fontRoute } from '@/routes'
import _ from 'lodash'

export const useMenuStore = defineStore('menu', () => {
  // state
  const opened = ref(Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : false)
  const openKeys = ref([])
  const selectedKeys = ref<string[]>([])
  // 权限判定后的路由列表
  const menuData = ref([])
  // 是否再次加载异步路由(刷新后再次加载)
  const isAsyncRoute = ref(false)

  // getter 后台权限菜单
  const getMenus = computed(() => {
    return [...toRaw(menuData.value)]
  })
  // getter 前台权限菜单
  const getFontMenus = computed(() => {
    return fontRoute[0].children
  })
  // getter 前台全部路由（免路由拦截）
  const getAllFrontMenus = computed(() => {
    return fontRoute[0].children.map((item) => item.path)
  })

  //action
  // 更改侧边栏的伸缩状态
  const toggleSideBar = () => {
    opened.value = !opened.value
    if (opened.value) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  }
  // 添加动态路由
  const addAsyncRoutes = (menus: any[]) => {
    // 获取adminRoutes（页面路由表）
    const localRoutes = _.cloneDeep(adminRoutes)
    // 获取用户具有的权限
    // 对adminRoutes进行权限判定
    const authMenuTree = matchingRoute(menus, localRoutes)
    authMenuTree.push({
      path: '/:pathMatch(.*)',
      name: 'unFind',
      //访问主页的时候 重定向到404页面
      redirect: '/404',
      hidden: true
    })
    // 将最终的路由进行动态添加
    authMenuTree.forEach((item: any) => {
      router.addRoute(item)
    })
    menuData.value = authMenuTree[0].children
  }
  // 给adminRoutes进行权限判定
  const matchingRoute = (menus: any[], localRoutes: any) => {
    let list = [] as any
    localRoutes.forEach((item: any) => {
      if (!item.meta || !item.meta['isPermission'] || isOwnPermission(menus, item.name)) {
        if (item.children) {
          item.children = matchingRoute(menus, item.children)
        }
        list.push(item)
      }
    })
    return list
  }
  // 该路由是否具有权限
  const isOwnPermission = (menus: any[], title: string) => {
    return menus.includes(title)
  }

  return {
    isAsyncRoute,
    opened,
    openKeys,
    selectedKeys,
    getMenus,
    getFontMenus,
    getAllFrontMenus,
    toggleSideBar,
    addAsyncRoutes
  }
})
