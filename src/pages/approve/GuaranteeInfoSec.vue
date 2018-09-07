<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="担保信息">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
    </div>
    <div class="info-content" v-if="contractInfoValue">
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
  name: 'gurantee-info-sec',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup
  },

  data () {
    return {
      contractInfo: {},
      contractInfoValue: [],
      contractInfoKey: [
        '木材种类',
        '规格',
        '产地 ',
        '总材积（m³）',
        '根数',
        '存放码头',
        '对应的进口商',
        '对应的开证商',
        '指定加工厂',
        '加工厂联系人 ',
        '联系电话',
        '评估单价（元）',
        '评估值（元）'
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
              let woodInfo = res.data.data.woodInfo
              contractInfo.boardType = woodInfo.boardType // 木材种类
              contractInfo.boardSpeci = woodInfo.boardSpeci // 规格
              contractInfo.placeOrigin = woodInfo.placeOrigin //  产地
              contractInfo.packetNumber = woodInfo.totalVolume ? woodInfo.totalVolume.toString() : '' // 总材积
              contractInfo.packetTotal = woodInfo.packetTotal ? woodInfo.packetTotal.toString() : '' // 根数
              contractInfo.storeMarket = woodInfo.storeMarket // 存放码头
              contractInfo.correspondingImporter = woodInfo.correspondingImporter // 对应的进口商
              contractInfo.correspondingIssuing = woodInfo.correspondingIssuing // 对应的开证商
              contractInfo.processingPlant = woodInfo.processingPlant // 指定加工厂
              contractInfo.marketContact = woodInfo.marketContact // 加工厂联系人
              contractInfo.contactMobile = woodInfo.contactMobile // 联系人电话
              contractInfo.unitPrice = numberFormat(woodInfo.unitPrice, 2) // 评估单价
              contractInfo.evaluationPrice = numberFormat(woodInfo.evaluationPrice, 2) // 评估价
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
