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

// 设置收藏 & 取消收藏
const addCollect = (params) => axios.get('/user/set-collect?' + qs.stringify(params))

// 获取收藏列表
const getCollect = (params) => axios.get('/user/collect?' + qs.stringify(params))

// 获取个人发帖列表
const getPostListByUid = (params) => axios.get('/user/post?' + qs.stringify(params))

// 删除指定文章
const deletePostByUid = (data) => axios.post('/user/del-post', {
  ...data
})

export {
  userSign,
  updateUserInfo,
  updateUsername,
  updatePassword,
  changePasswd,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid
}
