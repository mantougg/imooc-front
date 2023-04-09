import axios from '@/utils/request'
import qs from 'qs'

/**
 * 用户签到接口
 * @returns
 */
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))

// 确认修改密码
const updatePassword = (data) => axios.get('/public/reset-password?' + qs.stringify(data))

// 修改用户密码接口
const changePasswd = (data) => axios.post('/user/change-password', {
  ...data
})

export {
  userSign,
  updateUserInfo,
  updateUsername,
  updatePassword,
  changePasswd
}
