<template>
  <div class="big-img-matte car-row car-main-center" v-if="showBig" @click="closeImg">
    <div class="big-img">
      <img :src="`${URL}${biggerUrl}`" alt="" @touchmove="nextImg">
    </div>
    <!-- <div class="close" @click="closeMatte">
      <icon class="car-icon" icon="icon-guanbi"></icon>
    </div> -->
  </div>
</template>
<script>
import BASE_URL from '@/api/baseURL.js'
export default {
  name: 'bigger-img',

  props: {
    showBig: {
      type: Boolean,
      default: false
    },
    biggerUrl: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      URL: `${BASE_URL}/app/picView/`
    }
  },

  methods: {
    closeImg () {
      this.$emit('closeImg', true)
    },
    nextImg () {
      console.log(1)
      this.$emit('nextImg', true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/scss/mixin.scss";
.big-img-matte {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: .7);
  z-index: 11111;
  align-items: center;
  justify-content: center;
  .big-img {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 11112;
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
    img {
      max-width: 100%;
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>
