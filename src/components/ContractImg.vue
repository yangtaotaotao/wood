<template>
  <div class="img-wrapper car-column car-main-center">
    <a class="car-column car-main-center" :href="`${URL}${imgInfo.fileId}`" download="">
      <img src="../common/images/icon-elec-contract-success.png" alt="">
      <span v-text="spanText"></span>
    </a>
  </div>
</template>
<script>
import BASE_URL from '@/api/baseURL.js'
export default {
  name: 'contract-img',

  props: {
    imgInfo: {}
  },

  data () {
    return {
      imgSrc: '',
      URL: `${BASE_URL}/app/readRes/`
    }
  },

  computed: {
    spanText () {
      if (this.imgInfo.attType === 3 || this.imgInfo.attType === 9) {
        return '签订成功'
      } else {
        return '点击查看'
      }
    }
  },

  methods: {
    // biggerImg () {
    //   if (this.imgInfo.fileExt !== 'PDF' && this.imgInfo.fileExt !== 'DOC' && this.imgInfo.fileExt !== 'DOCX') {
    //     this.$emit('biggerImg', URL + this.imgInfo.fileId)
    //   }
    // }
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
