<template lang="html">
  <div id="app">
    <loading :loading="isLoadingShow" key="loading"></loading>
    <toast :toast="toast"></toast>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {Toast, Icon, Loading} from 'components'

import beforeMount from './util/beforeMount'
import {isLogined} from '@/api/getData.js'
export default {
  name: 'app',

  data () {
    return {}
  },

  components: {
    Loading, Toast, Icon
  },

  methods: {
    isLogin () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
    },
    // 时间格式化
    /**
     * 时间戳转换日期
     * @param <int> unixTime    待时间戳(毫秒)
     * @param <int>  timeZone   时区
     */
    formatDate (unixTime, timeZone) {
      if (typeof (timeZone) === 'number') {
        unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60
      }
      let time
      let secondsBack = unixTime // 返回的时间戳
      let date = new Date(secondsBack) // 返回的时间戳转为日期对象
      let secondsNow = new Date().getTime() // 当前的时间戳
      let secondsStart = new Date(new Date().toLocaleDateString()).getTime() // 今天凌晨的时间戳
      let nowStart = secondsNow - secondsStart // 当前时间到当天凌晨的时间差
      let nowBack = secondsNow - secondsBack // 当前时间到返回时间的时间差
      let oneDay = 24 * 60 * 60 * 1000 // 一天的毫秒数
      let oneWeek = 7 * 24 * 60 * 60 * 1000 // 一周的毫秒数
      if (nowBack < nowStart) { // 返回的日前到当前的时间差比现在到凌晨的时间小 为今日
        time = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + date.getMinutes()
      } else if (nowStart < nowBack && nowBack < (oneDay + nowStart)) {
        // 现在到凌晨的时间 < 时间差 < 昨天凌晨到现在的时间
        time = '昨天'
      } else if ((oneDay + nowStart) < nowBack && nowBack < (oneWeek + nowStart)) {
        let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        time = arr[date.getDay()]
      } else {
        time = ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
      }
      return time
    },
    ...mapMutations([
      'SET_LOADING_SHOW'
    ])
  },

  computed: {
    ...mapState('home', ['tabs']),
    ...mapState([
      'isLoadingShow', 'toast'
    ])
  },
  watch: {
    $route (to, from) {
      this.SET_LOADING_SHOW({isShow: false})
      // this.isLogin()
    }
  },
  beforeMount () {
    beforeMount()
  },
  mounted (state) {
    this.$el.style.height = `${window.innerHeight}px`
    isLogined().then(res => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
    let test1 = 1537203030000 // 2018.9.18 00:50:30
    console.log('今天-------------------')
    console.log(this.formatDate(test1))

    let test2 = 1537199999000 // 2018.9.17 01:50:30
    console.log('昨天-------------------')
    console.log(this.formatDate(test2))

    let test3 = 1537033830000 // 2018.9.16 01:50:30
    console.log('前天 周日---------------')
    console.log(this.formatDate(test3))

    let test4 = 1536623430000 // 2018.9.11 07:50:30
    console.log('上周二 上午----------------')
    console.log(this.formatDate(test4))

    let test5 = 1536663030000 // 2018.9.11 18:50:30
    console.log('上周二 下午')
    console.log(this.formatDate(test5))

    let test6 = 1536576630000 // 2018.9.10 18:50:30
    console.log('以前-------------')
    console.log(this.formatDate(test6))
  }
}
</script>

<style lang="scss">
@import "./common/scss/reset.css";
@import "./common/scss/base.scss";
@import "./common/scss/mixin.scss";
#app {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  max-width: 750px;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  color: #212121;
  background: #FFF;
}
.packet {
  display: flex;
  align-items: center;
  width: px2rem(450);
  height: px2rem(90);
  background: #FA9D3B;
  position: absolute;
  right: px2rem(30);
  bottom: px2rem(300);
  border-radius: 5px;
  font-size: px2rem(28);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .3);
  .img-wrapper {
    width: 88%;
    height: 100%;
    align-items: center;
    position: relative;
    .packet-point {
      font-size: px2rem(28);
    }
    .packet-icon {
      width: px2rem(90);
      position: absolute;
      bottom: 0;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, .3);
    }
    .packet-text {
      margin-left: px2rem(110);
      font-size: px2rem(26);
    }
  }
  .icon-wrapper {
    align-items: center;
    .icon {
      font-size: px2rem(40);
    }
  }
}
.hide-packet {
  // left: px2rem(200);
  transition: .3s linear;
  transform: translateX(px2rem(390));
}
.show-packet {
  transition: .3s linear;
  transform: translateX(0);
}
.packet {
  // animation:myfirst 5s;
  // -moz-animation:myfirst 5s; /* Firefox */
  // -webkit-animation:myfirst 5s; /* Safari and Chrome */
  // -o-animation:myfirst 5s; /* Opera */
  // transform: translateX(px2rem(400));
  }

// @keyframes myfirst
// {
// from {left: px2rem(110);}
// to {left: px2rem(310);}
// }

// @-moz-keyframes myfirst
// {
// from {left: px2rem(110);}
// to {left: px2rem(310);}
// }

// @-webkit-keyframes myfirst
// {
// from {left: px2rem(110);}
// to {left: px2rem(310);}
// }

// @-o-keyframes myfirst
// {
// from {left: px2rem(110);}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0
// to {left: px2rem(310);}
// }
</style>
