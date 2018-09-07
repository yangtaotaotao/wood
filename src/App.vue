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
