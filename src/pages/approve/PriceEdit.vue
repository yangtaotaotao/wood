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
          <p class="item-name" v-text="`${autoGuarantee.brand} ${autoGuarantee.carSystem} ${autoGuarantee.displacement} ${autoGuarantee.colour}色`"></p>
          <div class="item-info car-row car-t-dgray">
            <span>车架号：</span>
            <span class="fra-num">{{autoGuarantee.frameNumber}}</span>
            <span>合格证号：</span>
            <span>{{autoGuarantee.certificateNumber}}</span>
          </div>
          <div class="item-info item-contract car-row car-t-dgray">
            <span>出厂日期：</span>
            <span class="fra-num">{{autoGuarantee.productionDate | formatDate}}</span>
            <span>折扣率：</span>
            <span v-text="`${autoGuarantee.discount}%`"></span>
          </div>
          <!-- <div class="item-info car-row car-t-dgray">
            <span>评估价：</span>
            <span>{{autoGuarantee.evaluationPrice | numberFormat}}</span>
          </div> -->
        </div>
        <div class="list-right">
          <div class="item-price">{{autoLoan.loanAmount | numberFormat}}</div>
        </div>
      </div>
    </div>
    <div class="info-content">
      <div class="info car-bg-white">
        <div class="info-title car-row car-main-between">
          <car-loan-title class="title" title="外部价格（万）"></car-loan-title>
          <!-- <span>（单位万元）</span> -->
          <p class="item-time car-t-dgray"><span>平台参考价（万）：</span>{{priceAvg | numberFormat}}</p>
        </div>
        <div class="info-price car-row">
          <div class="price-category">
            <div class="price-title car-t-gray">车行168价格</div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceC1)" v-model="priceC1">
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceC2)" v-model="priceC2">
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceC2)" v-model="priceC3">
            </div>
            <div class="input-wrapper-last">
              <span><span v-show="priceC">{{priceC | numberFormat}}</span><span class="average">（均值）</span></span>
            </div>
          </div>
          <div class="price-category">
            <div class="price-title car-t-gray">卖好车价格</div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceM1)" v-model="priceM1">
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceM2)" v-model="priceM2">
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceM3)" v-model="priceM3">
            </div>
            <div class="input-wrapper-last">
              <span><span v-show="priceM">{{priceM | numberFormat}}</span><span class="average">（均值）</span></span>
            </div>
          </div>
          <div class="price-category">
            <div class="price-title car-t-gray">牛牛价格</div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceN1)" v-model="priceN1">
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceN2)" v-model="priceN2">
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="单位万元" :disabled="canNotEdit" @blur="verifyNum(priceN3)" v-model="priceN3">
            </div>
            <div class="input-wrapper-last">
              <span><span v-show="priceN">{{priceN | numberFormat}}</span><span class="average">（均值）</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="价格审核结果"></car-loan-title>
        </div>
        <div class="info-table">
          <template v-for="(item, index) in resultInfoValue">
            <info-table-group :itemTitle="resultInfoKey[index]" :itemCon="item" :key="index" v-if="index < 2"></info-table-group>
          </template>
          <template>
            <div class="car-row car-bg-white group">
              <div class="group-left car-t-gray">平台均价（万）</div>
              <div class="group-right car-t-dgray">{{priceAvg | numberFormat}}</div>
            </div>
            <div class="car-row car-bg-white group">
              <div class="group-left car-t-gray">浮动值是否合标</div>
              <div class="group-right car-t-dgray">{{floatingValue}}</div>
            </div>
          </template>
          <template v-for="(item, index) in resultInfoValue">
            <info-table-group :itemTitle="resultInfoKey[index]" :itemCon="item" :key="item.id" v-if="index > 3"></info-table-group>
          </template>
        </div>
      </div>
    </div>
    <div class="info-footer car-row" v-if="type === 2">
      <div class="confirm car-row car-main-center car-bg-blue car-t-white" @click="confirmPrice">保存</div>
      <div class="cancle car-row car-main-center car-t-blue" @click="goBack">取消</div>
    </div>
    <div class="info-footer2" @click="goBack" v-else>返回</div>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup} from 'components'
import { queryAutoPriceAudisDetail, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
import BASE_URL from '@/api/baseURL.js'
import axios from 'axios'
export default {
  name: 'price-edit',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup
  },

  computed: {
    priceC () {
      let C1 = this.priceC1 ? parseInt(this.priceC1) : 0
      let C2 = this.priceC2 ? parseInt(this.priceC2) : 0
      let C3 = this.priceC3 ? parseInt(this.priceC3) : 0
      let flag = 0
      if (this.priceC1 > 0) {
        ++flag
      }
      if (this.priceC2 > 0) {
        ++flag
      }
      if (this.priceC3 > 0) {
        ++flag
      }
      if (flag > 0) {
        return (C1 + C2 + C3) / flag
      } else {
        return 0
      }
    },
    priceM () {
      let M1 = this.priceM1 ? parseInt(this.priceM1) : 0
      let M2 = this.priceM2 ? parseInt(this.priceM2) : 0
      let M3 = this.priceM3 ? parseInt(this.priceM3) : 0
      let flag = 0
      if (this.priceM1 > 0) {
        ++flag
      }
      if (this.priceM2 > 0) {
        ++flag
      }
      if (this.priceM3 > 0) {
        ++flag
      }
      if (flag > 0) {
        return (M1 + M2 + M3) / flag
      } else {
        return 0
      }
    },
    priceN () {
      let N1 = this.priceN1 ? parseInt(this.priceN1) : 0
      let N2 = this.priceN2 ? parseInt(this.priceN2) : 0
      let N3 = this.priceN3 ? parseInt(this.priceN3) : 0
      let flag = 0
      if (this.priceN1 > 0) {
        ++flag
      }
      if (this.priceN2 > 0) {
        ++flag
      }
      if (this.priceN3 > 0) {
        ++flag
      }
      if (flag > 0) {
        return (N1 + N2 + N3) / flag
      } else {
        return 0
      }
    },
    priceAvg () {
      let flag = 0
      if (this.priceC > 0) {
        ++flag
      }
      if (this.priceM > 0) {
        ++flag
      }
      if (this.priceN > 0) {
        ++flag
      }
      if (flag > 0) {
        return (this.priceC + this.priceM + this.priceN) / flag
      } else {
        return 0
      }
    },
    floatingValue () {
      if (this.priceAudit) {
        if (this.category === 1) {
          let money = parseFloat(this.marketValue) - parseFloat(this.priceAvg)
          if (money > this.setValue) {
            return '否'
          } else if (money <= this.setValue) {
            return '是'
          }
        } else {
          let money = parseFloat(this.marketValue) * (1 - (this.setValue / 100).toFixed(2))
          if (parseFloat(this.priceAvg) <= money) {
            return '是'
          } else {
            return '否'
          }
        }
      }
    }
  },

  data () {
    return {
      type: parseInt(this.$route.query.type),
      insId: this.$route.query.insId,
      autoId: this.$route.query.autoId,
      canNotEdit: true,
      autoGuarantee: {},
      autoLoan: {},
      resultInfo: {},
      resultInfoValue: [],
      priceAvgBack: '',
      resultInfoKey: ['指导价（万）', '市场价（万） ', '平台均价（万） ', '浮动值是否合标 ', '价格审核结论', '车型是否准入  ', '质押率是否合标'],
      priceC1: 0,
      priceC2: 0,
      priceC3: 0,
      priceCId: 0,
      priceM1: 0,
      priceM2: 0,
      priceM3: 0,
      priceMId: 0,
      priceN1: 0,
      priceN2: 0,
      priceN3: 0,
      priceNId: 0,
      id: '',
      category: 0,
      setValue: 0,
      marketValue: 0,
      priceAudit: ''
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
    // 验证金额
    verifyNum (val) {
      var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      // var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(val)) {
        return true
      } else {
        this.$store.dispatch('setToast', {text: '输入金额不合法'})
      }
    },
    getInfo () {
      let insId = this.insId
      let autoId = this.autoId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryAutoPriceAudisDetail({loanId: insId, autoId}).then(res => {
            let success = res.data.success
            if (success) {
              this.autoGuarantee = res.data.data.autoGuarantee // 头部
              this.autoLoan = res.data.data.autoLoan // 借款信息
              let priceAudit = res.data.data.priceAudit
              this.priceAudit = priceAudit
              this.category = priceAudit.category
              this.setValue = priceAudit.setValue
              let autoPriceAudit = res.data.data.autoPriceAudit
              let resultInfo = this.resultInfo
              console.log(res.data.data.autoPriceAudit)
              this.id = autoPriceAudit.id
              resultInfo.guidancePrice = autoPriceAudit.guidancePrice.toString() // 指导价
              resultInfo.marketValue = autoPriceAudit.marketValue.toString() // 市场价
              this.marketValue = autoPriceAudit.marketValue
              resultInfo.platformAveragePrice = autoPriceAudit.platformAveragePrice // 平台均价
              // resultInfo.platformAveragePrice = this.priceAvg
              // this.priceAvgBack = autoPriceAudit.platformAveragePrice
              resultInfo.floatingValue = autoPriceAudit.floatingValue ? '否' : '是' // 浮动值是否合标
              resultInfo.priceAuditConclusion = '通过' // 价格审核结论
              resultInfo.vehicleAdmittance = '是' // 车型是否准入
              resultInfo.pledgeConformity = '是' // 质押率是否合标
              this.resultInfoValue = Object.values(this.resultInfo)
              // 汽车价格
              let autoPriceLevels = res.data.data.autoPriceLevels
              for (let i = 0, len = autoPriceLevels.length; i < len; i++) {
                if (autoPriceLevels[i].autoType === 1) {
                  this.priceC1 = autoPriceLevels[i].averageOne
                  this.priceC2 = autoPriceLevels[i].averageTwo
                  this.priceC3 = autoPriceLevels[i].averageThree
                  this.priceCId = autoPriceLevels[i].id
                } else if (autoPriceLevels[i].autoType === 2) {
                  this.priceM1 = autoPriceLevels[i].averageOne
                  this.priceM2 = autoPriceLevels[i].averageTwo
                  this.priceM3 = autoPriceLevels[i].averageThree
                  this.priceMId = autoPriceLevels[i].id
                } else if (autoPriceLevels[i].autoType === 3) {
                  this.priceN1 = autoPriceLevels[i].averageOne
                  this.priceN2 = autoPriceLevels[i].averageTwo
                  this.priceN3 = autoPriceLevels[i].averageThree
                  this.priceNId = autoPriceLevels[i].id
                }
              }
            }
          })
        }
      })
    },
    confirmPrice () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          this.savePrice()
        }
      })
    },
    savePrice () {
      let param = {
        data: {
          id: this.id,
          platformAverageprice: this.priceAvg,
          carLine: this.priceC,
          carLineId: this.priceCId,
          carLineValus: [this.priceC1, this.priceC2, this.priceC3],
          goodCar: this.priceM,
          goodCarId: this.priceMId,
          goodCarValus: [this.priceM1, this.priceM2, this.priceM3],
          cattleCar: this.priceN,
          cattleCarId: this.priceNId,
          cattleCarValus: [this.priceN1, this.priceN2, this.priceN3],
          floatingValue: this.floatingValue === '是' ? 1 : 0
        },
        loanId: this.insId
      }
      this.$store.commit('SET_LOADING_SHOW', {isShow: true})
      axios({
        method: 'post',
        params: param,
        headers: { 'Content-Type': 'application/json;charse=UTF-8' },
        transformRequest: [function () {
          return JSON.stringify(param)
        }],
        url: `${BASE_URL}/app/autoPriceAudit/addAutoPriceAudit`
      }).then((res) => {
        if (res.data.success) {
          this.$store.dispatch('setToast', {text: res.data.message})
          this.$store.commit('SET_LOADING_SHOW', {isShow: false})
          this.$router.back()
        } else {
          this.$store.dispatch('setToast', {text: res.data.message})
        }
      })
    }
  },

  mounted () {
    // this.resultInfoValue = Object.values(this.resultInfo)
    this.getInfo()
    if (this.type === 2) {
      this.canNotEdit = false
    }
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
    .info-price {
      font-size: px2rem(18);
      border-bottom: 1px solid #efefef;
      .price-category {
        flex-grow: 1;
        border-right: 1px solid #efefef;
        .price-title {
          background: #EEF5F9;
          padding-left: px2rem(14);
          height: px2rem(56);
          line-height: px2rem(56);
        }
        .input-wrapper {
          padding-left: px2rem(14);
        }
        input {
          display: block;
          width: px2rem(180);
          height: px2rem(40);
          line-height: px2rem(40);
          border: 1px dashed #dddddd;
          text-indent: px2rem(12);
          margin-top: px2rem(14);
        }
        .input-wrapper-last {
          color: #FF6600;
          margin: px2rem(14) 0;
          padding-left: px2rem(14);
          .average {
            font-size: px2rem(14);
          }
        }
      }
      .price-category:first-child {
        .input-wrapper {
          padding-left: 0;
        }
        .input-wrapper-last {
          padding-left: px2rem(0);
        }
      }
      .price-category:last-child {
        border-right: 0;
      }
    }
  }
}
.info-footer {
  width: 100%;
  height: px2rem(82);
  font-size: px2rem(24);
  background: #EEF5F9;
  flex-grow: 0;
  flex-shrink: 0;
  div {
    flex-grow: 1;
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
  flex-grow: 1;
  .item-name {
    font-size: px2rem(24);
    text-align: left;
    color: #2E6F99;
    margin-bottom: px2rem(20);
  }
  .item-info {
    font-size: px2rem(18);
    .fra-num {
      margin-right: px2rem(10);
    }
  }
  .item-contract {
    margin: px2rem(16) 0;
  }
}
.list-right {
  width: px2rem(180);
  text-align: right;
  font-size: px2rem(18);
  .item-price {
    font-size: px2rem(24);
    color: #FF6600;
  }
  .item-time {
    margin-top: px2rem(90);
  }
}
.group {
  padding: px2rem(20) 0;
  align-items: center;
  font-size: px2rem(18);
  border-bottom: 1px solid #EFEFEF;
  .group-left, .group-right {
    padding-left: px2rem(20);
  }
  .group-left {
    border-right: 1px solid #EFEFEF;
    width: px2rem(200);
    padding-left: px2rem(14);
    flex-grow: 0;
    flex-shrink: 0;
  }
  .group-right {
    flex-grow: 1;
  }
}
input::-webkit-input-placeholder {
  // WebKit browsers
  color: #666 !important;
}
input:-moz-placeholder {
  // Mozilla Firefox 4 to 18
  color: #666 !important;
}
input::-moz-placeholder {
  // Mozilla Firefox 19+/
  color: #666 !important;
}
input:-ms-input-placeholder {
  // Internet Explorer 10+/
  color: #666 !important;
}
</style>
