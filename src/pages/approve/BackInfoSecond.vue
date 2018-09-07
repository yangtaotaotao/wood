<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="详细信息">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
      <div class="approve-title car-row car-bg-white">
        <div class="approve-time car-bg-blue car-t-white car-row car-main-center">
          <icon class="car-icon" icon="icon-shizhongclock77"></icon>
        </div>
        <div class="approve-company car-column" @click="toRecord" v-if="flowFlag === 1">
          <span class="approve-wait car-t-dgray">已提交等待<span class="car-t-blue" v-text="`【${approUserName}】`"></span>审批</span>
          <span class="car-t-gray" v-show="approTime">{{approTime | formatDate(true)}}</span>
        </div>
        <div class="approve-company car-column" @click="toRecord" v-else>
          <span class="approve-wait car-t-dgray">查看<span class="car-t-blue" v-text="`【${objStatus}】`"></span>审批记录</span>
          <span class="car-t-gray" v-show="approTime">{{approTime | formatDate(true)}}</span>
        </div>
        <div class="approve-right">
          <icon class="car-icon" icon="icon-right"></icon>
        </div>
      </div>
    </div>
    <div class="info-content">
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="被赎回板材"></car-loan-title>
        </div>
        <div class="info-pledge wood-wrapper car-column">
          <div class="pledge wood car-row car-t-gray">
            <div class="brand">板材种类</div>
            <div class="series">规格</div>
            <div class="qualified-num">产地</div>
            <div class="frame-num">包号</div>
          </div>
          <div class="pledge car-row car-t-dgray car-bg-white" v-for="(item, index) in loanWoodGuarantees" :key="index" @click="toGuaranteeInfo(item)">
            <div class="brand">{{item.boardType}}</div>
            <div class="series">{{item.boardSpeci}}</div>
            <div class="qualified-num">{{item.placeOrigin}}</div>
            <div class="frame-num car-row">
              <span>{{item.packetNumber}}</span>
              <icon class="car-icon" icon="icon-right"></icon>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="info car-bg-white" v-if="!isScheduled">
        <div class="info-title">
          <car-loan-title class="title" title="还款计划"></car-loan-title>
        </div>
        <ul class="info-select car-row">
          <span class="type">还按期：</span>
          <li class="info-select-item car-row" v-for="(item, index) in selectType" :key="index">
            <span class="circle" :class="{selected: index == isType}"></span>
            <span class="select car-t-dgray" v-text="item.text"></span>
          </li>
        </ul>
        <div class="scroll-content car-column">
          <div class="back-approve back-approve-title car-row car-bg-white car-t-gray">
            <span class="product-name">期数</span>
            <span class="contract-num">应还总额</span>
            <span class="contract-num">本金</span>
            <span class="contract-num">利息</span>
            <span class="start-time">应还款日</span>
          </div>
          <div class="back-approve back-approve-list car-row car-bg-white car-t-dgray" v-for="(item, index) in plan" :key="index">
            <span class="product-name">{{item.forwardNumber}}</span>
            <span class="contract-num">{{item.forwardAmount + item.forwardInterest | numberFormat}}</span>
            <span class="contract-num">{{item.forwardAmount | numberFormat}}</span>
            <span class="contract-num">{{item.forwardAmount | numberFormat}}</span>
            <span class="start-time">{{item.dueTime  | formatDate}}</span>
          </div>
        </div>
      </div> -->
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="提前还款信息"></car-loan-title>
        </div>
        <ul class="info-select car-row" v-show="isScheduled">
          <span class="type">还按期：</span>
          <li class="info-select-item car-row" v-for="(item, index) in selectType" :key="index">
            <span class="circle" :class="{selected: index == isType}"></span>
            <span class="select car-t-dgray" v-text="item.text"></span>
          </li>
        </ul>
        <div class="info-ahead">
          <div class="info-ahead-content car-row">
            <span class="info-ahead-title car-t-dgray">提前还款金额</span>
            <p class="car-row"><span class="info-ahead-price">{{advanceRepaymentInfo.amount | numberFormat}}</span>元</p>
          </div>
          <div class="info-ahead-content car-row">
            <span class="info-ahead-title car-t-dgray">应收利息</span>
            <p class="car-row"><span class="info-ahead-price">{{advanceRepaymentInfo.interest | numberFormat}}</span>元</p>
          </div>
          <div class="info-ahead-content car-row">
            <span class="info-ahead-title car-t-dgray">还款总额</span>
            <p class="car-row"><span class="info-ahead-price">{{advanceRepaymentInfo.totalAmount | numberFormat}}</span>元</p>
          </div>
          <div class="info-ahead-content car-row">
            <span class="info-ahead-title car-t-dgray">赎回日期</span>
            <p class="car-row"><span class="info-ahead-price">{{advanceRepaymentInfo.redeemDate | formatDate}}</span></p>
          </div>
        </div>
      </div>
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="质押物解压证明、还款pos机凭条"></car-loan-title>
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
          <car-loan-title class="title" title="出库单"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(5) === -1">
          <other-img :imgInfo="5"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 5" :key="index" :imgInfo="item"></contract-img>
          </template>
        </div>
      </div>
      <!-- <div class="info img car-bg-white" v-if="flowFlag === 2">
        <div class="info-title">
          <car-loan-title class="title" title="质押物解压证明、还款pos机凭条"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(2) === -1">
          <other-img :imgInfo="2"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 2" :key="index" :imgInfo="item"></contract-img>
          </template>
        </div>
      </div> -->
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="合同信息"></car-loan-title>
        </div>
        <div class="scroll-content car-column">
          <div class="back-approve back-approve-title car-row car-bg-white car-t-gray">
            <span class="product-name">合同编号</span>
            <span class="contract-num">产品名称</span>
            <span class="contract-num">合同金额</span>
            <span class="contract-num">客户姓名</span>
            <span class="start-time">开始时间</span>
            <span class="start-time">结束时间</span>
            <span class="start-time">利率种类</span>
            <span class="start-time">合同利率</span>
          </div>
          <div class="back-approve back-approve-list car-row car-bg-white car-t-dgray" v-for="(item, index) in plan" :key="index">
            <span class="product-name">{{item.mainCodeMark}}</span>
            <span class="contract-num">{{item.productName}}</span>
            <span class="contract-num">{{item.loanAmount | numberFormat}}</span>
            <span class="contract-num">{{item.customerName}}</span>
            <span class="start-time">{{item.beginTime | formatDate}}</span>
            <span class="start-time">{{item.endTime | formatDate}}</span>
            <span class="start-time" v-text="item.rateType === 1 ? '日利率':'年利率'"></span>
            <span class="start-time" v-text="`${item.contRate.toFixed(2)}%`">{{item.contRate}}</span>
          </div>
        </div>
      </div>
      <div class="info car-bg-white" v-if="flowFlag === 1">
        <div class="info-title car-row">
          <car-loan-title class="title" title="客户余额信息"></car-loan-title>
          <button class="add-btn" @click="getCard">刷新余额</button>
        </div>
        <div class="scroll-content car-column">
          <div class="back-approve back-approve-title car-row car-bg-white car-t-gray">
            <span class="product-card">卡号</span>
            <span class="contract-num car-name">客户名称</span>
            <span class="back-approve-link">余额</span>
            <span class="start-time">到账时间</span>
          </div>
          <div class="back-approve back-approve-list car-row car-bg-white car-t-dgray">
            <span class="product-card">{{userCardInfo.cardNo}}</span>
            <span class="contract-num car-name">{{userCardInfo.customerName}}</span>
            <span class="back-approve-link">{{userCardInfo.balance | numberFormat}}</span>
            <span v-if="userCardInfo.arrivalDate === '/'" class="start-time">{{userCardInfo.arrivalDate}}</span>
            <span v-else class="start-time" v-show="userCardInfo.arrivalDate">{{userCardInfo.arrivalDate | formatDate}}</span>
          </div>
        </div>
      </div>
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="贷款分账"></car-loan-title>
        </div>
        <div class="scroll-content car-column">
          <div class="back-approve back-approve-title car-row car-bg-white car-t-gray">
            <span class="product-card">合同编号</span>
            <span class="product-card">小贷公司</span>
            <span class="contract-num">放贷金额</span>
            <span class="contract-num">本金（元）</span>
            <span class="contract-num">本息（元）</span>
            <span class="contract-num">京农服务费（元）</span>
          </div>
          <div class="back-approve back-approve-list car-row car-bg-white car-t-dgray" v-for="(item, index) in orgList" :key="index">
            <span class="product-card">{{item.mainCodeMark}}</span>
            <span class="product-card">{{item.objName}}</span>
            <span class="contract-num">{{item.loanAmount | numberFormat}}</span>
            <span class="contract-num">{{item.principal | numberFormat}}</span>
            <span class="contract-num">{{item.interest | numberFormat}}</span>
            <span class="contract-num">{{item.ylCost | numberFormat}}</span>
          </div>
        </div>
      </div>
      <div class="info car-bg-white" v-if="flowFlag === 1">
        <div class="info-title">
          <car-loan-title class="title" title="复核意见"></car-loan-title>
        </div>
        <div class="info-union">
          <ul class="info-select car-row">
            <li class="info-select-item car-row" v-for="(item, index) in selectView" :key="index" @click="selectedView(item, index)">
              <span class="circle" :class="{selected: index == isView}"></span>
              <span class="select car-t-dgray" v-text="item.text"></span>
            </li>
          </ul>
          <textarea name="" id="" cols="30" rows="10" v-model="textContent"></textarea>
          <!-- <div class="info-upload car-column car-main-center">
            <icon class="car-icon" icon="icon-yunshangchuan1"></icon>
            <span>附件上传</span>
            <img :src="filePath" alt="" v-if="filePath">
            <input type="file" ref="fileInput" @change="pushImg($event)" accept="image/*">
          </div> -->
        </div>
      </div>
    </div>
    <div class="info-footer car-row" v-if="flowFlag === 1">
      <div class="confirm car-row car-main-center car-bg-blue car-t-white" @click="confirmSave">确认复核</div>
      <div class="cancle car-row car-main-center car-t-blue" @click="goBack">取消</div>
    </div>
    <div class="info-footer2" @click="goBack" v-else>返回</div>
    <bigger-img :biggerUrl="biggerUrl" :showBig="showBig" @closeImg="closeImg"></bigger-img>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, ContractImg, OtherImg, BiggerImg} from 'components'
import { queryUpcomingWoodGuarantee, readUserCardInfo, redeemFhSave, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'back-info-second',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, ContractImg, OtherImg, BiggerImg
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
      biggerUrl: '',
      showBig: false,
      selectView: [
        {
          type: 0,
          text: '同意'
        },
        {
          type: 1,
          text: '拒绝'
        }
      ],
      selectType: [
        {
          type: 0,
          text: '是'
        },
        {
          type: 1,
          text: '否'
        }
      ],
      isType: 0,
      isView: 0,
      filePath: '',
      loanAttachList: [],
      TypeArr: [],
      approUserName: '',
      approTime: '',
      objName: '',
      objAbName: '',
      creditCode: '',
      mainCodeMark: '',
      pledgeCodeMark: '',
      loanWoodGuarantees: [],
      flowFlag: parseInt(this.$route.query.flowFlag),
      insId: this.$route.query.insId,
      flowListId: this.$route.query.flowListId,
      objStatus: this.$route.query.objStatus,
      advanceRepaymentInfo: {},
      repaymentInfo: {},
      plan: [],
      isScheduled: 0,
      textContent: '',
      orgList: [],
      userCardInfo: {}
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
    biggerImg (imgUrl) {
      this.biggerUrl = imgUrl
      this.showBig = true
    },
    closeImg () {
      this.showBig = false
    },
    // 审批记录
    toRecord () {
      this.$router.push(`/approve/approveRecord/${this.insId}`)
    },
    // 担保信息
    toGuaranteeInfo (item) {
      this.$router.push(`/approve/guaranteeInfo?id=${item.id}`)
    },
    // 刷新余额
    addUnion () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          this.getCard()
        }
      })
    },
    // 返回
    goBack () {
      this.$router.back()
    },
    // 车辆信息
    toCarInfo (item) {
      this.$router.push(`/approve/carInfo?id=${item.id}`)
    },
    // 是否同意
    selectedView (item, index) {
      let isView = this.isView === index
      this.isView = isView ? null : index
    },
    // 附件上传
    pushImg (e) {
      let reader = new FileReader()
      reader.readAsDataURL(this.$refs.fileInput.files[0])
      let _this = this
      reader.onload = function () {
        _this.filePath = this.result
        // var formData = new FormData()
        // formData.append('supplierId', supplierId)
        // formData.append('file', _this.$refs.fileInput.files[0])
        // axios.post('/cxt_web/supplier/company/file/upload', formData).then(res => {
        //   if (res.data.status) {
        //     _this.$store.dispatch('setToast', {text: '图片上传成功'})
        //     _this.fileId = res.data.companyFile.id
        //   }
        // })
      }
    },
    getInfo () {
      let id = this.insId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryUpcomingWoodGuarantee({id}).then(res => {
            let success = res.data.success
            if (success) {
              this.approUserName = res.data.data.bizFlow.approUserName
              this.approTime = res.data.data.bizFlow.approTime
              this.loanWoodGuarantees = res.data.data.woodInfo // 赎回车辆信息
              this.loanAttachList = res.data.data.attInfo // 附件
              let TypeArr = this.TypeArr
              if (this.loanAttachList.length > 0) {
                this.loanAttachList.forEach(element => {
                  TypeArr.push(element.attType)
                  return TypeArr
                })
              }
              // 提前还款信息
              this.advanceRepaymentInfo = res.data.data.hkInfo
              // 合同信息
              this.repaymentInfo = res.data.data.repaymentInfo
              // 合同信息
              this.plan = res.data.data.htList
              // 是否还按期
              this.isScheduled = res.data.data.isScheduled
              this.isType = this.isScheduled
              // 贷款分账
              this.orgList = res.data.data.orgList
            }
            this.getCard()
          })
        }
      })
    },
    getCard () {
      let id = this.loanWoodGuarantees[0].loanId
      readUserCardInfo({id}).then(res => {
        let success = res.data.success
        if (success) {
          this.userCardInfo = res.data.data.userCardInfo
        }
      })
    },
    confirmSave () {
      if (this.isView === 0 && this.userCardInfo.balance < this.advanceRepaymentInfo.totalAmount) {
        this.$store.dispatch('setToast', {text: '当前余额不足'})
      } else {
        isLogined().then(res => {
          if (!res.data.success) {
            this.$router.push('/login')
          } else {
            redeemFhSave(
              {
                loanId: this.loanWoodGuarantees[0].loanId,
                flowListId: this.flowListId,
                radioPro: this.isView + 1,
                textContent: this.textContent,
                insId: this.insId,
                customerBankBalance: this.userCardInfo.balance
              }
            ).then(res => {
              if (res.data.success) {
                this.$store.dispatch('setToast', {text: res.data.message})
                this.$router.back()
              } else {
                this.$store.dispatch('setToast', {text: res.data.message})
              }
            })
          }
        })
      }
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
.approve-title {
  padding: px2rem(28) px2rem(20);
  margin-bottom: px2rem(14);
  align-items: center;
  position: relative;
  .approve-time {
    width: px2rem(50);
    height: px2rem(50);
    border-radius: 100%;
    font-size: px2rem(30);
  }
  .approve-company {
    font-size: px2rem(18);
    margin-left: px2rem(20);
    .approve-wait {
      font-size: px2rem(24);
      margin-bottom: px2rem(14);
    }
  }
  .approve-right {
    font-size: px2rem(36);
    color: #999999;
    position: absolute;
    right: px2rem(10);
  }
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
    .info-pledge {
      font-size: px2rem(18);
      border: 1px solid #EFEFEF;
      .pledge {
        background: #eef5f9;
        border-bottom: 1px solid #EFEFEF;
        height: px2rem(54);
        align-items: center;
        word-break: break-all;
        div {
         padding: px2rem(20) px2rem(10);
         padding-right: 0;
        }
      }
      .brand {
        width: px2rem(100);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(14);
      }
      .series {
        width: px2rem(90);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(24);
      }
      .qualified-num {
        width: px2rem(170);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(24);
      }
      .frame-num {
        flex-grow: 1;
        padding-left: px2rem(24);
        align-items: center;
        justify-content: space-between;
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
    .info-union {
      .loan-person {
        font-size: px2rem(18);
        .person {
          margin-top: px2rem(16);
          align-items: center;
        }
        span {
          margin-right: px2rem(12);
          display: block;
          font-size: px2rem(18);
        }
        .loan-company {
          width: px2rem(258);
          height: px2rem(46);
          line-height: px2rem(46);
          padding-left: px2rem(10);
          border-radius: 2px;
          border: 1px solid #EFEFEF;
          color: #999999;
        }
        .loan-price {
          width: px2rem(204);
          height: px2rem(46);
          line-height: px2rem(46);
          padding-left: px2rem(10);
          border-radius: 2px;
          border: 1px solid #EFEFEF;
          color: #999999;
          margin-right: 0;
        }
      }
      textarea {
        width: 100%;
        height: px2rem(164);
        font-size: px2rem(28);
        color: #666;
        line-height: 1.2;
        border: 1px solid #ddd;
        border-radius: 3px;
        outline: none;
        padding-left: px2rem(10);
      }
      .info-upload {
        position: relative;
        width: px2rem(120);
        height: px2rem(120);
        border: 1px solid #eeeeee;
        font-size: px2rem(18);
        color: #999;
        margin-top: px2rem(30);
        border-radius: 3px;
        .car-icon {
          font-size: px2rem(60);
          color: #999;
        }
        img {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
    .info-select {
      align-items: center;
      margin-bottom: px2rem(14);
      padding-left: px2rem(14);
      .type {
        font-size: px2rem(26);
        color: #666;
      }
      li {
        margin-right: px2rem(36);
        font-size: px2rem(24);
        align-items: center;
        .circle {
          display: flex;
          width: px2rem(32);
          height: px2rem(32);
          border-radius: 100%;
          border: 1px solid #999;
          margin-right: px2rem(10);
        }
        .selected {
          background: #999!important;
        }
      }
    }
    .info-ahead {
      padding-left: px2rem(14);
      .info-ahead-content {
        align-items: center;
        font-size: px2ren(18);
        margin-bottom: px2rem(16);
        p {
          align-items: center;
        }
      }
      .info-ahead-title {
        display: block;
        width: px2rem(150);
        text-align: right;
      }
      .info-ahead-price {
        display: block;
        width: px2rem(340);
        height: px2rem(46);
        line-height: px2rem(46);
        padding-left: px2rem(20);
        border: 1px solid #EFEFEF;
        border-radius: 2px;
        margin: 0 px2rem(14);
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
.scroll-content {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  .back-approve-list:nth-child(even) {
    span {
      background: #fff!important;
    }
  }
  .back-approve-list:nth-child(odd) {
    span {
      background: #eef5f9!important;
    }
  }
  .back-approve {
    align-items: center;
    font-size: px2rem(18);
    height: px2rem(54);
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
      width: px2rem(280);
    }
    .product-card {
      width: px2rem(240);
    }
    .contract-num, .back-approve-link {
      width: px2rem(194);
    }
    .car-name {
      width: px2rem(270)!important;
    }
    .customer-name {
      width: px2rem(256);
    }
    .start-time, .end-time {
      width: px2rem(140);
    }
    .back-approve-day {
      width: px2rem(120);
    }
    .rate-method {
      width: px2rem(200);
    }
    .loan-price {
      width: px2rem(200);
    }
  }
  .back-approve-title {
    color: #2e6f99;
    span {
      background: #eef5f9!important;
    }
  }
}
.add-btn {
  padding: px2rem(10) px2rem(10);
  background: #2e6f99 !important;
  color: #fff;
  margin-left: px2rem(40);
  margin-top: px2rem(-10);
}
</style>
