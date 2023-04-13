import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    hide: false
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      // localStorage：本地存储用户的token
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // localStorage：本地存储用户的基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置用户的登录状态
    setIsLogin (state, value) {
      state.isLogin = value
      // localStorage：本地存储用户的登录状态
      localStorage.setItem('isLogin', value)
    },
    // 设置container的状态
    setHide (state, value) {
      state.hide = value
    }
  },
  actions: {

  }
})
