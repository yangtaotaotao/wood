<template>
  <div class="infinite-scroll car-row car-main-center" v-show="isShow">
    <div class="car-row car-main-center" :style="spinnerStyle" v-show="loading">
      <svg class="circular" viewBox="0 0 60 60">
        <circle
          class="path"
          cx="30"
          cy="30"
          r="20"
          fill="none"
          stroke="rgb(14, 137, 237)"
        ></circle>
      </svg>
    </div>
    <span v-show="loading" v-text="loadingText"></span>
  </div>
</template>
<script>
import Scroll from '../util/scroll.js'
export default {
  name: 'inffinite-scroll',

  mixins: [Scroll],
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: '正在加载中...'
    },
    size: {
      type: Number,
      default: 30
    }
  },

  data () {
    return {
      scrollTop: false
    }
  },

  watch: {
    scrollTop (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('scrollTop', newValue)
      }
    }
  },

  computed: {
    spinnerStyle () {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      }
    }
  },

  methods: {
    onScroll () {
      if (this.loading) return
      const scroller = this.scroller
      const isWindow = scroller === window
      let scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
      let scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : scroller.scrollHeight
      this.scrollTop = scroller.scrollTop >= 20
      let h = scrollHeight - scrollTop - 20
      let sh = scroller.offsetHeight || window.innerHeight
      if (h <= sh) {
        this.$emit('load')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/scss/base.scss";
@import "../common/scss/mixin.scss";
.infinite-scroll {
  height: 40px;
  line-height: 40px;
  margin-top: px2rem(50);
}

.circular {
  width: 100%;
  height: 100%;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 3;
  stroke-linecap: round;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
