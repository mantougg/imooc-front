import axios from '@/utils/request'

// 获取文章中的评论列表
const getComments = (tid) => axios.get('/public/comments?tid=' + tid)

export {
  getComments
}
