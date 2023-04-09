<template>
  <!-- 修改密码 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer ref="observer" v-slot="{ validate }">
      <div class="layui-form-item">
        <validation-provider v-slot="{ errors }" rules="required">
          <div class="layui-row">
            <label for="L_nowpass" class="layui-form-label">当前密码</label>
            <div class="layui-input-inline">
              <input type="password" id="L_nowpass" name="nowpass" v-model="nowpass" class="layui-input">
            </div>
          </div>
          <div class="layui-row">
            <span style="color: #c00;">{{errors[0]}}</span>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item">
        <validation-provider
          rules="required|min:6|max:16"
          vid="confirmation"
          v-slot="{errors}"
        >
          <div class="layui-row">
            <label for="L_pass" class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
              <input type="password" id="L_pass" name="password" v-model="pass" class="layui-input">
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
              <input type="password" id="L_repass" name="repassword" v-model="repass" class="layui-input">
            </div>
          </div>
          <div class="layui-row">
            <span style="color: #c00;">{{errors[0]}}</span>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" key="set-mine" @click="validate().then(submit)">确认修改</button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePasswd } from '@/api/user'

export default {
  name: 'password',
  data () {
    return {
      nowpass: '',
      pass: '',
      repass: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      if (this.nowpass === this.oldpwd) {
        this.$alert('新密码和当前密码一致')
        return
      }
      changePasswd({
        oldpwd: this.nowpass,
        newpwd: this.pass
      }).then((res) => {
        this.nowpass = ''
        this.pass = ''
        this.repass = ''
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
        })
        if (res.code === 200) {
          this.$alert('密码更新成功')
          return
        }
        this.$alert(res.code)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
