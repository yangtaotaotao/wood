<template>
  <div class="list-item car-row" @click="toDetail">
    <div class="list-left car-column">
      <p class="item-name">{{item.customerName}}</p>
      <div class="item-info car-row car-t-dgray">
        <span>{{item.mainCodeMark}} | {{item.productName}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray">
        <span>应还款日：</span>
        <span>{{item.dueTime | formatDate}}</span>
      </div>
    </div>
    <div class="list-right">
      <div class="item-address car-t-dgray" v-text="statusArr[item.repementStatus]"></div>
      <p class="item-status car-t-dgray">第{{item.forwardNumber}}期</p>
      <p class="item-time car-t-dgray">还款总额：<span class="car-t-red">{{item.forwardSum | numberFormat}}</span></p>
    </div>
  </div>
</template>
<script>
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'repayment-list-item',

  props: {
    item: {
      default: 0
    }
  },

  data () {
    return {
      statusArr: ['未还款', '部分还款', '已还款']
    }
  },

  methods: {
    toDetail () {
      this.$emit('toDetail', true)
    }
  },

  filters: {
    formatDate (time, fmt) {
      return formatDate(time, fmt)
    },
    numberFormat (price) {
      return numberFormat(price, 2)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.list-item {
  flex-grow: 0;
  flex-shrink: 0;
  padding: px2rem(26) px2rem(20);
  border-bottom: 1px solid #EFEFEF;
  &:last-child {
    border: 0;
  }
}
.list-left {
  width: 60%;
  flex-grow: 0;
  flex-shrink: 0;
  .item-name {
    font-size: px2rem(24);
    text-align: left;
    color: #2E6F99;
    margin-bottom: px2rem(20);
  }
  .item-info {
    font-size: px2rem(18);
  }
  .item-contract {
    margin-top: px2rem(16);
  }
}
.list-right {
  flex-grow: 1;
  text-align: right;
  font-size: px2rem(18);
  .item-address {
    margin-top: px2rem(8);
  }
  .item-status {
    margin: px2rem(14) 0;
  }
}
</style>
