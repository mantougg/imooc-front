<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <span ref="face" @click="() => { this.faceStatus = !this.faceStatus }">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span ref="img" @click="() => { this.imgStatus = !this.imgStatus }">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span>
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote">
            "
          </span>
          <span>
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span>
            hr
          </span>
          <span>
            <i class="iconfont icon-yulan1"></i>
          </span>
          <textarea class="layui-textarea" name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
    <i-face :ctrl="$refs.face" :isShow="faceStatus" @closeEvent="closeface()"></i-face>
    <i-img-upload :ctrl="$refs.img" :isShow="imgStatus" @closeEvent="closeImg()"></i-img-upload>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'

export default {
  name: 'editor',
  components: {
    'i-face': Face,
    'i-img-upload': ImgUpload
  },
  data () {
    return {
      faceStatus: false,
      imgStatus: false
    }
  },
  methods: {
    closeface () {
      this.faceStatus = false
    },
    closeImg () {
      this.imgStatus = false
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceout {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active, .fade-enter-to {
  animation: bounceIn 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.edit-wrap {
  position: relative;
}
.fly-edit {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}

.edit-content {
  position: absolute;
  top: 40px;
  left: 0;
}
</style>
