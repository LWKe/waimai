<!-- 评分组件 -->
<template>
  <div class="star star-24">
    <span
      class="star-item"
      v-for="(item, index) in starArr"
      :key="index"
      :class="item"
    ></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   arr: ["on", "on", "on", "on", "half"],
    };
  },
  props: {
    rating: Number,
  },
  computed: {
    starArr() {
      let arr = [];
      //解构赋值
      let { rating } = this;
      //向下取整
      let fInt = Math.floor(rating);
      for (let i = 0; i < fInt; i++) {
        //添加on
        arr.push("on");
      }
      //把小数转化为整数,添加half
      if (rating * 10 - fInt * 10 > 5) {
        arr.push("half");
      }
      //添加off
      let res = 5 - arr.length;
      for (let j = 0; j < res; j++) {
        arr.push("off");
      }
      return arr;
    },
  },
};
</script>

<style scoped lang='stylus'>
@import '../../assets/stylus/mixins.styl';

.star {
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star48_on');
      }

      &.half {
        bg-image('./images/stars/star48_half');
      }

      &.off {
        bg-image('./images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star36_on');
      }

      &.half {
        bg-image('./images/stars/star36_half');
      }

      &.off {
        bg-image('./images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star24_on');
      }

      &.half {
        bg-image('./images/stars/star24_half');
      }

      &.off {
        bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>