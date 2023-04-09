<template>
  <transition name="fade">
    <div v-show="isShow" class="layui-layer layui-layer-tips layui-edit-face edit-content">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(item, key) in lists" :key="`${key}`" @click="handleFaceClick(key)">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'

export default {
  name: 'face',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    ctrl: {}
  },
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item)
    },
    handleBodyClick (e) {
      // e.stopPropagetion()
      // 触发隐藏本组件的关闭事件，改变isShow
      // 判断是否点击到了非控制ICON以外的地方
      if (!this.ctrl.contains(e.target)) {
        this.$emit('closeEvent')
      }
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
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
