<template>
  <div class="list-item car-row car-bg-white" @click="toDetail">
    <div class="list-left car-column">
      <p class="item-name" v-text="`${item.boardType} ${item.packetNumber === null ? '' : item.packetNumber}`"></p>
      <div class="item-info car-row car-t-dgray">
        <span>合同编号：</span>
        <span>{{item.mainCodeMark}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray" style="margin-bottom: 0">
        <span>存放地：</span>
        <span>{{item.storeMarket}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray">
        <span>规格：</span>
        <span class="fra-num">{{item.boardSpeci}}</span>
      </div>
      <div class="item-info car-row car-t-dgray">
        <span>{{item.objName}}</span>
      </div>
    </div>
    <div class="list-right">
      <div class="item-price">{{item.evaluationPrice | numberFormat}}</div>
      <p class="item-status car-t-dgray" v-text="statusArr[item.status]"></p>
      <p class="item-time car-t-gray" v-show="item.loanTime">{{item.loanTime | formatDate}}</p>
    </div>
  </div>
</template>
<script>
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'redeem-list-item',

  props: {
    item: {
      default: 0
    }
  },

  data () {
    return {
      statusArr: {
        '0': '在库+待审核',
        '1': '在 库',
        '6': '出库待审核',
        '7': '已出库',
        '8': '倒货待审核',
        '9': '出库（不还款）待审核'
      }
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
  width: 75%;
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
    .fra-num {
      margin-right: px2rem(10);
    }
  }
  .item-contract {
    margin: px2rem(16) 0;
  }
}
.list-right {
  flex-grow: 1;
  text-align: right;
  font-size: px2rem(18);
  .item-price {
    font-size: px2rem(24);
    color: #FF6600;
  }
  .item-status {
    margin: px2rem(20) 0 px2rem(50);
  }
}
</style>
