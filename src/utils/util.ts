import useStore from '@/stores'

/**
 * 动态设置网站title
 */
export const getPageTitle = (title: string) => {
  const { settingStore } = useStore()
  const pageTitle = settingStore.title
  if (title) {
    return `${pageTitle} - ${title}`
  }
  return `${pageTitle}`
}

/**
 * 手机号验证
 * @param rule
 * @param value
 * @returns {Promise<never>|Promise<void>}
 */
export const phoneRegExp = (rule: any, value: string) => {
  // 手机号
  const reg = /^((13|14|15|16|17|18|19)[0-9]\d{8})$/
  if (!value) {
    return Promise.reject('手机号不能为空')
  } else if (!reg.test(value)) {
    return Promise.reject('手机号格式错误')
  } else {
    return Promise.resolve()
  }
}
/**
 * 银行卡号验证
 * @param rule
 * @param value
 * @returns {Promise<never>|Promise<void>}
 */
export const bankAccountRegExp = (rule: any, value: string) => {
  const reg = /^\d{9,30}$/
  if (!value) {
    return Promise.reject('银行卡不能为空')
  } else if (!reg.test(value)) {
    return Promise.reject('银行卡格式错误')
  } else {
    return Promise.resolve()
  }
}
/**
 * 身份证号验证
 * @param rule
 * @param value
 * @returns {Promise<never>|Promise<void>}
 */
export const idCardRegExp = (rule: any, value: string) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/
  if (value === '' || value === null) {
    return Promise.reject('身份证号不能为空')
  } else if (!reg.test(value)) {
    return Promise.reject('身份证号格式错误')
  } else {
    return Promise.resolve()
  }
}
/**
 * 密码验证规则
 * @param rule   (?=\S*)
 * @param value
 */
export const passwordRegExp = (rule: any, value: string) => {
  const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)(?![!@#$%^&*?]+$)[a-zA-Z0-9!@#$%^&*?]{8,18}$/
  if (!value) {
    return Promise.reject('密码不能为空')
  } else if (!reg.test(value)) {
    return Promise.reject('密码为8-18位字母/数字/符号组成，至少两种组合')
  } else {
    return Promise.resolve()
  }
}
