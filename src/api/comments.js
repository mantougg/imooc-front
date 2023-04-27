import axios from '@/utils/request'
import qs from 'qs'

// 获取文章中的评论列表
const getComments = (params) => axios.get('/public/comments?' + qs.stringify(params))

// 添加评论
const addComment = (data) => axios.post('/comments/reply', {
  ...data
})

// 更新评论
const updateComment = (data) => axios.post('/comments/update', {
  ...data
})

// 设置最佳答案
const setCommentBest = (params) => axios.get('/comments/accept?' + qs.stringify(params))

export {
  getComments,
  addComment,
  updateComment,
  setCommentBest
}
