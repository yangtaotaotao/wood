<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="车辆信息">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
    </div>
    <div class="info-content">
      <div class="info car-bg-white">
        <div class="info-table contract-table">
          <template v-for="(item, index) in contractInfoValue">
            <info-table-group :itemTitle="contractInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
    </div>
    <div class="info-footer2" @click="goBack">返回</div>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup} from 'components'
import { queryCarInfo, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'borrow-info',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup
  },

  data () {
    return {
      contractInfo: {},
      contractInfoValue: [],
      contractInfoKey: [
        '借款方',
        '主合同编号',
        '质押合同编号 ',
        '品牌',
        '型号',
        '排量 ',
        '颜色',
        '车架号',
        '合格证号',
        '指导价（万）',
        '市场价（万）',
        '钥匙',
        '车辆情况',
        '折扣（折）',
        '评估价（元）',
        '存放位置'
      ]
    }
  },

  filters: {
    numberFormat (price) {
      return numberFormat(price, 2)
    },
    formatDate (time, fmt) {
      return formatDate(time, fmt)
    }
  },

  methods: {
    // 返回
    goBack () {
      this.$router.back()
    },
    getInfo () {
      let id = this.$route.query.id
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryCarInfo({id}).then(res => {
            let success = res.data.success
            if (success) {
              // 车辆信息
              let contractInfo = this.contractInfo
              let carInfo = res.data.data.carInfo
              contractInfo.objName = carInfo.objName // 借款方
              contractInfo.mainCodeMark = carInfo.mainCodeMark // 主合同编号
              contractInfo.pledgeCodeMark = carInfo.pledgeCodeMark // 质押合同编号
              contractInfo.brand = carInfo.brand // 品牌
              contractInfo.model = carInfo.model // 型号
              contractInfo.displacement = carInfo.displacement // 排量
              contractInfo.colour = carInfo.colour // 颜色
              contractInfo.frameNumber = carInfo.frameNumber // 车架号
              contractInfo.certificateNumber = carInfo.certificateNumber // 合格证号
              contractInfo.guidancePrice = numberFormat(carInfo.guidancePrice, 2) // 指导价
              contractInfo.marketValue = numberFormat(carInfo.marketValue, 2) // 市场价
              contractInfo.autoKey = carInfo.autoKey // 钥匙
              contractInfo.vehicleConditions = carInfo.vehicleConditions // 车辆情况
              contractInfo.discount = carInfo.discount.toFixed(2) // 折扣
              contractInfo.evaluationPrice = numberFormat(carInfo.evaluationPrice, 2) // 评估价
              contractInfo.storagePosition = carInfo.storagePosition // 存放位置
              this.contractInfoValue = Object.values(this.contractInfo)
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
    .contract-table {
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
.info-footer2 {
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

</style>
