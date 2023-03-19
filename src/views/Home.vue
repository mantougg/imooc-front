<template>
  <div>
    <i-panel></i-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel.vue'
export default {
  name: 'home',
  components: {
    'i-panel': Panel
  }
}
</script>

<style lang="scss" scoped>
</style>
