import { defineStore, storeToRefs } from 'pinia'
import { getToken, removeCache, setToken } from '@/utils/auth'
import { ref } from 'vue'
import { resetRouter } from '@/routes'
import { profile, userLogin } from '@/servers/global.api'
import useStore from '@/stores'

export const useUserStore = defineStore(
  'user',
  () => {
    const { menuStore } = useStore()
    const { addAsyncRoutes } = menuStore
    // state
    const token = ref(getToken())
    // 用户信息
    const userInfo = ref<any>(null)
    const avatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    // 是否显示登录
    const loginVisible = ref(false)
    // 登录后重定向url
    const redirectUrl = ref('')
    // action
    //调用登录接口
    const login = (loginInfo: any) => {
      return new Promise((resolve, reject) => {
        userLogin(loginInfo)
          .then((res) => {
            //存token
            setToken(res.data.jwt)
            userInfo.value = res.data
            resolve(res)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
    // 查询用户信息
    const getUserRoles = async () => {
      return new Promise((resolve, reject) => {
        profile({ id: userInfo.value.id })
          .then((res) => {
            userInfo.value = res.data
            addAsyncRoutes(userInfo.value.roles.menus)
            resolve(res.data)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
    // 退出登录
    const logout = () => {
      return new Promise((resolve) => {
        // 清空、重置相关数据
        removeCache()
        resetRouter()
        resetStore()
        resolve('1')
      })
    }
    // 重置 pinia 的全部 state
    const resetStore = () => {
      const storeObj = useStore()
      const storeKeyList = Object.keys(storeObj)
      storeKeyList.forEach((item) => {
        // @ts-ignore
        storeObj[item].$reset()
      })
    }

    return { token, userInfo, avatar, loginVisible, redirectUrl, login, getUserRoles, logout }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
)
