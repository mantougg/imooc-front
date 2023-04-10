<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-page layui-layer-border edit-content" v-show="isShow">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label for="" class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input class="layui-input" type="text" id="fileInput" placeholder="粘贴图片地址或者点击上传">
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input class="layui-upload-file" type="file" name="file" id="uploadImg">
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn">确认</button>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'img-upload',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    ctrl: {}
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
