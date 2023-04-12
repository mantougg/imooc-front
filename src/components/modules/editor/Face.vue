<template>
  <transition name="fade">
    <div v-show="isShow" class="layui-layer-tips layui-edit-face edit-content">
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
    }
  },
  data () {
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item)
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
