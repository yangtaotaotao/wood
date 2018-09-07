<template lang="html">
  <div class="appbar ">
    <div class="left car-row car-main-center" @click="back()">
      <slot name="left"></slot>
    </div>
    <div class="app-title">
      <slot>
        <span v-text="title"></span>
      </slot>
    </div>
    <div class="right car-row car-main-center">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import {Icon} from 'components'

export default {
  name: 'app-title',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import "../common/scss/mixin.scss";
.appbar {
  position: relative;
  color: #fff;
  background: rgb(46, 111, 153);
  font-size: px2rem(32);
  height: px2rem(88);
  line-height: px2rem(88);
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 px2rem(20);
  .left,
  .right {
    position: absolute;
    top: 0;
    bottom: 0;
    padding-left: 10px;
    padding-right: 10px;
    font-size: px2rem(32);
    align-items: center;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .app-title {
    text-align: center;
    height: px2rem(88);
    line-height: px2rem(88);
  }
  .car-icon {
    font-size: px2rem(40);
  }
}
</style>
