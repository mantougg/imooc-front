<template>
  <transition name="fade">
    <div ref="wrapper" class="layui-layer layui-layer-page layui-layer-border edit-content" v-show="isShow">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label for="" class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input v-model="pic" class="layui-input" type="text" id="fileInput" placeholder="粘贴图片地址或者点击上传">
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input @change="upload" class="layui-upload-file" type="file" name="file" id="uploadImg">
          </li>
          <li class="layui-form-item">
            <button @click="submit()" type="button" class="layui-btn">确认</button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from '@/api/content'
import config from '@/config'

export default {
  name: 'img-upload',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    ctrl: {}
  },
  data () {
    return {
      pic: '',
      formData: ''
    }
  },
  methods: {
    close () {
      // 清空输入内容
      this.$emit('closeEvent')
      this.pic = ''
      this.formData = ''
    },
    handleBodyClick (e) {
      // e.stopPropagetion()
      // 触发隐藏本组件的关闭事件，改变isShow
      // 判断是否点击到了非控制ICON + 本组件以外的地方
      if (!(this.ctrl.contains(e.target) || this.$refs.wrapper.contains(e.target))) {
        this.$emit('closeEvent')
        this.pic = ''
        this.formData = ''
      }
    },
    upload (e) {
      const self = this
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片
      uploadImg(formData).then((res) => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production'
            ? config.baseUrl.pro : config.baseUrl.dev
          self.pic = baseUrl + res.data
        }
        document.getElementById('uploadImg').value = ''
      })
    },
    submit () {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或者复制图片连接')
        return
      }
      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        this.pic = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
