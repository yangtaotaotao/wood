<template>
  <div class="list-item car-row" @click="toDetail">
    <div class="list-left car-column">
      <p class="item-name">{{item.busDesc}}</p>
      <div class="item-info car-row car-t-dgray">
        <span>发起人：</span>
        <span>{{item.propUserName}}&nbsp;&nbsp;{{item.propTime}}</span>
      </div>
      <!-- <div class="item-info item-contract car-row car-t-dgray">
        <span>{{item.propTime}}</span>
      </div> -->
      <div class="item-info item-contract car-row car-t-dgray">
        <span>当前环节：</span>
        <span>{{item.flowNodeName}}</span>
      </div>
    </div>
    <div class="list-right">
      <p class="item-status car-t-dgray">{{item.objName}}</p>
      <!-- <div class="item-address car-t-dgray">{{item.flowNodeName}}</div> -->
      <p class="item-time car-t-dgray">{{statusArr[item.flowOperation - 1]}}</p>
      <p class="item-time car-t-dgray">审核人：{{item.approUserName}}</p>
      <p class="item-time car-t-dgray" v-text="item.approTime ? item.approTime : '未审核'"></p>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/api/dateFormat.js'
export default {
  name: 'done-list-item',

  props: {
    item: {
      default: 0
    }
  },

  data () {
    return {
      statusArr: ['同意', '驳回']
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
  width: 58%;
  flex-grow: 0;
  flex-shrink: 0;
  .item-name {
    font-size: px2rem(24);
    text-align: left;
    color: #2E6F99;
    margin-bottom: px2rem(20);
    line-height: 1.2;
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
    margin: px2rem(20) 0;
    font-size: px2rem(22);
  }
  .item-time {
    margin-top: px2rem(20);
  }
}
</style>
