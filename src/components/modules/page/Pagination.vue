<template>
  <div class="d-flex" :class="{ 'flex-center': align === 'center', 'flex-start': align === 'left', 'flex-end': align === 'right' }">
    <div class="layui-box layui-laypage layui-laypage-default">
      <a @click.prevent="home()" v-show="showEnd" href="javascript:;" :class="{ 'layui-disabled': current === 0 }" class="layui-laypage-prev" >
        <i  v-if="showType === 'icon'" class="layui-icon layui-icon-prev"></i>
        <template v-else>首页</template>
      </a>
      <a  @click.prevent="prev()" :class="{ 'layui-disabled': current === 0 }">
        <i v-if="showType === 'icon'" class="layui-icon layui-icon-left"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 < pages.length 显示... -->
      <!-- current - 2 > 1 显示... -->
      <a href="javascript:;" class="layui-disabled" v-if="pages.length > 5 && current + 1 - 2 > 1">...</a>
      <template v-for="(item, index) in pages">
        <a @click="changeIndex(item)"
          v-if="item >= (current + 1 - 2) && item <= (current + 1 + 2)"
          :key="`page${index}`"
          :class="[current === index ? theme : '', current === index ? 'active' : '']"
        >{{ item }}</a>
      </template>
      <a href="javascript:;" class="layui-disabled" v-if="pages.length > 5 && current + 1 + 2 < pages.length" >...</a>
      <a  @click.prevent="next()" :class="{ 'layui-disabled': current === pages.length - 1 }">
        <i v-if="showType === 'icon'" class="layui-icon layui-icon-right"></i>
        <template v-else>下一页</template>
      </a>
      <a @click.prevent="end()" v-show="showEnd" :class="{ 'layui-disabled': current === pages.length - 1 }" class="layui-laypage-next" >
        <i v-if="showType === 'icon'" class="layui-icon layui-icon-next"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div v-if="hasTotal" class="total">到第<input class="i-input" type="text" >页 共 {{ pages.length }} 页</div>
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
      default: false
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
  watch: {
    total () {
      this.initPages()
    }
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      // 5 -> [1,2,3,4,5]
      this.pages = _.range(1, len + 1)
    },
    chooseFav (item, index) {
      if (this.optIndex !== index) {
        // 当页面上的limit发生变化，调整current数值
        this.$emit('changeCurrent', Math.floor(this.limit * (this.current + 1) / this.options[index]))
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    changeFav () {
      this.isSelect = !this.isSelect
    },
    changeIndex (val) {
      if (val !== this.current) {
        this.$emit('changeCurrent', val - 1)
      }
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    prev () {
      let cur = 0
      if (this.current - 1 < 0) {
        this.current = 0
      } else {
        cur = this.current - 1
      }
      this.$emit('changeCurrent', cur)
    },
    next () {
      let cur = 0
      if (this.current + 1 >= this.pages.length) {
        cur = this.pages.length - 1
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    }
  },
  mounted () {
    // 初始化分页的长度
    // 设置select的内容
    this.limit = this.size
    this.initPages()
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
  border: 1px solid #e6e6e6;
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
