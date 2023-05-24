import { createRouter, createWebHistory } from 'vue-router'
/* 默认路由信息 */
const NoFindPage = () => import('@/pages/404.vue')
/* Layout 布局 */
const AdminLayout = () => import('@/layout/AdminLayout.vue')
const FrontLayout = () => import('@/layout/FrontLayout.vue')
/**
 * 后台路由信息
 */
const LoginAdmin = () => import('@/pages/admin/login/LoginPage.vue')
const Dashboard = () => import('@/pages/admin/dashboard/HomePage.vue')
const AccountManage = () => import('@/pages/admin/systemManage/accountManage.vue')
const MenuManage = () => import('@/pages/admin/systemManage/menuManage.vue')
const RoleManage = () => import('@/pages/admin/systemManage/roleManage.vue')
/**
 * 前台路由信息
 */
const HomePage = () => import('@/pages/front/homePage/homePage.vue')
const QuaLibrary = () => import('@/pages/front/quaLibrary/quaLibrary.vue')
const Material = () => import('@/pages/front/material/material.vue')
const UserCenter = () => import('@/pages/front/userCenter/userCenter.vue')
/**
 * route上设置的属性说明
 *
 * alwaysShow: false              单菜单项是否显示根节点(默认不显示)，默认false: 当children长度大于1时显示，否则不显示
 * path:'router-path'             用于路由跳转，必须
 * name:'router-name'             设置<keep-alive>缓存状态，必须
 * meta : {
    title: 'title'                菜单和面包屑导航的展示标题
    icon:  antd-icon              菜单图标
    isPermission: false,          是否进行权限判定：默认值:false，false: 免权限判定
    hidden: true                  默认值:false，如果设为true则不在菜单栏显示
    alive: false                  用于开启缓存 false: 不缓存
  }
 */

/**
 * 后台动态路由信息
 */
export const adminRoutes = [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/dashboard',
    component: AdminLayout,
    children: [
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          icon: 'DashboardOutlined'
        }
      },
      {
        path: '/admin/authManage',
        name: 'authManage',
        meta: {
          title: '权限管理',
          isPermission: true // 二级全部设置权限，一级也必须设置
        },
        children: [
          {
            path: '/admin/accountManage',
            name: 'accountManage',
            meta: {
              title: '用户管理',
              isPermission: true
            },
            component: AccountManage
          },
          {
            path: '/admin/menuManage',
            name: 'menuManage',
            meta: {
              title: '菜单管理',
              isPermission: true
            },
            component: MenuManage
          },
          {
            path: '/admin/roleManage',
            name: 'roleManage',
            meta: {
              title: '角色管理',
              isPermission: true
            },
            component: RoleManage
          }
        ]
      }
    ]
  }
]
/**
 * 前端静态路由
 */
export const fontRoute = [
  {
    path: '/front',
    name: 'front',
    component: FrontLayout,
    redirect: '/front/homePage',
    children: [
      {
        path: '/front/homePage',
        name: 'homePage',
        meta: {
          title: '首页'
        },
        component: HomePage
      },
      {
        path: '/front/quaLibrary',
        name: 'quaLibrary',
        meta: {
          title: '资质文库'
        },
        component: QuaLibrary
      },
      {
        path: '/front/material',
        name: 'material',
        meta: {
          title: '材料整理'
        },
        component: Material
      },
      {
        path: '/front/userCenter',
        name: 'userCenter',
        meta: {
          title: '个人中心',
          hidden: true
        },
        component: UserCenter
      }
    ]
  }
]
/**
 * 默认路由信息
 */
const staticRoutes = [
  {
    path: '/404',
    component: NoFindPage
  },
  {
    path: '/admin/login',
    name: 'loginAdmin',
    component: LoginAdmin,
    meta: {
      title: '后台登录',
      hidden: true
    }
  }
  /*{
    path: '/:pathMatch(.*)',
    name: 'unFind',
    //访问主页的时候 重定向到404页面
    redirect: '/404',
    hidden: true
  }*/
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...fontRoute, ...staticRoutes]
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...fontRoute, ...staticRoutes]
  })
  // @ts-ignore
  router.matcher = newRouter.matcher // reset router
}

export default router
