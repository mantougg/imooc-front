<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <i-list></i-list>
      </div>
      <div class="layui-col-md4">
        <i-tips></i-tips>
        <i-ads></i-ads>
        <i-link></i-link>
      </div>
    </div>
  </div>
</template>

<script>
import Ads from '@/components/sidebar/Ads.vue'
import Link from '@/components/sidebar/Link.vue'
import Tips from '@/components/sidebar/Tips.vue'
import List from '@/components/contents/List.vue'

export default {
  name: 'template1',
  components: {
    'i-ads': Ads,
    'i-link': Link,
    'i-tips': Tips,
    'i-list': List
  }
}
</script>

<style lang="scss" scoped>

</style>
