<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <i-top></i-top>
        <i-list></i-list>
      </div>
      <div class="layui-col-md4">
        <i-tips></i-tips>
        <i-sign></i-sign>
        <i-hotlisk></i-hotlisk>
        <i-ads></i-ads>
        <i-link></i-link>
      </div>
    </div>
  </div>
</template>

<script>
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import Link from '@/components/sidebar/Link.vue'
import Sign from '@/components/sidebar/Sign.vue'
import Tips from '@/components/sidebar/Tips.vue'
import List from '@/components/contents/List.vue'
import Top from '@/components/contents/Top.vue'

export default {
  name: 'index',
  components: {
    'i-ads': Ads,
    'i-hotlisk': HotList,
    'i-link': Link,
    'i-sign': Sign,
    'i-tips': Tips,
    'i-list': List,
    'i-top': Top
  }
}
</script>

<style lang="scss" scoped>

</style>
