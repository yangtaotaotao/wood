<template>
    <div class="img-wrapper">
      <a class="car-column car-main-center" v-if="imgInfo.fileExt === 'PDF' || imgInfo.fileExt === 'DOC' || imgInfo.fileExt === 'DOCX'" :href="`${URL}${imgInfo.fileId}`" download="">
        <img :src="imgURL" alt="">
      </a>
      <img v-else :src="imgURL" alt="" @click="biggerImg">
  </div>
</template>
<script>
import BASE_URL from '@/api/baseURL.js'
export default {
  name: 'info-img',

  props: {
    imgInfo: {}
  },

  data () {
    return {
      imgSrc: '',
      URL: `${BASE_URL}/app/picView/`
    }
  },

  computed: {
    imgURL () {
      if (this.imgInfo) {
        if (this.imgInfo.fileExt === 'PDF') {
          return require('../common/images/icon-pdf.png')
        } else if (this.imgInfo.fileExt === 'DOC' || this.imgInfo.fileExt === 'DOCX') {
          return require('../common/images/icon-docx.png')
        } else {
          return this.URL + this.imgInfo.fileId
        }
      }
    }
  },

  methods: {
    biggerImg () {
      if (this.imgInfo.fileExt !== 'PDF' && this.imgInfo.fileExt !== 'DOC' && this.imgInfo.fileExt !== 'DOCX') {
        this.$emit('biggerImg', this.imgInfo.fileId)
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
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
