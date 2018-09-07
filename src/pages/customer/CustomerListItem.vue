<template>
  <div class="list-item car-row" @click="toDetail">
    <div class="list-left car-column">
      <p class="item-name">{{item.objName}}</p>
      <div class="item-info car-row car-t-dgray">
        <span>法定代表人：</span>
        <span>{{item.orgLegalPerson}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray">
        <span>电话：</span>
        <span>{{item.phoneNum}}</span>
      </div>
      <div class="item-info item-contract car-row car-t-dgray">
        <span>证件号码：</span>
        <span>{{item.creditCode}}</span>
      </div>
    </div>
    <div class="list-right">
      <div class="item-address car-t-dgray">{{item.registeredFirstSelectArea}}{{item.registeredThirdSelectArea}}</div>
      <p class="item-status car-t-dgray">{{item.isAdmittanceName}}</p>
      <p class="item-time car-t-gray">{{item.createTime | formatDate(true)}}</p>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/api/dateFormat.js'
export default {
  name: 'customer-list-item',

  props: {
    item: {
      default: 0
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
    margin: px2rem(34) 0;
  }
}
</style>
