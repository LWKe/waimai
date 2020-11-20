<!-- 模板 -->
<template>
  <div>
    <div class="on">
      <section class="msite">
        <HeardTop :title="address.name">
          <template v-slot:left>
            <router-link to="/search">
              <span class="header_search">
                <i class="iconfont icon-sousuo"></i>
              </span>
            </router-link>
          </template>
          <template v-slot:right>
            <router-link to="/login" class="header_login">
              <span class="header_login_text">{{
                userinfo.name || "登录/注册"
              }}</span>
            </router-link>
          </template>
        </HeardTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide
              v-for="(categorys, index) in categorysArr"
              :key="index"
            >
              <a
                href="javascript:"
                class="link_to_food"
                v-for="(item, index) in categorys"
                :key="index"
              >
                <div class="food_container">
                  <img :src="baseImageUrl + item.image_url" alt />
                </div>
                <span>{{ item.title }}</span>
              </a>
            </swiper-slide>
          </swiper>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </nav>
        <!--首页附近商家-->
        <shoplist></shoplist>
      </section>
    </div>
  </div>
</template>

<script>
import HeardTop from "@/components/Heardtop/Heardtop";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { mapState } from "vuex";
import shoplist from "@/components/shoplist/shoplist";
export default {
  // 配置轮播信息
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
      },
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  components: {
    HeardTop,
    // 注册轮播组件
    Swiper,
    shoplist,
    SwiperSlide,
  },
  directives: {
    // 自定义指令
    swiper: directive,
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState(["address", "categorys", "userinfo"]), //映射 this.address 为 store.state.address
    categorysArr() {
      let arr = [];
      let minarr = [];
      this.categorys.forEach((element) => {
        if (minarr.length == 8) {
          minarr = [];
        }
        if (minarr.length == 0) {
          arr.push(minarr);
        }
        minarr.push(element);
      });
      return arr;
    },
  },
  // async mounted() {
  //   this.$store.dispatch("getShops");
  // },
};
</script>

<style scoped lang='stylus'>
@import '../../assets/stylus/mixins.styl';

&.msite { // 首页
  width: 100%;

  .msite_header {
    background-color: $dColor;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 55%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 18px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 18px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;
      }
    }
  }

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: $dColor;
        }
      }
    }
  }
}
</style>