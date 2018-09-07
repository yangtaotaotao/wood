<template>
  <div class="wrapper car-column">
    <div class="contract-top">
      <app-title title="借款合同">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
    </div>
    <div class="contract-main" v-html="contentHtml"></div>
    <div class="contract-bottom" @click="agreeSign">
      我已阅读并同意签署
    </div>
    <div class="matte car-column" v-if="showMatte">
      <div class="content">
        <div class="content-top">签署电子合同</div>
        <div class="content-main car-column">
          <div class="main-point car-row">
            <icon class="car-icon" icon="icon-tixianwancheng"></icon>
            <span>已向您的手机号<span>{{phone}}</span>发送短信验证码</span>
          </div>
          <div class="main-verify car-row">
            <input type="text" placeholder="请输入验证码" v-model="msgCode">
            <button :disabled="isDisabled" class="car-t-white" :class="{'can-click': !isDisabled}" @click="agreeSign" v-text="verifyPoint"></button>
          </div>
          <div class="main-bottom" @click="confirmSign">确定</div>
        </div>
      </div>
      <div class="close" @click="closeMatte">
        <icon class="car-icon" icon="icon-guanbi"></icon>
      </div>
    </div>
    <div class="matte car-column" v-if="signResponse">
      <div class="content">
        <div class="content-top">电子合同签署结果</div>
        <div class="content-main car-column">
          <div class="res-icon car-column" v-if="signTrue">
            <icon class="car-icon" icon="icon-tixianwancheng"></icon>
            <span class="res-sign">电子合同签署成功</span>
          </div>
          <div class="res-icon car-column" v-else>
            <icon class="car-icon car-red" icon="icon-shibaibaocuo"></icon>
            <span class="res-sign">电子合同签署失败</span>
          </div>
          <div class="main-bottom" @click="goBack">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, AppTitle } from 'components'
import {queryContractDetail, isLogined, sendSignCode, signContract} from '@/api/getData.js'
export default {
  name: 'contract',

  components: {
    Icon, AppTitle
  },

  data () {
    return {
      isDisabled: true,
      showMatte: false,
      phone: '',
      verifyPoint: '60s后重新发送',
      seconds: 60,
      contentHtml: '',
      signResponse: false,
      msgCode: '',
      signTrue: false
    }
  },

  methods: {
    // 同意签署
    agreeSign () {
      this.showMatte = true
      console.log(this.seconds)
      if (this.seconds === 60) {
        let loanId = this.$route.params.loanId
        isLogined().then(res => {
          if (!res.data.success) {
            this.$router.push('/login')
          } else {
            sendSignCode({loanId}).then(res => {
              if (res.data.success) {
                this.$store.dispatch('setToast', {text: res.data.message})
                this.getVerify()
              } else {
                this.$store.dispatch('setToast', {text: res.data.message})
              }
            })
          }
        })
      }
    },
    // 确定 验证验证码
    confirmSign () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          let msgCode = this.msgCode
          let loanId = this.$route.params.loanId
          signContract({msgCode, loanId}).then(res => {
            if (res.data.success) {
              this.showMatte = false
              this.signResponse = true
              this.signTrue = res.data.success
            } else if (res.data.success === false && res.data.message === '签订失败') {
              this.showMatte = false
              this.signResponse = true
              this.signTrue = res.data.success
            } else {
              this.$store.dispatch('setToast', {text: res.data.message})
            }
          })
        }
      })
    },
    // 验证码倒计时
    getVerify () {
      let s = 60
      let _this = this
      let timer = setInterval(() => {
        _this.isDisabled = true
        if (s > 0) {
          s--
          _this.seconds = s
          _this.verifyPoint = `${s} s后重新发送`
        } else {
          clearInterval(timer)
          _this.verifyPoint = '获取验证码'
          _this.isDisabled = false
          _this.seconds = 60
        }
      }, 1000)
    },
    // 关闭弹出层
    closeMatte () {
      this.showMatte = false
    },
    // 返回
    goBack () {
      this.$router.back()
    },
    getInfo () {
      let loanId = this.$route.params.loanId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryContractDetail({loanId}).then(res => {
            if (res.data.success) {
              this.contentHtml = res.data.data
              this.phone = res.data.message
            } else {
              this.$store.dispatch('setToast', {text: res.data.message})
            }
          })
        }
      })
    }
    // getVerify () {
    // }
  },

  mounted () {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
.wrapper {
  height: 100%;
  background: #ffffff;
  .contract-top {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .contract-main {
    flex-grow: 1;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    font-size: px2rem(28);
    color: #606266;
    padding: px2rem(30) px2rem(20);
    li {
      margin-bottom: px2rem(20);
    }
  }
  .contract-bottom {
    flex-grow: 0;
    flex-shrink: 0;
    margin: auto;
    text-align: center;
    border-radius: px2rem(8);
    width: 85%;
    height: px2rem(80);
    line-height: px2rem(80);
    background: #409eff;
    color: #ffffff;
    font-size: px2rem(30);
    margin-bottom: px2rem(30);
  }
}
.matte {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: .5);
  z-index: 11;
  align-items: center;
  .close {
    .car-icon {
      font-size: px2rem(60);
      margin-top: px2rem(50);
      color: #fff;
    }
  }
  .content {
    width: 90%;
    margin-top: px2rem(200);
  }
  .content-top {
    height: px2rem(110);
    line-height: px2rem(110);
    text-align: center;
    background: #ecf4ff;
    font-size: px2rem(38);
    font-weight: 600;
    color: #178cfd;
    border-radius: px2rem(10) px2rem(10) 0 0;
  }
  .content-main {
    background: #fff;
    padding: px2rem(30) px2rem(46) px2rem(50);
    border-radius: 0 0 px2rem(10) px2rem(10);
    .main-point {
      font-size: px2rem(26);
      .car-icon {
        margin: px2rem(5) px2rem(10) 0 0;
      }
      span {
        line-height: 1.5;
        color: #606266;
      }
    }
    .main-verify {
      color: #606266;
      margin-top: px2rem(30);
      justify-content: space-between;
      input {
        width: px2rem(200);
        height: px2rem(60);
        font-size: px2rem(22);
        text-indent: px2rem(20);
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }
      button {
        width: px2rem(240);
        height: px2rem(60);
        font-size: px2rem(22);
        text-align: center;
        border-radius: 4px;
        background: #a0cfff;
      }
    }
    .main-bottom {
      width: 80%;
      height: px2rem(60);
      text-align: center;
      line-height: px2rem(60);
      background: #409eff;
      color: #fff;
      font-size: px2rem(24);
      border-radius: px2rem(20);
      margin: auto;
      margin-top: px2rem(50);
    }
  }
}
.can-click {
  background: #409eff!important;
}
.res-icon {
  align-items: center;
  margin-bottom: px2rem(40);
  margin-top: px2rem(20);
  .car-icon {
    font-size: px2rem(60);
    margin-bottom: px2rem(30);
  }
  .res-sign {
    font-size: px2rem(30);
  }
}
input::-webkit-input-placeholder {
  // WebKit browsers
  color: #606266 !important;
}
input:-moz-placeholder {
  // Mozilla Firefox 4 to 18
  color: #606266 !important;
}
input::-moz-placeholder {
  // Mozilla Firefox 19+/
  color: #606266 !important;
}
input:-ms-input-placeholder {
  // Internet Explorer 10+/
  color: #606266 !important;
}
</style>
