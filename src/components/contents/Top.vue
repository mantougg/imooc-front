<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <i-listitem :lists="lists" :isShow="false"></i-listitem>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem.vue'

export default {
  name: 'top',
  components: {
    'i-listitem': ListItem
  },
  data () {
    return {
      page: 0,
      limit: 3,
      lists: [],
      isEnd: false,
      isRepeat: false
    }
  },
  methods: {
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      let options = {
        isTop: 1,
        page: this.page,
        limit: this.limit
      }
      getList(options).then((res) => {
        // 加入一个请求锁，放置用户多次点击，等待用户数据返回后，再打开
        this.isRepeat = false
        // 对于异常的判断，res.code非200，给用户一个提示
        // 判断lists长度是否为0，如果为零即可直接赋值
        // 当lists长度不为0，后面请求的数据，加入到lists里面来
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    }
  },
  mounted () {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>

</style>
