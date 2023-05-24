import axios from '@/request'

export const userLogin = (data: any) => {
  return axios({
    url: 'https://www.fastmock.site/mock/64f237e2c70ee37283fd8aebaf65d820/api/login',
    data,
    method: 'POST'
  })
}

export const profile = (params: any) => {
  return axios({
    url: 'https://www.fastmock.site/mock/64f237e2c70ee37283fd8aebaf65d820/api/getUserInfo',
    params,
    method: 'get'
  })
}
