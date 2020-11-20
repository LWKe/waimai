<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2090920_79fw4v7s7xu.css"
    />
    <!-- 组件渲染 -->
    <router-view></router-view>
    <Footernav v-show="$route.meta.Footer"></Footernav>
    <!-- <Footernav /> -->
  </div>
</template>
<script>
// 组件引用
import { mapActions } from "vuex";
import Footernav from "@/components/Footernav/Footernav";
// import axios from "axios";
// import { reqAddress } from "./api";

// 注册组件
export default {
  components: {
    Footernav,
  },
  async mounted() {
    //触发请求地址
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getShops");
    this.$store.dispatch("getCategorys");
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo"]),
  },
};
</script>

<style lang="stylus">
@import url('./assets/stylus/reset.styl');
</style>
