<template>
  <div class="list-item car-row" @click="toDetail">
    <div class="list-left car-column">
      <p class="item-name">{{item.customerName}}</p>
      <div class="item-info car-row car-t-dgray">
        <span>{{item.mainCodeMark}} | {{item.productName}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray">
        <span v-show="item.beginTime">{{item.beginTime | formatDate}} / {{item.endTime | formatDate}}</span>
      </div>
    </div>
    <div class="list-right">
      <div class="item-address car-t-red">{{item.loanAmount | numberFormat}}</div>
      <p class="item-status car-t-dgray">{{status}}</p>
      <p class="item-time car-t-dgray" v-show="item.createTime">{{item.createTime | formatDate(true)}}</p>
    </div>
  </div>
</template>
<script>
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'ele-contract-item',

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

  computed: {
    status () {
      let item = this.item
      if (item) {
        if (item.repementStatus === 2) {
          return '已结清'
        } else if (item.auditStatus === 3 || item.auditStatus === 4) {
          return '已驳回'
        } else if (item.loanStatus === 4) {
          return '还款中'
        } else {
          return '待放款'
        }
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
