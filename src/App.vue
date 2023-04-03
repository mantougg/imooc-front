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
    padding: $i * 10 px;
  }
  .pl#{$i * 10} {
    padding-left: $i * 10 px;
  }
  .pr#{$i * 10} {
   padding-right: $i * 10 px;
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
</style>
