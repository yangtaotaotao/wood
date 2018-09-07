<template>
  <div class="wrapper" v-show="loading">
    <div class="spinner">
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
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    size: {
      type: Number,
      default: 30
    },
    loading: {
      default: false
    }
  },
  computed: {
    spinnerStyle () {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/scss/base.scss";
@import "../common/scss/mixin.scss";
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0);
  z-index: 9999;
}
.spinner {
  height: 50px;
  width: 50px;
  position: absolute;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: #ffffff;
  border-radius: 50%;
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
