import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Home = () =>
  import(/* webpackChunkName: 'home' */ './views/Home.vue')
const Index = () =>
  import(/* webpackChunkName: 'index' */ './views/channels/Index.vue')
const Tempalte1 = () =>
  import(/* webpackChunkName: 'tempalte1' */ './views/channels/Template1.vue')
const Center = () =>
  import(/* webpackChunkName: 'center' */ './views/Center.vue')
const UserHome = () =>
  import(/* webpackChunkName: 'userHome' */ './views/User.vue')
const UserCenter = () =>
  import(/* webpackChunkName: 'userCenter' */ './components/user/Center.vue')
const UserSettings = () =>
  import(/* webpackChunkName: 'userSettings' */ './components/user/Settings.vue')
const UserPost = () =>
  import(/* webpackChunkName: 'userPost' */ './components/user/Post.vue')
const UserOthers = () =>
  import(/* webpackChunkName: 'userOthers' */ './components/user/Others.vue')
const UserMsg = () =>
  import(/* webpackChunkName: 'userMsg' */ './components/user/Msg.vue')
const MyInfo = () =>
  import(/* webpackChunkName: 'myInfo' */ './components/user/common/MyInfo.vue')
const Accounts = () =>
  import(/* webpackChunkName: 'accounts' */ './components/user/common/Accounts.vue')
const Password = () =>
  import(/* webpackChunkName: 'password' */ './components/user/common/Password.vue')
const PicUpload = () =>
  import(/* webpackChunkName: 'picUpload' */ './components/user/common/PicUpload.vue')
const MyPost = () =>
  import(/* webpackChunkName: 'myPost' */ './components/user/common/MyPost.vue')
const MyCollection = () =>
  import(/* webpackChunkName: 'myCollection' */ './components/user/common/MyCollection.vue')
const NotFound = () =>
  import(/* webpackChunkName: 'notfound' */ './views/NotFound.vue')
const Confirm = () =>
  import(/* webpackChunkName: 'confirm' */ './views/Confirm.vue')
const Reset = () =>
  import(/* webpackChunkName: 'reset' */ './views/Reset.vue')
const Add = () =>
  import(/* webpackChunkName: 'add' */ './components/contents/Add.vue')
const Edit = () =>
  import(/* webpackChunkName: 'edit' */ './components/contents/Edit.vue')
const Detail = () =>
  import(/* webpackChunkName: 'detail' */ './components/contents/Detail.vue')

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        name: 'index',
        component: Index
      }, {
        path: '/index/:catalog',
        name: 'catalog',
        component: Tempalte1
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/add',
      name: 'add',
      meta: { requiresAuth: true },
      component: Add
    },
    {
      path: '/edit/:tid',
      name: 'edit',
      props: true,
      meta: { requiresAuth: true },
      component: Edit,
      beforeEnter (to, from, next) {
        if (['detail', 'mypost'].indexOf(from.name) > -1 && to.params.page && to.params.page.isEnd === '0') {
          next()
        } else {
          // 用户在edit页面刷新
          const editData = localStorage.getItem('editData')
          if (editData && editData !== '') {
            const editObj = JSON.parse(editData)
            if (editObj.isEnd === '0') {
              next()
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      }
    },
    {
      path: '/detail/:tid',
      name: 'detail',
      props: true,
      component: Detail
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: UserHome
    },
    {
      path: '/center',
      component: Center,
      meta: { requiresAuth: true },
      linkExactActiveClass: 'layui-this',
      children: [{
        path: '',
        name: 'center',
        component: UserCenter
      }, {
        path: 'set',
        component: UserSettings,
        children: [{
          path: '',
          name: 'info',
          component: MyInfo
        }, {
          path: 'account',
          name: 'account',
          component: Accounts
        }, {
          path: 'passwd',
          name: 'passwd',
          component: Password
        }, {
          path: 'pic',
          name: 'pic',
          component: PicUpload
        }]
      }, {
        path: 'posts',
        component: UserPost,
        children: [{
          path: '',
          name: 'mypost',
          component: MyPost
        }, {
          path: 'mycollection',
          name: 'mycollection',
          component: MyCollection
        }]
      }, {
        path: 'msg',
        name: 'msg',
        component: UserMsg
      }, {
        path: 'others',
        name: 'others',
        component: UserOthers
      }]
    }, {
      path: '/404',
      component: NotFound
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (dayjs().isBefore(dayjs(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息+用户信息
    // 8~24小时，refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面，进行区别
    if (isLogin) {
    // 已经登录的状态
    // 权限判断，meta元数据
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
