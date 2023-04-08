<template>
  <div class="layui-container flex">
    <div class="layui-row font pd30">确定更新账号为：{{username}}吗？</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" :class="{ 'layui-btn-disabled': isSend }" @click="submit">确定更新</button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/user'

export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      isSend: false,
      obj: {}
    }
  },
  methods: {
    submit () {
      const self = this
      this.obj.username = self.username
      updateUsername(this.obj).then((res) => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            self.$router.push('/')
          })
        }
      })
    }
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '')
    // 0:(2) ['key', 'fhgdksghfsd']
    // 1:(2) ['username', 'wy']
    this.obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.username = decodeURIComponent(this.obj.username)
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: 333;
}
</style>
