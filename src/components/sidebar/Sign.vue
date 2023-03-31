<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" id="LAY_signinHelp" @click="showInfo()">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" id="LAY_signinTop">活跃榜<span class="layui-badge-dot"></span></a>
      <span class="fly-signin-days">已连续签到<cite>16</cite>天</span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
      <span>可获得<cite>5</cite>飞吻</span>

      <!-- 已签到状态 -->
      <!--
      <button class="layui-btn layui-btn-disabled">今日已签到</button>
      <span>获得了<cite>20</cite>飞吻</span>
      -->
    </div>
    <div class="modal" v-show="isShow">
      <div class="mask"></div>
      <div class="layui-layer layui-layer-page info">
        <div class="layui-layer-title">签到说明</div>
        <div class="layui-layer-content">
          <div class="layui-text">
            <blockquote class="layui-elem-quote">
              "签到"可获得的社区积分，规则如下
            </blockquote>
            <table class="layui-table">
              <thead>
                <tr><th>连续签到天数</th></tr>
                <tr><th>每天可获积分</th></tr>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
