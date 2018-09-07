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
          <!-- <div class="item-info car-row car-t-dgray">
            <span>证件号码：</span>
            <span>{{creditCode}}</span>
          </div> -->
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
    <div class="info-content">
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="借款信息"></car-loan-title>
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
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="板材信息"></car-loan-title>
        </div>
        <div class="info-pledge">
          <div class="pledge car-row car-t-gray">
            <div class="brand" v-text="objCode === 'wood3' ? '板材种类' : '木材种类'"></div>
            <div class="series">规格</div>
            <div class="qualified-num">产地</div>
            <div class="frame-num" v-text="objCode === 'wood3' ? '包号' : '总材积（m³）'"></div>
          </div>
          <div class="pledge car-row car-t-dgray car-bg-white" v-for="(item, index) in loanWoodGuarantees" :key="index" @click="toGuaranteeInfo(item)">
            <div class="brand">{{item.boardType}}</div>
            <div class="series">{{item.boardSpeci}}</div>
            <div class="qualified-num">{{item.placeOrigin}}</div>
            <div class="frame-num car-row">
              <span v-text="objCode === 'wood3' ? item.packetNumber : item.totalVolume">{{item.packetNumber}}</span>
              <icon class="car-icon" icon="icon-right"></icon>
            </div>
          </div>
        </div>
      </div>
      <div class="info img car-bg-white">
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
      <div class="info img car-bg-white" v-if="objCode !== 'wood3'">
        <div class="info-title">
          <car-loan-title class="title" title="委托加工合同"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(11) === -1">
          <other-img :imgInfo="11"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <info-img v-if="item.attType === 11" :imgInfo="item" :key="index" @biggerImg="biggerImg"></info-img>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white" v-if="objCode !== 'wood3'">
        <div class="info-title">
          <car-loan-title class="title" title="购销合同"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(12) === -1">
          <other-img :imgInfo="12"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <info-img v-if="item.attType === 12" :imgInfo="item" :key="index" @biggerImg="biggerImg"></info-img>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="电子合同"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(9) === -1">
          <other-img :imgInfo="9"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 9" :key="index" :imgInfo="item"></contract-img>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="保证合同"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(10) === -1">
          <other-img :imgInfo="10"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 10" :key="index" :imgInfo="item"></contract-img>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white" v-show="subContent">
        <div class="info-title">
          <car-loan-title class="title" title="备注"></car-loan-title>
        </div>
        <div class="info-remark t-dgray">
          <span>{{subContent}}</span>
        </div>
      </div>
    </div>
    <div class="info-footer car-row" v-if="auditStatus">
      <div class="confirm car-row car-main-center car-bg-blue car-t-white" @click="confirmPrice">复核签章</div>
      <div class="cancle car-row car-main-center car-t-blue" @click="goBack">取消</div>
    </div>
    <div class="info-footer2" @click="goBack" v-else>返回</div>
    <div class="matte car-column" v-if="showMatte">
      <div class="content">
        <div class="content-top">签署电子合同</div>
        <div class="content-main car-column">
          <div class="main-point car-row">
            <icon class="car-icon" icon="icon-tixianwancheng"></icon>
            <span>已向您的手机号<span>{{phoneNum}}</span>发送短信验证码</span>
          </div>
          <div class="main-verify car-row">
            <input type="text" placeholder="请输入验证码" v-model="msgCode">
            <button :disabled="isDisabled" class="car-t-white" :class="{'can-click': !isDisabled}" @click="confirmPrice" v-text="verifyPoint"></button>
          </div>
          <div class="main-bottom" @click="confirmSign">确定</div>
        </div>
      </div>
      <div class="close" @click="closeMatte">
        <icon class="car-icon" icon="icon-guanbi"></icon>
      </div>
    </div>
    <bigger-img :biggerUrl="biggerUrl" :showBig="showBig" @closeImg="closeImg"></bigger-img>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, ContractImg, OtherImg, BiggerImg} from 'components'

import { queryLoanDetail, isLogined, loanSendSignCode, reviewSignature } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'sign-info',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg, ContractImg, OtherImg
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
      loanInfoKey: ['贷款产品', '开始日期', '结束日期 ', '合同天数', '利率种类', '借款利率 ', '借款金额', '借款用途'],
      accountInfo: {},
      accountInfoValue: [],
      accountInfoKey: ['开户银行', '所属支行', '账号名', '银行账户'],
      loanAttachList: [],
      biggerUrl: '',
      showBig: false,
      isAdmittanceName: '',
      objName: '',
      objAbName: '',
      creditCode: '',
      mainCodeMark: '',
      pledgeCodeMark: '',
      loanWoodGuarantees: [],
      subContent: '',
      contractInfo: '', // 电子合同
      TypeArr: [],
      objCode: '',
      auditStatus: 0,
      showMatte: false,
      phoneNum: '',
      msgCode: '',
      isDisabled: true,
      verifyPoint: '60s后重新发送',
      seconds: 60
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
    // 验证码倒计时
    getVerify () {
      let s = 60
      let _this = this
      let timer = setInterval(() => {
        _this.isDisabled = true
        if (s > 0) {
          s--
          _this.seconds = s
          _this.verifyPoint = `${s} s后重新发送`
        } else {
          clearInterval(timer)
          _this.verifyPoint = '获取验证码'
          _this.isDisabled = false
          _this.seconds = 60
        }
      }, 1000)
    },
    // 关闭弹出层
    closeMatte () {
      this.showMatte = false
    },
    confirmPrice () {
      this.showMatte = true
      console.log(this.seconds)
      if (this.seconds === 60) {
        isLogined().then(res => {
          if (!res.data.success) {
            this.$router.push('/login')
          } else {
            loanSendSignCode({mobile: this.phoneNum}).then(res => {
              if (res.data.success) {
                this.$store.dispatch('setToast', {text: res.data.message})
                this.getVerify()
              } else {
                this.$store.dispatch('setToast', {text: res.data.message})
              }
            })
          }
        })
      }
    },
    confirmSign () {
      this.showMatte = false
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          reviewSignature({
            loanId: this.$route.params.signId,
            mobile: this.phoneNum,
            msgCode: this.msgCode
          }).then(res => {
            if (res.data.success) {
              this.$store.dispatch('setToast', {text: res.data.message})
            } else {
              this.$store.dispatch('setToast', {text: res.data.message})
            }
          })
        }
      })
    },
    // 返回
    goBack () {
      this.$router.back()
    },
    // 担保信息
    toGuaranteeInfo (item) {
      if (this.objCode === 'wood3') { // 木业产品三
        this.$router.push(`/approve/guaranteeInfo?id=${item.id}`)
      } else if (this.objCode === 'wood2-ym') { // 木业产品二/原木
        this.$router.push(`/approve/guaranteeInfoSec?id=${item.id}`)
      } else if (this.objCode === 'wood2-sb') { // 木业产品二/水板
        this.$router.push(`/approve/guaranteeInfoTrd?id=${item.id}`)
      }
    },
    getInfo () {
      let loanId = this.$route.params.signId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryLoanDetail({loanId}).then(res => {
            let success = res.data.success
            if (success) {
              let customer = res.data.data.customer
              let loan = res.data.data.loan
              let product = res.data.data.product
              let customerBank = res.data.data.customerBank
              this.phoneNum = customer.phoneNum
              this.auditStatus = loan.auditStatus
              this.loanWoodGuarantees = res.data.data.loanWoodGuarantees
              this.objCode = product.objCode // 产品编码
              this.isAdmittanceName = customer.isAdmittanceName // 是否准入
              this.objName = customer.objName // 项目名称
              this.objAbName = customer.objAbName // 项目简称
              this.creditCode = customer.creditCode // 证件号码
              this.mainCodeMark = loan.mainCodeMark // 主合同编号
              this.pledgeCodeMark = loan.pledgeCodeMark // 质押合同编号
              this.loanAttachList = res.data.data.loanAttachList // 附件
              let TypeArr = this.TypeArr
              if (this.loanAttachList.length > 0) {
                this.loanAttachList.forEach(element => {
                  TypeArr.push(element.attType)
                  return TypeArr
                })
              }
              // 借款信息
              let loanInfo = this.loanInfo
              loanInfo.productName = loan.productName // 贷款产品
              loanInfo.beginTime = formatDate(loan.beginTime)
              loanInfo.endTime = formatDate(loan.endTime)
              loanInfo.contDay = loan.contDay.toString() // 合同天数
              loanInfo.rateType = res.data.data.product.rateTypeName // 利率种类
              loanInfo.contRate = loan.contRate.toFixed(2) + '%' // 借款利率
              loanInfo.loanAmount = numberFormat(loan.loanAmount, 2) // 借款金额
              loanInfo.loanUseName = loan.loanUseName // 借款用途
              this.loanInfoValue = Object.values(this.loanInfo)
              // 借款人账户
              let accountInfo = this.accountInfo
              accountInfo.bankNo = customerBank.bankNo.toString() // 开户银行
              accountInfo.bankBranchNo = customerBank.bankBranchNo // 所属支行
              accountInfo.bankAccName = customerBank.bankAccName // 账号名
              accountInfo.bankCardNo = customerBank.bankCardNo // 银行账户
              this.accountInfoValue = Object.values(this.accountInfo)
              // 备注
              this.subContent = loan.subContent
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
    .info-pledge {
      font-size: px2rem(18);
      border: 1px solid #EFEFEF;
      .pledge {
        background: #eef5f9;
        border-bottom: 1px solid #EFEFEF;
        height: px2rem(54);
        align-items: center;
        div {
          padding: px2rem(20) px2rem(10);
          word-wrap:break-word;
          word-break:break-all;
        }
      }
      .brand {
        width: px2rem(180);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(14);
      }
      .series {
        width: px2rem(106);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(24);
      }
      .qualified-num {
        width: px2rem(150);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(24);
      }
      .frame-num {
        flex-grow: 1;
        padding-left: px2rem(24);
        align-items: center;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 90%;
        }
        .icon {
          font-size: px2rem(22);
          color: #999!important;
          display: flex;
          align-items: center;
          // line-height: 1;
        }
      }
    }
    .info-img {
      display: flex;
      flex-flow: row wrap;
    }
    .info-remark {
      padding-left: px2rem(14);
      font-size: px2rem(18);
      line-height: 1.5;
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
.matte {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: .5);
  z-index: 11;
  align-items: center;
  .close {
    .car-icon {
      font-size: px2rem(60);
      margin-top: px2rem(50);
      color: #fff;
    }
  }
  .content {
    width: 90%;
    margin-top: px2rem(200);
  }
  .content-top {
    height: px2rem(110);
    line-height: px2rem(110);
    text-align: center;
    background: #ecf4ff;
    font-size: px2rem(38);
    font-weight: 600;
    color: #178cfd;
    border-radius: px2rem(10) px2rem(10) 0 0;
  }
  .content-main {
    background: #fff;
    padding: px2rem(30) px2rem(46) px2rem(50);
    border-radius: 0 0 px2rem(10) px2rem(10);
    .main-point {
      font-size: px2rem(26);
      .car-icon {
        margin: px2rem(5) px2rem(10) 0 0;
      }
      span {
        line-height: 1.5;
        color: #606266;
      }
    }
    .main-verify {
      color: #606266;
      margin-top: px2rem(30);
      justify-content: space-between;
      input {
        width: px2rem(200);
        height: px2rem(60);
        font-size: px2rem(22);
        text-indent: px2rem(20);
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }
      button {
        width: px2rem(240);
        height: px2rem(60);
        font-size: px2rem(22);
        text-align: center;
        border-radius: 4px;
        background: #a0cfff;
      }
    }
    .main-bottom {
      width: 80%;
      height: px2rem(60);
      text-align: center;
      line-height: px2rem(60);
      background: #409eff;
      color: #fff;
      font-size: px2rem(24);
      border-radius: px2rem(20);
      margin: auto;
      margin-top: px2rem(50);
    }
  }
}
.can-click {
  background: #409eff!important;
}
</style>
