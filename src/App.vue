<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";
@import "assets/css/layui-layer/layer.css";

// 公用样式
.svg {
  position: relative;
  top: -4px;
}

.gray {
  color: #999;
}

@for $i from 0 through 5 {
  .pd#{$i * 10} {
    padding: $i * 10px !important;
  }
  .pl#{$i * 10} {
    padding-left: $i * 10px !important;
  }
  .pt#{$i * 10} {
   padding-top: $i * 10px !important;
  }
  .pb#{$i * 10} {
   padding-bottom: $i * 10px !important;
  }
  .pr#{$i * 10} {
   padding-right: $i * 10px !important;
  }
  .mg#{$i * 10} {
    margin: $i * 10px !important;
  }
  .ml#{$i * 10} {
    margin-left: $i * 10px !important;
  }
  .mr#{$i * 10} {
    margin-right: $i * 10px !important;
  }
  .mt#{$i * 10} {
    margin-top: $i * 10px !important;
  }
  .mb#{$i * 10} {
    margin-bottom: $i * 10px !important;
  }
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.orange {
  color: #ff5722;
}

.pull-right {
  float: right;
}

.d-hide {
  position: absolute;
  overflow: hidden;
  height: 0;
}

.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-center {
    justify-content: center;
  }
  &.flex-end {
    justify-content: flex-end;
  }
}
</style>
