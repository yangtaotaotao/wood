<template>
  <div class="wrapper car-column">
    <div class="header-top car-row car-bg-blue car-t-white">
      <span>农投小贷融资业务平台</span>
      <div class="point" @click="closeApp">
        <svg class="car-icon" aria-hidden="true">
          <use xlink:href="#icon-msnui-poweroff"></use>
        </svg>
        <!-- <div class="dot"></div> -->
      </div>
    </div>
    <div class="index-content car-column">
      <div class="swiper-wrapper car-t-white">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide>
            <img src="../../common/images/swiper1.png" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../../common/images/swiper1.png" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../../common/images/swiper1.png" alt="">
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination car-t-blue"  slot="pagination"></div>
        </swiper>
      </div>
      <div class="module car-bg-white" v-if="userType === 3">
        <div class="module-title">我的服务</div>
        <div class="module-info">
          <div class="module-item car-column car-main-center" @click="contractList">
            <img src="../../common/images/home1.png" alt="">
            <span class="car-t-dgray">合同签订</span>
          </div>
        </div>
      </div>
      <div class="module car-bg-white" v-else>
        <div class="module-title">我的服务</div>
        <div class="module-info">
          <div class="module-item border-right car-column car-main-center" @click="toDoList">
            <img src="../../common/images/wait.png" alt="">
            <span class="car-t-dgray">我的待办</span>
          </div>
          <div class="module-item module-border car-column car-main-center" @click="DoneList">
            <img src="../../common/images/done.png" alt="">
            <span class="car-t-dgray">我的已办</span>
          </div>
          <div class="module-item car-column car-main-center" @click="signInfo" v-if="userType === 5">
            <img src="../../common/images/home8.png" alt="">
            <span class="car-t-dgray">渠道盖章</span>
          </div>
        </div>
      </div>
      <!-- <div class="module car-bg-white">
        <div class="module-title">我的服务</div>
        <div class="module-info">
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home1.png" alt="">
            <span class="car-t-dgray">合同签订</span>
          </div>
          <div class="module-item module-border car-column car-main-center">
            <img src="../../common/images/home2.png" alt="">
            <span class="car-t-dgray">车辆置换查看</span>
          </div>
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home3.png" alt="">
            <span class="car-t-dgray">车辆赎回查看</span>
          </div>
        </div>
      </div> -->
      <!-- <div class="module car-bg-white">
        <div class="module-title">我的工作</div>
        <div class="module-info">
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home4.png" alt="">
            <span class="car-t-dgray">放款审核</span>
          </div>
          <div class="module-item module-border car-column car-main-center">
            <img src="../../common/images/home5.png" alt="">
            <span class="car-t-dgray">车辆置换审核</span>
          </div>
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home6.png" alt="">
            <span class="car-t-dgray">车辆赎回审核</span>
          </div>
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home7.png" alt="">
            <span class="car-t-dgray">出纳放款确认</span>
          </div>
          <div class="module-item module-border car-column car-main-center">
            <img src="../../common/images/home8.png" alt="">
            <span class="car-t-dgray">按期收款确认</span>
          </div>
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home9.png" alt="">
            <span class="car-t-dgray">提前还款确认</span>
          </div>
        </div>
      </div> -->
      <div class="module bottom car-bg-white">
        <div class="module-title">信息查询</div>
        <div class="module-info">
          <div class="module-item car-column car-main-center" @click="customerInfo">
            <img src="../../common/images/home10.png" alt="">
            <span class="car-t-dgray">客户信息</span>
          </div>
          <div class="module-item module-border car-column car-main-center" @click="loanInfo">
            <img src="../../common/images/home11.png" alt="">
            <span class="car-t-dgray">借款信息</span>
          </div>
          <div class="module-item car-column car-main-center" @click="eleContract">
            <img src="../../common/images/home12.png" alt="">
            <span class="car-t-dgray">电子合同</span>
          </div>
          <div class="module-item car-column car-main-center" @click="repaymentInfo">
            <img src="../../common/images/home13.png" alt="">
            <span class="car-t-dgray">还款计划</span>
          </div>
          <div class="module-item module-border car-column car-main-center" @click="redeemInfo">
            <img src="../../common/images/home14.png" alt="">
            <span class="car-t-dgray">质押清单</span>
          </div>
          <div class="module-item car-column car-main-center" @click="userInfo">
            <img src="../../common/images/home17.png" alt="">
            <span class="car-t-dgray">我的资料</span>
          </div>
        </div>
      </div>
      <!-- <div class="module car-bg-white">
        <div class="module-title">报表分析</div>
        <div class="module-info car-row">
          <div class="module-item car-column car-main-center">
            <img src="../../common/images/home15.png" alt="">
            <span class="car-t-dgray">业务报表</span>
          </div>
          <div class="module-item module-border right0 car-column car-main-center">
            <img src="../../common/images/home16.png" alt="">
            <span class="car-t-dgray">财务报表</span>
          </div>
        </div>
      </div> -->
    </div>
    <alert-log title="您确定要退出吗？" :showAlertLog="showAlertLog" @confirm="confirm" @goBack="goBack"></alert-log>
  </div>
</template>
<script>
import {AlertLog} from 'components'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { Logout } from '../../api/getData.js'

export default {
  name: 'index',

  components: {
    swiper, swiperSlide, AlertLog
  },

  data () {
    return {
      showAlertLog: false,
      userType: parseInt(this.$route.query.userType),
      swiperOption: {// 以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象,假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        direction: 'horizontal',
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            let opacity = ''
            let width = ''
            let height = ''
            let borderRadius = ''
            let paginationStyle = ''
            let html = ''
            for (let i = 1; i <= total; i++) {
              if (i === current) {
                width = '1rem'
                height = '0.375rem'
                opacity = '1'
                borderRadius = '7px'
              } else {
                width = '0.375rem'
                height = '0.375rem'
                opacity = '0.7'
                borderRadius = '50%'
              }
              paginationStyle = `background:#fff;opacity:${opacity};width:${width};height:${height};border-radius:${borderRadius};margin-right:0.3125rem;`
              html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`
            }
            return html
          }
        }
      }
    }
  },

  methods: {
    // 客户信息
    customerInfo () {
      this.$router.push('/customer/customerList')
    },
    // 借款信息
    loanInfo () {
      this.$router.push('/loanInfo/loanInfoList')
    },
    // 质押清单
    redeemInfo () {
      this.$router.push('/redeem/redeemList')
    },
    // 我的待办
    toDoList () {
      this.$router.push('/process/queryTodoList')
    },
    // 我的已办
    DoneList () {
      this.$router.push('/process/queryDoneList')
    },
    // 合同签订
    contractList () {
      this.$router.push('/contract/contractList')
    },
    // 还款计划
    repaymentInfo () {
      this.$router.push('/repayment/repaymentList')
    },
    // 电子合同
    eleContract () {
      this.$router.push('/eleCon/eleContract')
    },
    // 我的资料
    userInfo () {
      this.$router.push('/user/userInfo')
    },
    signInfo () {
      this.$router.push('/sign/signInfoList')
    },
    // 退出登录
    closeApp () {
      this.showAlertLog = true
    },
    // 确定退出
    confirm () {
      Logout().then(res => {
        if (res.data.success) {
          this.showAlertLog = false
          var userId = localStorage.getItem('userId')
          var u = navigator.userAgent
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
          /* eslint-disable */
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
          if (isAndroid) {
            /* eslint-disable */
            window.AndroidJsDeviceSetting.deleteUserAlias(userId)
          } else {
            /* eslint-disable */
            deleteUserAlias(userId)
          }
          localStorage.removeItem('userId')
          this.$router.push('/login')
        }
      })
    },
    // 取消登录
    goBack () {
      this.showAlertLog = false
    }
  },

  mounted () {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(0, 1000, false)
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
.wrapper {
  height: 100vh;
  background: #eeeeee;
}
.header-top {
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: px2rem(88);
  position: relative;
  padding: 0 px2rem(20);
  span {
    text-align: center;
    font-size: px2rem(32);
  }
  .point {
    position: absolute;
    right: px2rem(20);
    .car-icon {
      font-size: px2rem(30);
    }
    .dot {
      position: absolute;
      right: px2rem(-5);
      top: px2rem(-5);
      width: px2rem(10);
      height: px2rem(10);
      border-radius: 50%;
      background: #FF0000;
    }
  }
}
.index-content {
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.swiper-wrapper {
  height: px2rem(300);
  flex-grow: 0;
  flex-shrink: 0;
  img {
    width: 100%;
  }
}
.module {
  padding: px2rem(28) px2rem(20);
  padding-bottom: 0;
  border-bottom: 1px solid #e0e0e1;
  margin-bottom: px2rem(14);
  .module-title {
    font-size: px2rem(24);
    color: #333;
    margin-bottom: px2rem(24);
  }
  .module-info {
    display: flex;
    flex-flow: row wrap;
    .module-item {
      flex-grow: 0;
      flex-shrink: 0;
      width: px2rem(200);
      font-size: px2rem(18);
      margin-bottom: px2rem(32);
      img {
        width: px2rem(94);
        height: px2rem(94);
        margin-bottom: px2rem(14);
      }
      span {
        font-size: px2rem(18);
      }
    }
    .module-border {
      border-left: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;
    }
    .border-right {
      border-right: 1px solid #eeeeee;
    }
    .right0 {
      border-right: 0;
    }
  }
}
.module:last-child {
  margin-bottom: 0;
  flex-grow: 1;
}
</style>
