<template>
  <div class="d-flex" :class="{ 'flex-center': align === 'center', 'flex-start': align === 'left', 'flex-end': align === 'right' }">
    <div class="layui-box layui-laypage layui-laypage-default">
      <a v-show="showEnd" href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="0">
        <i  v-if="showType === 'icon'" class="layui-icon layui-icon-prev"></i>
        <template v-else>首页</template>
      </a>
      <a href="javascript:;" data-page="2">
        <i v-if="showType === 'icon'" class="layui-icon layui-icon-left"></i>
        <template v-else>上一页</template>
      </a>
      <a href="javascript:;" :class="[true ? theme : '', true ? 'active' : '']" class="layui-bg-green active">1</a>
      <a href="javascript:;">2</a>
      <a href="javascript:;">3</a>
      <a href="javascript:;">4</a>
      <a href="javascript:;">5</a>
      <a href="javascript:;">
        <i v-if="showType === 'icon'" class="layui-icon layui-icon-right"></i>
        <template v-else>下一页</template>
      </a>
      <a v-show="showEnd" href="javascript:;" class="layui-laypage-next" data-page="2">
        <i v-if="showType === 'icon'" class="layui-icon layui-icon-next"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div v-if="hasTotal" class="total">到第<input class="i-input" type="text" >页 共 total 页</div>
    <div v-if="hasSelect">
      <div @click="changeFav()" class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect }">
        <div class="layui-select-title">
          <input type="text" placeholder="请选择" v-model="options[optIndex]" class="layui-input layui-unselect"/>
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd v-for="(item, index) in options" :key="`options${index}`" :class="{ 'layui-this': index === optIndex }" @click="chooseFav(item, index)">
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'page',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'icon'
    },
    showEnd: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isSelect: false,
      options: [10, 20, 30, 50, 100],
      optIndex: 0,
      pages: [],
      limit: 10
    }
  },
  methods: {
    chooseFav (item, index) {
      this.optIndex = index
    },
    changeFav () {
      this.isSelect = !this.isSelect
    },
    initPages () {
      const len = Math.ceil(this.total / this.size)
      // 5 -> [1,2,3,4,5]
      this.pages = _.range(1, len + 1)
    }
  },
  mounted () {
    // 初始化分页的长度
    this.initPages()
    // 设置select的内容
    this.limit = this.size
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    &.active {
      border-radius: 2px;
      position: relative;
      // z-index: 100;
    }
//     &:first-child {
//       border-right: 0;
//     }
//     &:last-child {
//       border-left: 0;
//     }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}

.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.i-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
