<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="赎回详情">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
      <redeem-list-item :item="item"></redeem-list-item>
    </div>
    <div class="info-content">
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="板材详情"></car-loan-title>
        </div>
        <div class="info-table">
          <template v-for="(item, index) in carInfoValue">
            <info-table-group :itemTitle="carInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
      <!-- <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="提前还款信息"></car-loan-title>
        </div>
        <div class="info-table repayment-table">
          <template v-for="(item, index) in repaymentInfoValue">
            <info-table-group :itemTitle="repaymentInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div> -->
      <!-- <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="质押物解押证明、还款pos机凭条"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0">没有附件</span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <info-img :imgInfo="item" :key="index" @biggerImg="biggerImg"></info-img>
          </template>
        </div>
      </div> -->
    </div>
    <bigger-img :biggerUrl="biggerUrl" :showBig="showBig" @closeImg="closeImg"></bigger-img>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg} from 'components'
import RedeemListItem from './RedeemListItem'

import {isLogined, queryDetailWoodGuarantee} from '@/api/getData.js'
import { formatDate } from '@/api/dateFormat.js'
export default {
  name: 'redeem-info',

  components: {
    AppTitle, Icon, CarLoanTitle, RedeemListItem, InfoTableGroup, InfoImg, BiggerImg
  },

  data () {
    return {
      item: {},
      carInfo: {},
      carInfoValue: [],
      carInfoKey: ['合同编号', '产品名称', '客户名称', '放款日期', '使用天数（天）', '状态', '材种', '规格', '存放地', '包号', '指定加工厂', '原木/板材', '操作'],
      repaymentInfo: {},
      repaymentInfoValue: [],
      repaymentInfoKey: ['提前还款金额', '应收利息', '还款总额', '赎回日期'],
      biggerUrl: '',
      showBig: false,
      loanAttachList: [],
      woodStatus: {
        '1': '在库',
        '6': '出库待审核',
        '7': '已出库'
      }
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
    getInfo () {
      let id = this.$route.params.id
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryDetailWoodGuarantee({id}).then(res => {
            let success = res.data.success
            if (success) {
              let data = res.data.data
              this.item = data
              console.log(this.item)
              // 附件
              this.loanAttachList = data.attachments
              // 车辆信息
              let carInfo = this.carInfo
              carInfo.mainCodeMark = data.mainCodeMark // 合同编号
              carInfo.productName = data.productName // 产品名称
              carInfo.objName = data.objName // 客户名称
              carInfo.loanTime = data.loanTime ? formatDate(new Date(data.loanTime)) : ''// 放款日期
              carInfo.contDay = data.contDay.toString() // 使用天数
              carInfo.originalType = this.woodStatus[data.status] // 状态
              carInfo.boardType = data.boardType // 板材种类
              carInfo.boardSpeci = data.boardSpeci // 规格
              carInfo.storeMarket = data.storeMarket // 存放地
              carInfo.packetNumber = data.packetNumber // 包号
              carInfo.processingPlant = data.processingPlant // 指定加工厂
              carInfo.woodType = data.woodType === 1 ? '原木' : '板材'
              this.carInfoValue = Object.values(this.carInfo)
              // // 提前还款信息
              // let prePaymentInfo = res.data.data.prePaymentInfo
              // let repaymentInfo = this.repaymentInfo
              // repaymentInfo.prePaymentPrincipal = numberFormat(prePaymentInfo.prePaymentPrincipal, 2) // 提前还款金额
              // repaymentInfo.interest = numberFormat(prePaymentInfo.interest) // 应收利息
              // repaymentInfo.redemptionDay = formatDate(new Date(prePaymentInfo.redemptionDay)) // 赎回日期
              // repaymentInfo.prePaymentAmount = numberFormat(prePaymentInfo.prePaymentAmount, 2)
              // this.repaymentInfoValue = Object.values(this.repaymentInfo)
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
    .repayment-table {
      border: 1px solid #EFEFEF;
      .group:nth-child(odd) {
        background: #eef5f9;
      }
      .group:nth-child(even) {
        background: #fff;
      }
    }
    .info-img {
      display: flex;
      flex-flow: row wrap;
    }
  }
}
</style>
