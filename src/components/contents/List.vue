<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a  :class="{'layui-this': status === '' && tag === ''}"
      @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '0'}"
      @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '1'}"
      @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '' && tag === '精华'}"
      @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this': sort === 'created'}"
        @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': sort === 'answer'}"
        @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <i-listitem :lists="lists" :isEnd="isEnd" @next-page="nextpage()"></i-listitem>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem.vue'

export default {
  name: 'list',
  data () {
    return {
      isEnd: false,
      isRepeat: false,
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      lists: []
    }
  },
  components: {
    'i-listitem': ListItem
  },
  methods: {
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      let options = {
        isTop: 0,
        catalog: this.catalog,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then((res) => {
        // 加入一个请求锁，放置用户多次点击，等待用户数据返回后，再打开
        this.isRepeat = false
        console.log(res)
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
          this.$alert(err.msg)
        }
      })
    },
    nextpage () {
      this.page++
      this._getList()
    },
    search (val) {
      switch (val) {
        // 未结帖
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结帖
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询 "精华" 标签
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照发帖时间倒序去查询
        case 3:
          this.sort = 'created'
          break
        // 按照评论数去查询
        case 4:
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          break
      }
    }
  },
  mounted () {
    this._getList()
  }
}
</script>

<style lang="scss" scoped></style>
