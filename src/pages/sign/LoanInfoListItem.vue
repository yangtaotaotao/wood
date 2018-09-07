<template>
  <div class="list-item car-row car-bg-white" @click="toDetail">
    <div class="list-left car-column">
      <p class="item-name">{{item.customerName}}</p>
      <div class="item-info car-row car-t-dgray">
        <span>{{item.mainCodeMark}} / {{item.productName}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray">
        <span>{{item.beginTime | formatDate}} / {{item.endTime | formatDate}}</span>
      </div>
    </div>
    <div class="list-right">
      <div class="item-price">{{item.loanAmount | numberFormat}}</div>
      <p class="item-status car-t-dgray">{{loanStatus[item.auditStatus]}}</p>
      <p class="item-time car-t-gray">{{item.createTime | formatDate(true)}}</p>
    </div>
  </div>
</template>
<script>
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'loan-info-list-item',

  props: {
    item: {
      default: 0
    }
  },

  data () {
    return {
      loanStatus: {
        0: '已保存',
        1: '待审批',
        2: '审批通过',
        3: '业务已驳回',
        4: '出纳已驳回'
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
  .item-price {
    font-size: px2rem(24);
    color: #FF6600;
  }
  .item-status {
    margin: px2rem(20) 0;
  }
}
</style>
