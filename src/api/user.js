// 用户相关的网络请求

// 导入axios
import axios from '../utils/request'

function apiUserLogin (options) {
  // return axios 请求返回的 promise 对象
  return axios({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: options.mobile,
      code: options.code
    }
  })
}

// 暴露
export default apiUserLogin
