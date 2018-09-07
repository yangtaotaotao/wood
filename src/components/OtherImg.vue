<template>
  <div class="img-wrapper car-column car-main-center">
    <img src="../common/images/icon-elec-contract.png" alt="">
    <span v-text="spanText"></span>
  </div>
</template>
<script>
export default {
  name: 'contract-img',

  props: {
    imgInfo: {}
  },

  data () {
    return {
      imgSrc: ''
    }
  },

  computed: {
    spanText () {
      if (this.imgInfo === 3 || this.imgInfo === 9) {
        return '未签订'
      } else {
        return '未生成'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/scss/mixin.scss";
.img-wrapper {
  flex-grow: 0;
  flex-shrink: 0;
  width: px2rem(120);
  height: px2rem(120);
  border: 1px solid #EEEEEE;
  border-radius: px2rem(6);
  margin-bottom: px2rem(14);
  margin-right: px2rem(30);
  font-size: px2rem(18);
  color: #333;
  img {
    width: 65%;
    margin-bottom: px2rem(6);
  }
}
</style>
