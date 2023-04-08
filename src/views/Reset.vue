<template>
  <div>
    <!-- 重置密码 -->
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li>
              <router-link :to="{name: 'login'}">登入</router-link>
            </li>
            <li class="layui-this">
              找回密码
              <!--重置密码-->
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <validation-observer ref="observer" v-slot="{ validate }">
                  <div class="layui-form-item">
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16"
                      vid="confirmation"
                      v-slot="{errors}"
                    >
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label">密码</label>
                        <div class="layui-input-inline">
                          <input type="password" id="L_pass" v-model="password" name="password" class="layui-input">
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider v-slot="{ errors }" rules="required|confirmed:confirmation">
                      <div class="layui-row">
                        <label for="L_repass" class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input type="password" id="L_repass" v-model="repassword" name="repassword" class="layui-input">
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="code" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" @click="validate().then(submit)">提交</button>
                  </div>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { updatePassword } from '@/api/user'
import { getCode } from '@/api/login'
import uuid from 'uuid/v4'

export default {
  name: 'reset',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      name: '',
      password: '',
      repassword: '',
      svg: '',
      code: '',
      obj: {}
    }
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      updatePassword({
        password: this.password,
        sid: this.$store.state.sid,
        key: this.obj.key,
        code: this.code
      }).then((res) => {
        if (res.code === 200) {
          this.$router.push('/login')
        }
        this.$alert(res.msg)
      })
    },
    loadingCode () {
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid')
      } else {
        sid = uuid()
        localStorage.setItem('sid', sid)
      }
      this.$store.commit('setSid', sid)
      this._getCode()
    }
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '')
    // 0:(2) ['key', 'fhgdksghfsd']
    // 1:(2) ['name', 'wy']
    this.obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.loadingCode()
  }
}
</script>

<style lang="scss" scoped>

</style>
