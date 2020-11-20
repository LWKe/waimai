<!--  -->
<template>
  <div>
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2121836_ft9dvacy6q9.css"
    />
    <div class="cartcontrol">
      <transition name="move">
        <div
          class="iconfont icon-removecircleoutline"
          v-if="food.count"
          @click.stop="updateFoodCount(false)"
        ></div>
      </transition>
      <div class="cart-count" v-if="food.count">{{ food.count }}</div>
      <div
        class="iconfont icon-AddCircle"
        @click.stop="updateFoodCount(true)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
  },
  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    },
  },
};
</script>

<style scoped lang='stylus'>
@import '../../assets/stylus/mixins.styl';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-removecircleoutline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #0085ff;

    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s;
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-AddCircle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #0085ff;
  }
}
</style>