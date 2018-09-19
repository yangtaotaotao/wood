<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-group car-t-white">
        <div class="input-group car-row car-align-center username">
          <icon icon="icon-yonghu"></icon>
          <input type="text" placeholder="请输入用户名" v-model="username" @blur="usernameRule(username)">
        </div>
        <div class="input-group car-row car-align-center password">
          <icon icon="icon-mima1"></icon>
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="car-row car-align-center">
          <div class="input-group car-row car-align-center captcha">
            <icon icon="icon-yanzhengyanzhengma"></icon>
            <input type="text" placeholder="请输入验证码" v-model="captcha">
          </div>
          <div class="img-captcha">
            <img :src="imgSrc" alt="如果看不清楚，请单击图片刷新！" @click="refreshCode">
          </div>
        </div>
      </div>
      <div class="login-btn" @click="loginBtn">登 录</div>
      <!-- <div class="login-point">
        <span>快速注册</span>
        <span>|</span>
        <span>忘记密码？</span>
      </div> -->
      <br/>
      <!-- <input type="button" value="点击调用java代码" onclick="window.AndroidJsDeviceSetting.showToast('aaaaaaaaaa')"/>  -->
    </div>
  </div>
</template>
<script>
import { Icon } from 'components'
import BASE_URL from '@/api/baseURL.js'
import { Login, isLogined } from '../../api/getData.js'
const CAPTCHA = `${BASE_URL}/app/captcha?t=`
export default {
  name: 'login',

  components: {
    Icon
  },

  data () {
    return {
      username: '',
      password: '',
      captcha: '',
      imgSrc: CAPTCHA + new Date().getTime()
    }
  },

  activated () {
    // this.isLogin()
  },

  methods: {
    browserRedirect () {
      var sUserAgent = navigator.userAgent.toLowerCase()
      var bIsIpad = sUserAgent.match(/ipad/i) === 'ipad'
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os'
      var bIsMidp = sUserAgent.match(/midp/i) === 'midp'
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
      var bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb'
      var bIsAndroid = sUserAgent.match(/android/i) === 'android'
      var bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce'
      var bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile'
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // 跳转移动端页面
        return true
      } else {
        return false
      }
    },
    isLogin () {
      isLogined().then(res => {
        if (!res.data.success) {
          let userId = localStorage.getItem('userId')
          window.AndroidJsDeviceSetting.deleteUserAlias(userId)
          localStorage.removeItem('userId')
        }
      })
    },
    // 验证手机号码
    usernameRule (username) {
      // let usernameRule = /^1(3|4|5|6|7|8)\d{9}$/
      // if (!usernameRule.test(username)) {
      //   this.$store.dispatch('setToast', {text: '请输入正确的手机号'})
      //   return false
      // } else {
      //   return true
      // }
    },
    // 刷新验证码
    refreshCode () {
      this.imgSrc = CAPTCHA + new Date().getTime()
    },
    loginBtn () {
      let {username, password, captcha} = this
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      /* eslint-disable */
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      var deviceId
      if (this.browserRedirect()) {
        if (isAndroid) {
          /* eslint-disable */
          deviceId = window.AndroidJsDeviceSetting.getDeviceId()
        } else {
          /* eslint-disable */
          deviceId = getDeviceld()
        }
      } else {
        deviceId = 'Aoy6l7TxJxfDehouJ1IRwCFRlI3gKq_48iQx9YyQWtJi'
      }
      if (username && password && captcha) {
        Login({username, password, captcha, deviceId, rememberMe: 1}).then(res => {
          let success = res.data.success
          let message = res.data.message
          if (success) {
            this.$router.push(`/index?userType=${res.data.data.userType}`)
            let userId = res.data.data.userId
            localStorage.setItem('userId', userId)
            if (this.browserRedirect()) {
              if (isAndroid) {
                window.AndroidJsDeviceSetting.setUserAlias(userId)
              } else {
                setUserAlias(userId)
              }
            }
          } else {
            this.$store.dispatch('setToast', {text: message})
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.login-wrapper {
  width: 100%;
  height: 100%;
  background: url('../../common/images/login_bg.png') no-repeat;
  background-size: 100% 100%;
  padding-top: px2rem(264);
  display: flex;
  justify-content: center;
}
.login-content {
  width: px2rem(536);
  .input-group {
    width: 100%;
    height: px2rem(58);
    border: 1px solid #B6D6EC;
    border-radius: px2rem(6);
    font-size: px2rem(20);
    padding: 0 px2rem(14);
    margin-bottom: px2rem(36);
    .icon {
      font-size: px2rem(32);
      color: #D0E3F0 !important;
      flex-grow: 0;
      flex-shrink: 0;
    }
    input {
      height: 100%;
      color: #D0E3F0 !important;
      flex-grow: 1;
      text-indent: px2rem(10);
      background: rgba($color: #000000, $alpha: 0)
    }
  }
  .captcha {
    width: px2rem(316);
    margin-bottom: 0;
  }
  .img-captcha {
    width: px2rem(204);
    height: px2rem(58);
    margin-left: px2rem(16);
    border-radius: px2rem(6);
    img {
      width: 100%;
    }
  }
  .login-btn {
    width: 100%;
    height: px2rem(58);
    line-height: px2rem(58);
    text-align: center;
    border-radius: px2rem(6);
    font-size: px2rem(24);
    color: #2E6F99;
    background: #EAF2F8;
    margin-top: px2rem(50);
  }
  .login-point {
    height: px2rem(30);
    line-height: px2rem(30);
    font-size: px2rem(24);
    color: #D0E3F0;
    text-align: center;
    margin-top: px2rem(58);
    span:nth-child(2) {
      margin: 0 px2rem(50);
    }
  }
}
</style>
