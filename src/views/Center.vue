<template>
  <div>
    <div class="layui-container fly-marginTop fly-user-main">
      <ul class="layui-nav layui-nav-tree" lay-filter="test">
       <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
        <li class="layui-nav-item" v-for="(item, index) in lists" :key="`menu${index}`">
          <a href="">
            <i class="imooc" :class="item.icon"></i>
            {{item.name}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      lists: [{
        name: '我的主页',
        icon: 'icon-home1'
      }, {
        name: '基本设置',
        icon: 'icon-settings'
      }, {
        name: '我的帖子',
        icon: 'icon-19DOCUMENT'
      }, {
        name: '我的消息',
        icon: 'icon-messagefill'
      }, {
        name: '其他设置',
        icon: 'icon-ico_productService'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/custom/iconfont.css';
.iconfont {
  margin-right: 10px;
}
</style>
