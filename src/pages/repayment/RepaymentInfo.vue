<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="详细信息">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
      <div class="list-item car-row car-bg-white">
        <div class="list-left car-column">
          <p class="item-name">{{objName}}</p>
          <div class="item-info car-row car-t-dgray">
            <span>证件号码：</span>
            <span>{{creditCode}}</span>
          </div>
          <div class="item-info item-contract car-row car-t-dgray">
            <span>主合同编号：</span>
            <span>{{mainCodeMark}}</span>
          </div>
          <!-- <div class="item-info car-row car-t-dgray">
            <span>质押合同编号：</span>
            <span>{{pledgeCodeMark}}</span>
          </div> -->
        </div>
        <div class="list-right">
          <div class="item-address car-t-dgray">{{objAbName}}</div>
          <p class="item-status car-t-dgray">{{isAdmittanceName}}</p>
        </div>
      </div>
    </div>
    <div class="info-content car-column">
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="合同信息"></car-loan-title>
        </div>
        <div class="info-table">
          <template v-for="(item, index) in loanInfoValue">
            <info-table-group :itemTitle="loanInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="借款人账户"></car-loan-title>
        </div>
        <div class="info-table account-table">
          <template v-for="(item, index) in accountInfoValue">
            <info-table-group :itemTitle="accountInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
      <div class="info repayment-info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="还款信息"></car-loan-title>
        </div>
        <div class="repayment-con">
          <div class="approve approve-title car-row">
            <span class="contract-num">类型</span>
            <span class="customer-name">金额</span>
            <span class="start-time">起息日</span>
            <span class="end-time">结息日</span>
            <span class="loan-price">计息金额</span>
            <span class="loan-day">计息天数</span>
          </div>
          <div class="approve approve-list car-row" v-show="repaymentPlan.forwardAmount">
            <span class="contract-num">本金</span>
            <span class="customer-name">{{repaymentPlan.forwardAmount | numberFormat}}</span>
            <span class="start-time">{{repaymentPlan.beginTime | formatDate}}</span>
            <span class="end-time">{{repaymentPlan.dueTime | formatDate}}</span>
            <span class="loan-price">&nbsp;&nbsp;&nbsp;&nbsp;/</span>
            <span class="loan-day">&nbsp;&nbsp;&nbsp;&nbsp;/</span>
          </div>
          <div class="approve approve-list car-row">
            <span class="contract-num">利息</span>
            <span class="customer-name">{{repaymentPlan.forwardInterest}}</span>
            <span class="start-time">{{repaymentPlan.beginTime | formatDate}}</span>
            <span class="end-time">{{repaymentPlan.dueTime | formatDate}}</span>
            <span class="loan-price">{{loanInfo.loanAmount}}</span>
            <span class="loan-day">{{repaymentPlan.repaymentDays}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info-footer" @click="goBack">返回</div>
    <bigger-img :biggerUrl="biggerUrl" :showBig="showBig" @closeImg="closeImg"></bigger-img>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, ContractImg, BiggerImg} from 'components'

import { queryDetailRepaymentPlan, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'repayment-info',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg, ContractImg
  },

  data () {
    return {
      item: {
        name: '恒安（中国）投资有限公司',
        loan: '施文博 / 15901229190 ',
        timeInfo: '2018-01-02 / 2018-03-01',
        price: '200,000.00',
        status: '待审批',
        time: '2018-05-09 11:37:37'
      },
      loanInfo: {},
      loanInfoValue: [],
      loanInfoKey: ['产品名称', '开始日期', '结束日期 ', '还款方式', '利率种类', '借款利率 ', '借款金额', '借款用途'],
      accountInfo: {},
      accountInfoValue: [],
      accountInfoKey: ['开户银行', '账号名', '银行账户'],
      biggerUrl: '',
      showBig: false,
      isAdmittanceName: '',
      objName: '',
      objAbName: '',
      creditCode: '',
      mainCodeMark: '',
      pledgeCodeMark: '',
      loanAutoGuarantees: [],
      repaymentPlan: {},
      repaymentPlanArr: {
        1: '按月付息到期还本',
        2: '每月本息'
      }
    }
  },

  filters: {
    formatDate (time, fmt) {
      return formatDate(time, fmt)
    },
    numberFormat (price) {
      return numberFormat(price, 2)
    }
  },

  methods: {
    biggerImg (imgUrl) {
      this.biggerUrl = imgUrl
      this.showBig = true
    },
    closeImg () {
      this.showBig = false
    },
    // 返回
    goBack () {
      this.$router.back()
    },
    getInfo () {
      let repaymentId = this.$route.params.repaymentId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryDetailRepaymentPlan({repayPlanId: repaymentId}).then(res => {
            let success = res.data.success
            if (success) {
              let customer = res.data.data.customer
              let loan = res.data.data.loan
              let product = res.data.data.product
              let customerBank = res.data.data.customerBank
              this.loanAutoGuarantees = res.data.data.loanAutoGuarantees
              this.isAdmittanceName = customer.isAdmittanceName // 是否准入
              this.objName = customer.objName // 项目名称
              this.objAbName = customer.objAbName // 项目简称
              this.creditCode = customer.creditCode // 证件号码
              this.mainCodeMark = loan.mainCodeMark // 主合同编号
              this.pledgeCodeMark = loan.pledgeCodeMark // 质押合同编号
              // 借款信息
              let loanInfo = this.loanInfo
              loanInfo.objName = product.objName // 产品名称
              loanInfo.beginTime = formatDate(new Date(loan.beginTime))
              loanInfo.endTime = formatDate(new Date(loan.endTime))
              loanInfo.repaymentWayName = this.repaymentPlanArr[product.repaymentWay] // 还款方式
              loanInfo.rateTypeName = product.rateTypeName // 利率种类
              loanInfo.contRate = loan.contRate.toFixed(2) + '%' // 借款利率
              loanInfo.loanAmount = numberFormat(loan.loanAmount, 2) // 借款金额
              loanInfo.loanUseName = loan.loanUseName // 借款用途
              this.loanInfoValue = Object.values(this.loanInfo)
              // 借款人账户
              let accountInfo = this.accountInfo
              accountInfo.bankNo = customerBank.bankNo // 开户银行
              accountInfo.bankAccName = customerBank.bankAccName // 账号名
              accountInfo.bankCardNo = customerBank.bankCardNo // 银行账户
              this.accountInfoValue = Object.values(this.accountInfo)
              // 还款信息
              this.repaymentPlan = res.data.data.repaymentPlan
            }
          })
        }
      })
    }
  },

  mounted () {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
.info-wrapper {
  height: 100%;
  background: #eeeeee;
}
.info-top {
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: px2rem(14);
}
.info-content {
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .info {
    padding: px2rem(28) px2rem(20);
    margin-bottom: px2rem(14);
    &:last-child {
      padding-bottom: px2rem(46);
      margin-bottom: 0;
    }
    .info-title {
      margin-bottom: px2rem(20);
      .title {
        font-size: px2rem(24)!important;
        color: #2E6F99 !important;
      }
    }
    .info-table {
      border: 1px solid #EFEFEF;
      .group:nth-child(even) {
        background: #eef5f9;
      }
      .group:nth-child(odd) {
        background: #fff;
      }
    }
    .account-table {
      border: 1px solid #EFEFEF;
      .group:nth-child(odd) {
        background: #eef5f9;
      }
      .group:nth-child(even) {
        background: #fff;
      }
    }
  }
}
.repayment-info {
  flex-grow: 1;
  .repayment-con {
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    border: 1px solid #EFEFEF;
    .approve {
      align-items: center;
      font-size: px2rem(18);
      height: px2rem(54);
      flex-shrink: 0;
      flex-grow: 0;
      span {
        display: block;
        height: px2rem(54);
        line-height: px2rem(54);
        padding-left: px2rem(20);
        border-right: 1px solid #efefef;
        flex-grow: 0;
        flex-shrink: 0;
      }
      .contract-num {
        width: px2rem(80);
      }
      .customer-name {
        width: px2rem(160);
      }
      .start-time, .end-time {
        width: px2rem(160);
      }
      .loan-price {
        width: px2rem(160);
      }
      .loan-day {
        width: px2rem(130);
      }
    }
    .approve-title {
      span {
        color: #999999;
        background: #eef5f9;
      }
    }
    .approve-list {
      span {
        color: #666;
        background: #fff;
      }
    }
  }
}
.info-footer {
  width: 100%;
  height: px2rem(82);
  line-height: px2rem(82);
  text-align: center;
  font-size: px2rem(24);
  color: #2E6F99;
  background: #EEF5F9;
  flex-grow: 0;
  flex-shrink: 0;
}
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
    margin: px2rem(16) 0;
  }
}
.list-right {
  flex-grow: 1;
  text-align: right;
  font-size: px2rem(18);
  .item-address {
    margin-top: px2rem(10);
  }
  .item-status {
    margin: px2rem(16) 0;
  }
}
</style>
