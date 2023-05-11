<template>
  <div class="layui-container">
    <i-panel></i-panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog === 'share'">分享</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'ask'">提问</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'advise'">建议</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'logs'">动态</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'discuss'">交流</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'notice'">公告</span>

            <span class="layui-badge" style="background-color: #999;" v-if="page.isEnd === '0'">未结</span>
            <span class="layui-badge" style="background-color: #5FB878;" v-else>已结</span>

            <span class="layui-badge layui-bg-black" v-if="page.isTop === '1'">置顶</span>
            <span v-for="(tag, index) in page.tags" :key="`tag${index}`" :class="tag.class" class="layui-badge">{{ tag.name }}</span>

            <!-- <div class="fly-admin-box" data-id="123"> -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span> -->

              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span> -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span> -->
              <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
            <!-- </div> -->
            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{ page.answer }}</a>
              <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="page.user ? page.user.pic : '/img/tuzi.png'">
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{ page.user ? page.user.name : 'wtf' }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i class="layui-badge fly-badge-vip mr10" v-if="page.user && page.user.isVip !== '0' ? page.user.isVip : false">VIP{{ page.user.isVip  }}</i>
              </a>
              <span>{{ page.created | moment }}</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{ page.fav }}积分</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt10">
            <router-link :to="{ name: 'edit', params: { tid: tid, page: page } }" class="layui-btn layui-btn-sm jie-admin" v-show="page.isEnd === '0'">编辑</router-link>
            <a  class="layui-btn layui-btn-sm jie-admin jie-admin-collection">收藏</a>
          </div>
          <!-- 帖子内容部分 -->
          <div class="detail-body photos" v-html="content"></div>
        </div>

        <!-- 回帖相关的内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li class="jieda-daan" v-for="(item, index) in comments" :key="`comment${index}`">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="item.cuid ? item.cuid.pic : '/img/tuzi.png'">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>{{ item.cuid ? item.cuid.name : 'wtf' }}</cite>
                    <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
                    <i class="layui-badge fly-badge-vip" v-if="item.cuid && item.cuid.isVip !== '0' ? item.cuid.isVip : false">VIP{{ item.cuid.isVip }}</i>
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                  <span style="color:#5FB878">(管理员)</span>
                  <span style="color:#FF9E3F">（社区之光）</span>
                  <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.created | moment }}</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <div class="detail-body jieda-body photos" v-richtext="item.content">
              </div>
              <div class="jieda-reply">
                <span @click="hands(item)" class="jieda-zan" :class="{ 'zanok': item.handed === 1 }" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span v-if="page.isEnd === '0' && item.cuid._id === user._id" type="edit" @click="editComment(item)">编辑</span>
                  <!-- <span type="del">删除</span> -->
                  <span v-if="page.isEnd === '0'" class="jieda-accept" @click="setBest(item)">采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>

          <i-pagination v-show="comments.length > 0 && total > 0" :align="`center`"
          :showType="`text`" :showEnd="true" :hasSelect="true"
          :total="total" :size="size" :current="current"
          @changeCurrent="handleChange"
          @changeLimit="handleLimit"
          ></i-pagination>

          <div class="layui-form layui-form-pane">
            <validation-observer ref="observer" v-slot="{ validate }">
              <i-edit :initContent="editInfo.content" @changeContent="addContent"></i-edit>
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
                <input type="hidden" name="jid" value="123">
                <button class="layui-btn" type="button" @click="validate().then(submit)">提交回复</button>
              </div>
            </validation-observer>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <i-hotlist></i-hotlist>
        <i-ads></i-ads>
        <i-link></i-link>

      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList.vue'
import Ads from '@/components/sidebar/Ads.vue'
import Link from '@/components/sidebar/Link.vue'
import Panel from '@/components/Panel.vue'
import Edit from '../modules/editor/index.vue'
import CodeMixin from '@/mixins/CodeMixin'
import Pagination from '@/components/modules/page/Pagination.vue'
import { getDetail } from '@/api/content'
import { getComments, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import escapeHtml from '@/utils/escapeHtml'
import { scrollToElem } from '@/utils/common'

export default {
  name: 'detail',
  mixins: [CodeMixin],
  props: ['tid'],
  components: {
    'i-hotlist': HotList,
    'i-ads': Ads,
    'i-link': Link,
    'i-panel': Panel,
    'i-edit': Edit,
    'i-pagination': Pagination
  },
  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (!!this.page.content && this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    tid () {
      this.getPostDetail()
      this.getCommentsList()
    }
  },
  methods: {
    reply (item) {
      console.log('🚀 ~ file: Detail.vue:229 ~ reply ~ item:', item)
      // 插入@ + name到content
      // 滚动页面到输入框
      // focus 输入框
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(reg, '@' + item.cuid.name + ' ')
        } else {
          // 评论框非空
          this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
        }
      } else {
        // 评论框为空
        this.editInfo.content = '@' + item.cuid.name + ' '
      }
      // 动态滚动到输入框的位置，并进行focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    hands (item) {
      setHands({ cid: item._id }).then(res => {
        if (res.code === 200) {
          this.$pop('', '点赞成功!')
          item.handed = 1
          item.hands += 1
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    getPostDetail () {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    addContent (val) {
      this.editInfo.content = val
    },
    async submit () {
      const self = this
      const isValid = await self.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      // 用户未登录
      const { isLogin } = self.$store.state
      if (!isLogin) {
        self.$pop('shake', '请先登录')
        return
      }
      // 用户禁言状态判断
      const user = self.$store.state.userInfo
      if (user.status !== '0') {
        self.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }
      self.editInfo.sid = self.$store.state.sid
      self.editInfo.code = self.code
      self.editInfo.tid = self.tid
      // 获取评论用户的信息：图片、昵称、vip
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }
      if (self.editInfo.cid !== '' && typeof self.editInfo.cid !== 'undefined') {
        const obj = { ...self.editInfo }
        delete obj.item
        // 判断用户是否修改了内容
        if (self.editInfo.content === self.editInfo.item.content) {
          self.$pop('shake', '内容没有发生变动~~~')
          return
        }
        // 更新评论
        updateComment(obj).then(res => {
          if (res.code === 200) {
            const temp = self.editInfo.item
            temp.content = this.editInfo.content
            self.$pop('', '更新评论成功')
            self.code = ''
            self.editInfo.content = ''
            // 方法一，只用更新特定的一条content created $set
            // 方法二，更新整个数组中的这一条
            self.comments.splice(self.comments.indexOf(self.editInfo.item), 1, temp)
          }
        })
        return
      }
      addComment(self.editInfo).then((res) => {
        if (res.code === 200) {
          self.$pop('', '发表评论成功')
          // 发表评论成功后，清空回复内容
          self.code = ''
          self.editInfo.content = ''
          self.page.answer += 1
          // 添加新的评论到评论列表
          res.data.cuid = cuid
          self.comments.push(res.data)
          requestAnimationFrame(() => {
            self.$refs.observer.reset()
          })
          // 刷新图形验证码
          self._getCode()
        } else {
          self.$alert(res.msg)
        }
      })
    },
    editComment (item) {
      this.editInfo.content = item.content
      // 动态滚动到输入框的位置，并进行focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定需要去编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    setBest (item) {
      this.$confirm('确定采纳为最佳答案吗？', () => {
        // 发送采纳最佳答案的请求
        setCommentBest({
          cid: item._id,
          tid: this.tid
        }).then(res => {
          if (res.code === 200) {
            this.$pop('', '设置最佳答案成功')
            item.isBest = '1'
            this.page.isEnd = '1'
          }
        })
      }, () => {})
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

</style>
