<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span ref="face" @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span ref="img" @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span ref="link" @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="addHR()">
            "
          </span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="choose(5)">
            hr
          </span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea id="edit" v-model="content" class="layui-textarea fly-editor" @focus="focusEvent()" @blur="blurEvent()" name="content"></textarea>
      </div>
    </div>
    <div ref="modal">
      <i-face :ctrl="$refs.face" :isShow="this.current === 0" @closeEvent="closeModal()" @addEvent="addFace"></i-face>
      <i-img-upload :ctrl="$refs.img" :isShow="this.current === 1" @closeEvent="closeModal()" @addEvent="addImg"></i-img-upload>
      <i-link-add :ctrl="$refs.link" :isShow="this.current === 2" @closeEvent="closeModal()" @addEvent="addLink"></i-link-add>
      <i-preview :ctrl="$refs.preview" :content="content" :isShow="this.current === 6" @closeEvent="closeModal()"></i-preview>
    </div>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import LinkAdd from './LinkAdd.vue'
import Preview from './Preview.vue'

export default {
  name: 'editor',
  props: {
    initContent: {
      type: String,
      default: ''
    }
  },
  components: {
    'i-face': Face,
    'i-img-upload': ImgUpload,
    'i-link-add': LinkAdd,
    'i-preview': Preview
  },
  data () {
    return {
      current: '',
      content: '',
      pos: ''
    }
  },
  watch: {
    initContent (n) {
      this.content = n
    }
  },
  methods: {
    closeModal () {
      this.current = ''
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    handleBodyClick (e) {
      // e.stopPropagetion()
      // 触发隐藏本组件的关闭事件，改变isShow
      // 判断是否点击到了非控制ICON + 本组件以外的地方
      if (!(this.$refs.icons.contains(e.target) ||
        this.$refs.modal.contains(e.target))) {
        this.closeModal()
      }
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    getPos () {
      let cursorPos = 0
      let elem = document.getElementById('edit')
      if (document.selection) {
        // IE
        let selectRange = document.selection.createRange()
        selectRange.moveSart('character', -elem.ariaValueMax.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === 0) {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
      console.log('🚀 ~ file: index.vue:96 ~ getPos ~ cursorPos:', cursorPos)
    },
    addFace (item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addImg (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addHR () {
      this.closeModal()
      const insertContent = ` \n[hr]\n`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      let tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
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
.fly-editor {
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
  background: #fff;
}

.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0,0,0,.2);
}
</style>
