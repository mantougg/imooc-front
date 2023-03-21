<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear i-quick">
        <li v-for="tip in lists" :key="`${tip.title}`" class="layui-col-xs6">
          <a :href="tip.link" target="_blank">{{ tip.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from '@/api/content'
import { IndexMixin } from '@/mixins/IndexMixin'

export default {
  name: 'tips',
  mixins: [IndexMixin],
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.i-quick {
  border: 1px solid $border-color;
  border-right: none;
  border-bottom: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>
