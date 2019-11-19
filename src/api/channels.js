// 与频道相关的网络请求
// 引入axios
import axios from '../utils/request.js'

// 请求频道数据的方法
function apiGetChannels () {
  return axios({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

// 全部频道列表
function apiGetAllChannels () {
  return axios({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

// 暴露接口
export { apiGetChannels, apiGetAllChannels }
