<template>
  <div class="search-title car-bg-blue">
    <div class="search-back" @click="goBack">
      <svg class="car-icon" aria-hidden="true">
        <use xlink:href="#icon-back"></use>
      </svg>
    </div>
    <div class="search-input car-row">
      <svg class="car-icon t-gray" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <input class="t-gray" :placeholder="placeholderVal" v-model="inputValue"/>
      <!-- <svg class="icon" aria-hidden="true" @click="cancel">
        <use xlink:href="#icon-guanbi"></use>
      </svg> -->
    </div>
    <div class="search-btn car-t-white" @click="handelSearch(inputValue)">筛选</div>
  </div>
</template>
<script>
import {Icon} from 'components'
export default {
  name: 'search-input',

  components: {
    Icon
  },

  props: {
    placeholderVal: {
      default: '请输入客户名称关键词筛选',
      type: String
    }
  },

  data () {
    return {
      inputValue: ''
    }
  },

  methods: {
    goBack () {
      this.$router.back()
    },
    cancel () {
      this.inputValue = ''
    },
    handelSearch (inputValue) {
      if (!inputValue) {
        this.$store.dispatch('setToast', {text: '请输入搜索内容'})
      } else {
        this.$emit('handelSearch', inputValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/scss/base.scss";
@import "../common/scss/mixin.scss";
.search-title {
  width: 100%;
  height: px2rem(88);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 px2rem(20);
  padding-left: px2rem(10);
  color: #fff;
  flex-grow: 0;
  flex-shrink: 0;
  .search-back {
    font-size: px2rem(38);
  }
  .search-input {
    width: px2rem(428);
    height: px2rem(56);
    align-items: center;
    padding: 0 px2rem(18);
    border-radius: px2rem(8);
    border: 1px solid #4181AA;
    background: #2e6f99;
    font-size: px2rem(24);
    input {
      width: 90%;
      height: 100%;
      line-height: px2rem(56);
      background: #2e6f99;
      color: #fff;
      text-indent: px2rem(10);
      font-size: px2rem(22);
    }
  }
  .search-btn {
    width: px2rem(114);
    height: px2rem(56);
    line-height: px2rem(56);
    text-align: center;
    border-radius: px2rem(8);
    background: #4181AA;
    font-size: px2rem(22);
  }
}
</style>
