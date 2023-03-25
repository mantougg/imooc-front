import axios from '@/utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} options 读取文件列表接口参数
 * @returns 文件列表内容
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * 温馨提醒
 * @returns
 */
const getTips = () => {
  return axios.get('/public/tips')
}

/**
 * 本周热议
 * @returns
 */
const getTop = () => {
  return axios.get('/public/topWeek')
}

/**
 * 友情链接
 * @returns
 */
const getLinks = () => {
  return axios.get('/public/links')
}

export {
  getList,
  getTips,
  getTop,
  getLinks
}