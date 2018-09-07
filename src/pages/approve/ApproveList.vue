<template>
  <div class="approve-wrapper car-column car-bg-white">
    <search-input @handelSearch="handelSearch"></search-input>
    <div class="scroll-content car-column">
      <div class="approve approve-title car-row car-bg-white">
        <span class="product-name">产品名称</span>
        <span class="contract-num">合同编号</span>
        <span class="customer-name">客户名称</span>
        <span class="paper-num">证件号码</span>
        <span class="rate-method">计息方式</span>
        <span class="loan-price">借款金额</span>
        <span class="start-time">开始时间</span>
        <span class="end-time">结束时间</span>
        <span class="approve-link">审批环节</span>
      </div>
      <div class="approve approve-list car-row car-bg-white">
        <span class="product-name">汽车库存质押</span>
        <span class="contract-num">5YLQ-2018-075 </span>
        <span class="customer-name">恒安（中国）投资有限公司</span>
        <span class="paper-num">43322222222</span>
        <span class="rate-method">按月付息，到期还本</span>
        <span class="loan-price">2,100,000.00</span>
        <span class="start-time">2018-03-22</span>
        <span class="end-time">2018-03-22</span>
        <span class="approve-link">业务部</span>
      </div>
      <div class="approve approve-list car-row car-bg-white">
        <span class="product-name">汽车库存质押</span>
        <span class="contract-num">5YLQ-2018-075 </span>
        <span class="customer-name">恒安（中国）投资有限公司</span>
        <span class="paper-num">43322222222</span>
        <span class="rate-method">按月付息，到期还本</span>
        <span class="loan-price">2,100,000.00</span>
        <span class="start-time">2018-03-22</span>
        <span class="end-time">2018-03-22</span>
        <span class="approve-link">业务部</span>
      </div>
    </div>
  </div>
</template>
<script>
import {SearchInput} from 'components'
export default {
  name: 'approve-list',

  components: {
    SearchInput
  },

  data () {
    return {
    }
  },

  methods: {
    // 筛选
    handelSearch () {
      console.log('handelSearch')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.approve-wrapper {
  height: 100vh;
}
.scroll-content {
  width: 100vw;
  flex-grow: 1;
  overflow: hidden;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .approve-list:nth-child(even) {
    span {
      background: #fff!important;
    }
  }
  .approve-list:nth-child(odd) {
    span {
      background: #eef5f9!important;
    }
  }
}
.approve {
  align-items: center;
  font-size: px2rem(18);
  height: px2rem(54);
  flex-grow: 0;
  flex-shrink: 0;
  span {
    display: block;
    height: px2rem(54);
    line-height: px2rem(54);
    padding-left: px2rem(20);
    border-right: 1px solid #efefef;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .product-name {
    width: px2rem(146);
  }
  .contract-num {
    width: px2rem(194);
  }
  .customer-name {
    width: px2rem(256);
  }
  .paper-num, .start-time, .end-time, .approve-link {
    width: px2rem(190);
  }
  .rate-method {
    width: px2rem(200);
  }
  .loan-price {
    width: px2rem(200);
  }
  .approve-link {
    width: px2rem(160);
  }
}
.approve-title {
  color: #2e6f99;
  span {
    border-bottom: 1px solid #2e6f99;
  }
}
</style>
