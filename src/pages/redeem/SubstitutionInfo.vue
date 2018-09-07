<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="置换新车辆信息">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
      <redeem-list-item :item="item"></redeem-list-item>
    </div>
    <div class="info-content">
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="车辆详情"></car-loan-title>
        </div>
        <div class="info-table">
          <template v-for="(item, index) in carInfoValue">
            <info-table-group :itemTitle="carInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white" ref="attachmentInfo">
        <div class="info-title">
          <car-loan-title class="title" title="附件信息"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(1) === -1">没有附件</span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <info-img v-if="item.attType === 1" :imgInfo="item" :key="index" @biggerImg="biggerImg"></info-img>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="质押物置换协议"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(2) === -1">
          <other-img :imgInfo="2"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 2" :key="index" :imgInfo="item"></contract-img>
          </template>
        </div>
      </div>
    </div>
    <bigger-img :biggerUrl="biggerUrl" :showBig="showBig" @closeImg="closeImg"></bigger-img>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg, OtherImg, ContractImg} from 'components'
import RedeemListItem from './RedeemListItem'

import {queryDetailAutoGuarantee, isLogined} from '@/api/getData.js'
import { formatDate } from '@/api/dateFormat.js'
export default {
  name: 'substitution-info',

  components: {
    AppTitle, Icon, CarLoanTitle, RedeemListItem, InfoTableGroup, InfoImg, BiggerImg, OtherImg, ContractImg
  },

  data () {
    return {
      item: {},
      carInfo: {},
      carInfoValue: [],
      carInfoKey: ['合同编号', '产品名称', '客户名称', '放款日期', '使用天数（天）', '状态', '材种', '规格', '存放地', '包号', '指定加工厂', '原木/板材', '操作'],
      imgURLArr: ['', '', '', ''],
      biggerUrl: '',
      showBig: false,
      loanAttachList: [],
      TypeArr: []
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
          queryDetailAutoGuarantee({id}).then(res => {
            let success = res.data.success
            if (success) {
              let data = res.data.data
              this.item = data
              // 附件
              this.loanAttachList = data.attachments
              let TypeArr = this.TypeArr
              if (this.loanAttachList.length > 0) {
                this.loanAttachList.forEach(element => {
                  TypeArr.push(element.attType)
                  return TypeArr
                })
              }
              // 车辆信息
              let carInfo = this.carInfo
              carInfo.mainCodeMark = data.mainCodeMark // 合同编号
              carInfo.productName = data.productName // 产品名称
              carInfo.objName = data.objName // 客户名称
              carInfo.loanTime = formatDate(new Date(data.loanTime)) // 放款日期
              carInfo.contDay = data.contDay.toString() // 使用天数
              carInfo.originalType = data.originalType // 状态
              carInfo.boardType = data.boardType // 板材种类
              carInfo.boardSpeci = data.boardSpeci // 规格
              carInfo.storeMarket = data.storeMarket // 存放地
              carInfo.packetNumber = data.packetNumber // 包号
              carInfo.processingPlant = data.processingPlant // 指定加工厂
              carInfo.woodType = data.woodType === 1 ? '原木' : '板材'
              this.carInfoValue = Object.values(this.carInfo)
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
