<template>
  <div class="matte car-row car-main-center" v-show="showAlertLog">
    <div class="content car-column car-bg-white">
      <div class="content-title" v-text="title"></div>
      <div class="info-footer car-row">
        <div class="confirm car-row car-main-center car-bg-blue car-t-white" @click="confirm">确定</div>
        <div class="cancle car-row car-main-center car-t-blue" @click="goBack">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alert-log',

  props: {
    showAlertLog: false,
    title: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '确定'
    }
  },

  methods: {
    confirm () {
      this.$emit('confirm', true)
    },
    goBack () {
      this.$emit('goBack', true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/scss/mixin.scss";
.matte {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: .5);
  z-index: 11;
  align-items: center;
  justify-content: center;
}
.content {
  font-size: px2rem(26);
  color: #333;
  border-radius: 5px;
  width: 75%;
  padding-top: px2rem(60);
  justify-content: space-between;
  .content-title {
    text-align: center;
  }
  .info-footer {
    margin-top: px2rem(80);
    width: 100%;
    height: px2rem(70);
    font-size: px2rem(24);
    background: #EEF5F9;
    div {
      flex-grow: 1;
    }
  }
}
</style>
