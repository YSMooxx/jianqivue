import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeCache() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (let i = keys.length; i--; )
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
  localStorage.clear()
}
