<template>
  <div class="title">
    <span v-text="title"></span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'car-loan-title',

  props: {
    /**
     * 显示文字
     * @type {Object}
     */
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/scss/mixin.scss";
.title {
  flex: 0 0 1em;
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  &::before {
    content: '';
    flex-shrink: 0;
    display: block;
    height: 14px;
    width: px2rem(8);
    margin-right: px2rem(6);
    background: #2E6F99;
    border-radius: 3px;
  }
  span {
    white-space: nowrap;
  }
}
</style>
