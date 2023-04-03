<template>
  <div>
    <div class="modal" v-show="isShow" @click="close()">
      <div class="mask"></div>
      <div class="layui-layer layui-layer-page" :class="{ 'active': isShow }">
        <div class="layui-layer-title">
          签到说明
          <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
        </div>
        <div class="layui-layer-content">
          <div class="layui-text">
            <blockquote class="layui-elem-quote">
              "签到"可获得的社区积分，规则如下
            </blockquote>
            <table class="layui-table">
              <thead>
                <tr><th>连续签到天数</th><th>每天可获积分</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>&lt;5</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>&ge;5</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>&ge;15</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>&ge;30</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>&ge;100</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>&ge;365</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p>中间若有间隔，则连续天数重新计算</p>
              <p class="orange">不可复用程序自动签到，否则积分清零</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-info',
  data () {
    return {
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
    isShow: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    close () {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
