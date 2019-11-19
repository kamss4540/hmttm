import axios from '../utils/request'

function apiGetArticles ({ channelId, timestamp }) {
  return axios({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 0
    }
  })
}

export default apiGetArticles
