import useStore from '@/stores'
import { storeToRefs } from 'pinia'

/**
 * 登录状态
 */
export const useLogin = (redirect = '') => {
  return new Promise((resolve, reject) => {
    const { userStore } = useStore()
    const { userInfo, loginVisible, redirectUrl } = storeToRefs(userStore)
    if (!!userInfo.value) {
      resolve(true)
    } else {
      loginVisible.value = true
      redirectUrl.value = redirect
      reject(false)
    }
  })
}
