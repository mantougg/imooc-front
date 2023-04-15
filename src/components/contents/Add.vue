<template>
  <div>
    <div class="layui-container fly-marginTop" :class="{'d-hide': isHide}">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <!--<div class="fly-none">没有权限</div>-->
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <validation-observer ref="observer" v-slot="{ validate }">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <validation-provider
                        name="catalog"
                        rules="is_not:请选择"
                        v-slot="{errors}"
                      >
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div class="layui-input-block" @click="isSelect = !isSelect">
                            <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect }">
                              <div class="layui-select-title">
                                <input type="text" placeholder="请选择" v-model="catalogs[cataIndex].text" class="layui-input layui-unselect"/>
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-upbit">
                                <dd v-for="(item, index) in catalogs" :key="`catlog${index}`" :class="{ 'layui-this': index === cataIndex }" @click="chooseCatalog(item, index)">
                                  {{ item.text }}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{errors[0]}}</span>
                        </div>
                      </validation-provider>
                    </div>
                    <div class="layui-col-md9">
                      <validation-provider
                        name="title"
                        rules="required"
                        v-slot="{errors}"
                      >
                        <label for="L_title" class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input type="text" v-model="title" id="L_title" name="title" class="layui-input">
                          <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{errors[0]}}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>
                  <i-edit :initContent="content" @changeContent="add($event)"></i-edit>
                  <div class="layui-form-item">
                    <div class="layui-row">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" @click="isSelect_fav = !isSelect_fav" style="width: 190px;">
                        <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect_fav }">
                          <div class="layui-select-title">
                            <input type="text" placeholder="请选择" v-model="favList[favIndex]" class="layui-input layui-unselect"/>
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd v-for="(item, index) in favList" :key="`favList${index}`" :class="{ 'layui-this': index === favIndex }" @click="chooseFav(item, index)">
                              {{ item }}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{errors}"
                    >
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
                    <button type="button" class="layui-btn" @click="validate().then(submit)">立即发布</button>
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
import { addPost } from '@/api/content'
import Edit from '../modules/editor/index.vue'
import CodeMixin from '@/mixins/CodeMixin'

export default {
  name: 'add',
  mixins: [CodeMixin],
  components: {
    'i-edit': Edit
  },
  computed: {
    isHide () {
      return this.$store.state.hide
    }
  },
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [{
        text: '请选择',
        value: ''
      }, {
        text: '提问',
        value: 'ask'
      }, {
        text: '分享',
        value: 'share'
      }, {
        text: '讨论',
        value: 'discuss'
      }, {
        text: '建议',
        value: 'advise'
      }],
      favList: [20, 30, 50, 60, 80],
      content: '',
      title: ''
    }
  },
  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空')
        return
      }
      // 添加新的文章
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          // 清空已发布的内容
          localStorage.setItem('addData', '')
          this.$alert('发帖成功~~2s后跳转')
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 2000)
        } else {
          this.$alert(res.msg)
        }
      })
    },
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('addData', JSON.stringify(saveData))
      }
    }
  },
  mounted () {
    const self = this
    const saveData = localStorage.getItem('addData')
    if (saveData && saveData !== '') {
      this.$confirm('是否加在未编辑完的内容？', () => {
        const obj = JSON.parse(saveData)
        self.content = obj.content
        self.title = obj.title
        self.cataIndex = obj.cataIndex
        self.favIndex = obj.favIndex
      }, () => {
        localStorage.setItem('addData', '')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
