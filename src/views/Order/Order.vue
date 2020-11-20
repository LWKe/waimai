<!-- 模板 -->
<template>
  <div>
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2119836_p0u8rxwxy5p.css"
    />
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2120404_4uvcw79pyyn.css"
    />
    <section class="order">
      <HeardTop title="订单"></HeardTop>
      <section class="order_no_login" v-if="!userinfo.name">
        <img src="./images/order/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button><router-link to="/login">立即登陆</router-link></button>
      </section>
      <div v-else>
        <div class="list-content">
          <h2>
            <router-link to="/shop/goods">{{ info.name }}</router-link>
          </h2>
          <ul style="padding: 20px" v-show="listShow">
            <li class="food" v-for="(food, index) in cartFoods" :key="index">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food" />
              </div>
            </li>
          </ul>
        </div>
        <div class="pay enough" @click="toggleShopShow">
          付款￥{{ totalPrice }}
        </div>
        <transition name="fade">
          <div class="shop-brief-modal" v-show="shopShow">
            <div class="brief-modal-content">
              <img src="./images/IMG_20201015_195852.jpg" alt="" />
              <div class="mask-footer" @click="toggleShopShow">
                <span class="iconfont icon-guanbi"></span>
              </div>
            </div>
            <div class="brief-modal-cover"></div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import HeardTop from "@/components/Heardtop/Heardtop";
import CartControl from "../../components/CartControl/CartControl";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      isShow: true,
      shopShow: false,
    };
  },
  computed: {
    ...mapState(["userinfo", "cartFoods", "info"]),
    ...mapGetters(["totalPrice"]),
    listShow() {
      // 如果总数量为0, 直接不显示
      if (this.totalCount === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isShow = false;
        return false;
      }
      // if (this.isShow) {
      //   this.$nextTick(() => {
      //     // 实现BScroll的实例是一个单例
      //     if (!this.scroll) {
      //       this.scroll = new BScroll(".list-content", {
      //         click: true,
      //       });
      //     } else {
      //       this.scroll.refresh(); // 让滚动条刷新一下: 重新统计内容的高度
      //     }
      //   });
      // }
      return this.isShow;
    },
  },
  components: { HeardTop, CartControl },
  methods: {
    toggleShopShow() {
      this.shopShow = !this.shopShow;
    },
  },
};
</script>

<style scoped lang='stylus'>
@import '../../assets/stylus/mixins.styl';

&.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: $dColor;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;

      a {
        color: #fff;
      }
    }
  }

  h2 {
    text-align: center;
    height: 50px;
    line-height: 50px;

    a {
      color: black;
      font-weight: 700;
    }
  }

  .list-content {
    padding: 0 18px;
    max-height: 300px;
    overflow: hidden;
    background: #fff;
    padding: 43px 50px;

    .food {
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      .name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
      }
    }
  }

  .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #fff;

    &.enough {
      background: #0085ff;
      color: #fff;
    }
  }

  .shop-brief-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 52;
    flex-direction: column;
    color: #333;

    &.fade-enter-active, &.fade-leave-active {
      transition: opacity 0.5s;
    }

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    .brief-modal-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .brief-modal-content {
      position: relative;
      width: 80%;
      padding: 25px 20px;
      border-radius: 5px;
      background: #fff;
      z-index: 99;
      display: flex;
      flex-direction: column;

      img {
        height: 260px;
      }

      .mask-footer {
        position: absolute;
        bottom: -60px;
        left: 50%;
        padding: 6px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        transform: translateX(-50%);

        span {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}
</style>