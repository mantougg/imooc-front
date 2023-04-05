import axios from '@/utils/request'
import store from '@/store'

/**
 * 用户签到接口
 * @returns
 */
const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token
  }
  return axios.get('/user/fav', {
    headers
  })
}

export {
  userSign
}
