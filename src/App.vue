<template>
  <div id="app">
    <!-- 组件渲染 -->
    <Footernav />
  </div>
</template>
<script>
// 组件引用
import Footernav from "@/components/Footernav/Footernav";
// 注册组件
export default {
  components: {
    Footernav,
  },
};
</script>

<style lang="stylus">
@import url('./assets/stylus/reset.styl');
</style>
