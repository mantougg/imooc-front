import Vue from 'vue'
import Router from 'vue-router'

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

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      name: 'index',
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
      linkExactActiveClass: 'layui-this',
      children: [{
        path: '',
        name: 'center',
        component: UserCenter
      }, {
        path: 'set',
        name: 'set',
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
        name: 'posts',
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
    }
  ]
})
