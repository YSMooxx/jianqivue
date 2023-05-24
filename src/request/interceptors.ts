import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { storeToRefs } from 'pinia'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/es/notification/style/css'
import Cookies from 'js-cookie'
import { useUserStore } from '@/stores/user'

// 请求拦截器
export const requestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    function (config: any) {
      CancelToken.addRequest(config)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
}

type ResponseType<T = any> = {
  code?: string
  msg?: string
  data?: T
}

// 响应拦截器
export const responseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    function (response: AxiosResponse<ResponseType>) {
      const key: string = CancelToken.getKey(response.config)
      CancelToken.cencelRequest(key)
      if (response?.data?.code === '200') {
        return Promise.resolve(response.data)
      }
      businessStatus(response)
      return Promise.reject(response.data)
    },
    function (error) {
      if (error?.code === 'ERR_NETWORK') {
        notification.error({ message: '提示', description: '网络错误，请检查网络' })
      }
      if (error?.code === 'ECONNABORTED') {
        notification.error({ message: '提示', description: '请求超时' })
      }
      if (error?.code === 'ERR_CANCELED') {
        console.warn(`${error.message}请求已取消`)
      }
      if (error.response?.status) {
        browserStatus(error.response, error.config)
      }
      return Promise.reject(error)
    }
  )
}

// 业务状态处理
const businessStatus = (response: any) => {
  const whiteCodeList = [2007, 2006] // code白名单（不弹窗提示）
  if (whiteCodeList.includes(Number(response.data.code))) return
  if (response.data.code === '2013') {
    notification.error({ message: '提示', description: response.data.msg })
    Cookies.remove('JSESSIONID')
    const { loginVisible } = storeToRefs(useUserStore())
    loginVisible.value = true
  }
  response.data.msg && notification.error({ message: '提示', description: response.data.msg })
}

// 浏览器状态处理
const browserStatus = (response: any, config: any) => {
  switch (response.status) {
    // 未登录
    case 401:
      notification.error({ message: '提示', description: '用户未登录' })
      break

    // 登录过期
    case 403:
      notification.error({ message: '提示', description: '登录状态已过期' })
      break

    //资源不存在
    case 404:
      notification.error({ message: '提示', description: `${config.url} 资源不存在` })
      break

    // 服务端错误
    case 500:
      notification.error({ message: '提示', description: '服务端错误' })
      break

    // 其他status
    default:
      notification.error({ message: '提示', description: '网络错误，请刷新后再试' })
      break
  }
}

// 取消请求
export class CancelToken {
  // 存储每个请求的标识
  static requestList = new Map()

  // 白名单（不进行取消请求） 请求方式-接口（例如：get-/menus）
  static whiteList: Array<string> = []

  // 获取key
  static getKey(config: AxiosRequestConfig): string {
    return `${config.method}-${config.url}`
  }

  // 验证接口是否被加入白名单
  static verifyWhiteList(config: AxiosRequestConfig): boolean {
    const key: string = this.getKey(config)
    return this.whiteList.includes(key)
  }

  // 添加请求
  static addRequest(config: AxiosRequestConfig) {
    const key: string = this.getKey(config)
    config.cancelToken = new axios.CancelToken((cancel) => {
      // 若请求已存在（请求中）则取消上一次的请求
      if (this.requestList.has(key)) {
        // cancel(key) // 取消当前请求
        this.cencelRequest(key) // 取消上一次请求
      } else if (!this.requestList.has(key) && !this.verifyWhiteList(config)) {
        // 请求不存在并且不在白名单
        this.requestList.set(key, cancel)
      }
    })
  }

  // 取消单个请求
  static cencelRequest(key: string) {
    if (this.requestList.has(key)) {
      // 取消请求
      this.requestList.get(key)(key)
      // 删除当前请求
      this.requestList.delete(key)
    }
  }

  // 取消全部请求
  static cencelAllRequest() {
    // 遍历请求列表 全部取消
    for (const [url, cancel] of this.requestList) {
      cancel(url)
    }
    this.requestList.clear()
  }
}
