<template>
  <div>
    <div class="modal" v-show="showList" @click="close()">
      <div class="mask"></div>
      <div class="layui-layer layui-layer-page" :class="{ 'active': showList }">
        <div class="layui-layer-title">
          签到活跃榜
          <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
        </div>
        <div class="layui-layer-content pd0">
          <div class="layui-tab layui-tab-brief">
            <ul class="layui-tab-title">
              <li :class="{ 'layui-this': current === 0 }" @click.stop="choose(0)">最新签到</li>
              <li :class="{ 'layui-this': current === 1 }" @click.stop="choose(1)">今日最快</li>
              <li :class="{ 'layui-this': current === 2 }" @click.stop="choose(2)">总签到榜</li>
            </ul>
            <div class="layui-tab-content">
              <ul class="layui-tab-item layui-show">
                <li v-for="(item, index) in lists" :key="`sign${index}`">
                  <img src="/img/tuzi.png" alt="" class="mr10">
                  <cite class="fly-link">{{item.name}}</cite>
                  <span class="fly-grey" v-if="current !== 2">签到于{{item.created}}</span>
                  <span class="fly-grey" v-else>已经连续签到<i class="orange">{{item.count}}</i>天</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-list',
  data () {
    return {
      current: 0,
      lists: [{
        name: '王飞0',
        count: 33,
        created: '2023-04-03'
      }, {
        name: '王飞1',
        count: 5,
        created: '2023-04-03'
      }, {
        name: '王飞2',
        count: 40,
        created: '2023-04-03'
      }, {
        name: '王飞3',
        count: 100,
        created: '2023-04-03'
      }]
    }
  },
  props: {
    showList: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    choose (val) {
      this.current = val
      // 请求后台获取数据
    },
    close () {
      this.$emit('update:showList', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
