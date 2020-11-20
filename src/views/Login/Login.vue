<!-- 登录 -->
<template>
  <div>
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2118791_peoci0x5cqt.css"
    />
    <!--on表示显示，off表示关闭-->
    <div class="off">
      <section class="loginContainer">
        <div class="loginInner">
          <div class="login_header">
            <h2 class="login_logo">八戒外卖</h2>
            <div class="login_header_title">
              <a
                href="javascript:;"
                :class="loginWay ? 'on' : ''"
                @click="loginWay = true"
                >短信登录</a
              >
              <a
                href="javascript:;"
                :class="loginWay ? '' : 'on'"
                @click="loginWay = false"
                >密码登录</a
              >
            </div>
          </div>
          <div class="login_content">
            <form>
              <div :class="loginWay ? 'on' : ''">
                <section class="login_message">
                  <input
                    type="tel"
                    maxlength="11"
                    placeholder="手机号"
                    v-model="phoneNumber"
                  />
                  <button
                    :disabled="(!isRightPhone && time == 0) || time > 0"
                    class="get_verification"
                    :class="{ curr: isRightPhone && time == 0 }"
                    @click="getVerCode"
                  >
                    {{ time > 0 ? `(重新发送)${time}s` : "获取验证码" }}
                  </button>
                </section>
                <section class="login_verification">
                  <input
                    type="tel"
                    maxlength="8"
                    placeholder="验证码"
                    v-model="verifCode"
                  />
                </section>
                <section class="login_hint">
                  温馨提示：未注册八戒外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </div>
              <div :class="loginWay ? '' : 'on'">
                <section>
                  <section class="login_message">
                    <input
                      type="tel"
                      maxlength="11"
                      placeholder="手机/邮箱/用户名"
                      v-model="userName"
                    />
                  </section>
                  <section class="login_verification">
                    <input
                      :type="paswod ? 'tel' : 'password'"
                      maxlength="8"
                      placeholder="密码"
                      v-model="userPaswod"
                    />
                    <div
                      class="switch_button"
                      @click="paswod = !paswod"
                      :class="paswod ? 'on' : 'off'"
                    >
                      <div class="switch_circle"></div>
                      <span class="switch_text">{{
                        paswod ? "abc" : "..."
                      }}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <input
                      type="text"
                      maxlength="11"
                      placeholder="验证码"
                      v-model="verifCode"
                    />
                    <img
                      class="get_verification"
                      :src="imgCaptchaSrc"
                      alt="captcha"
                      @click="getNew"
                    />
                  </section>
                </section>
              </div>
              <button class="login_submit" @click="login">登录</button>
            </form>
            <a href="javascript:;" class="about_us">关于我们</a>
          </div>
          <router-link to="/profile" class="go_back">
            <i class="iconfont icon-jiantouzuo"></i>
          </router-link>
        </div>
        <Alert
          v-if="showAlert"
          :alertText="alertText"
          @closeTip="closeTip"
        ></Alert>
      </section>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alerttip/Alerttip";
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "@/api";
export default {
  data() {
    return {
      loginWay: true, //登录方式切换
      phoneNumber: "", //验证手机号码
      time: 0, //验证码倒计时
      paswod: false, //密码的显示与隐藏
      showAlert: false, //弹出框
      alertText: "请确定！", //弹出信息
      verifCode: "", //验证码
      userName: "", //用户名
      userPaswod: "", //用户密码
      imgCaptchaSrc: "",
    };
  },
  components: {
    Alert,
  },
  computed: {
    isRightPhone() {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(this.phoneNumber);
    },
  },
  mounted() {
    this.imgCaptchaSrc = "http://localhost:4000/captcha";
  },
  methods: {
    //进行异步请求
    async getVerCode() {
      this.time = 59;
      let timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(timer);
        }
      }, 1000);
      let rusult = await reqSendCode(this.phoneNumber);
      console.log(rusult);
      if (rusult.code == 1) {
        this.alertTip(rusult.msg);
      }
    },
    alertTip(newText) {
      this.showAlert = true;
      this.alertText = newText;
    },
    closeTip() {
      this.showAlert = false;
    },
    getNew() {
      this.imgCaptchaSrc = `http://localhost:4000/captcha?timeID=${new Date()}`;
    },
    //异步登录
    async login() {
      let result;
      let {
        loginWay,
        isRightPhone,
        alertTip,
        verifCode,
        userName,
        userPaswod,
        imgCaptchaSrc,
        phone,
        code,
      } = this;
      if (loginWay) {
        if (!isRightPhone) {
          alertTip("手机号码不正确");
          return;
        } else if (!verifCode) {
          alertTip("验证码不正确");
          return;
        }
        result = await reqSmsLogin(phone, code);
      } else {
        if (!userName) {
          alertTip("用户名必须指定");
          return;
        } else if (!userPaswod) {
          alertTip("密码必须指定");
          return;
        } else if (!imgCaptchaSrc) {
          alertTip("请输入正确的验证码");
          return;
        }
        // 发送ajax请求密码登陆
        result = await reqPwdLogin({
          name: userName,
          pwd: userPaswod,
          captcha: verifCode,
        });
      }

      // 根据结果数据处理
      if (result.code === 0) {
        const user = result.data;
        // 将user保存到vuex的state
        this.$store.dispatch("recordUser", user);
        // 去个人中心界面
        this.$router.replace("/profile");
      } else {
        // 显示新的图片验证码
        this.getNew();
        // 显示警告提示
        const msg = result.msg;
        this.alertTip(msg);
      }
    },
  },
};
</script>

<style scoped lang='stylus'>
@import '../../assets/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: $dColor;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: $dColor;
            font-weight: 700;
            border-bottom: 2px solid $dColor;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid $dColor;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }

            .curr {
              color: black;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: $dColor;

                .switch_circle {
                  transform: translateX(27px);
                }
              }

              >.switch_circle {
                // transform: translateX(27px);
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: $dColor;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 38px;
          margin-top: 30px;
          border-radius: 4px;
          background: $dColor;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 38px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>