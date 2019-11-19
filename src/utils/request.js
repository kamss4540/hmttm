import axios from 'axios'
// 引入 store
import store from '../store'

let instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 获取用户登录信息
  let user = store.state.user
  // 如果登录了,就在请求头中添加 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data.data
}, async function (error) {
  // 对响应错误做点什么
  let user = store.state.user
  if (error.response.status === 401) {
    let res = await refreshToken({
      baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.refresh_token}`
      }
    })
    user.token = res.data.data.token
    store.commit('setuser', user)
    return instance(error.config)
  }
  return Promise.reject(error)
})

let refreshToken = axios.create()

export default instance
