<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/logo-2.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="http://www.layui.com/" target="_blank">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="isShow">
          <li class="layui-nav-item">
          <router-link class="iconfont icon-touxiang layui-hide-xs" to="/user123123"></router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <!-- 调整hover的区域 -->
           <li class="layui-nav-item"
            @mouseover="show()"
            @mouseleave="hide()"
           >
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i>
              <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip !== '0'">{{ userInfo.isVip }}</i>
              <img :src="userInfo.pic">
            </a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{ 'layui-show': isHover }">
              <dd>
                <router-link :to="{ name: 'info' }" class="layui-hide-xs">
                    <i class="layui-icon layui-icon-set" style="font-size: 22px"></i>基本设置
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'msg' }" class="layui-hide-xs">
                    <i class="layui-icon layui-icon-notice" style="font-size: 22px"></i>我的消息
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'home' }" class="layui-hide-xs">
                    <i class="layui-icon layui-icon-home" style="font-size: 22px"></i>我的主页
                </router-link>
                <!-- <a href="user/home.html"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a> -->
              </dd>
              <hr style="margin: 5px 0;">
              <dd><a href="javascript:void(0)" style="text-align: center;" @click="logout()">退出</a></dd>
            </dl>
          </li>
        </template>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  computed: {
    isShow () {
      return !this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: 0
      }
    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出吗？', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', {})
        this.$store.commit('setIsLogin', false)
        this.$router.push('/').catch(() => {})
      }, () => {})
    },
    show () {
      // 当用户的鼠标移入头像的时候，去显示操作菜单
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      // 当用户的鼠标移除头像的时候，去隐藏操作菜单
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
</style>
