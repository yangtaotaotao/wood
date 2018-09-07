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
          <car-loan-title class="title" title="被倒货板材"></car-loan-title>
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
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="新库信息"></car-loan-title>
        </div>
        <div class="info-pledge">
          <div class="pledge car-row car-t-gray">
            <div class="brand">存放地</div>
            <div class="brand">联系人</div>
            <div class="qualified-num">电话</div>
          </div>
          <div class="pledge car-row car-t-dgray car-bg-white">
            <div class="brand">{{woodAuto.storeMarket}}</div>
            <div class="brand">{{woodAuto.marketContact}}</div>
            <div class="qualified-num">{{woodAuto.contactMobile}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="附件信息"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(1) === -1">没有附件</span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <info-img v-if="item.attType === 1" :imgInfo="item" :key="index" @biggerImg="biggerImg"></info-img>
          </template>
        </div>
      </div> -->
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
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="入库单"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(4) === -1">
          <other-img :imgInfo="4"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 4" :key="index" :imgInfo="item"></contract-img>
          </template>
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
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg, ContractImg, OtherImg} from 'components'
import { queryUpcomingWoodGuarantee, approveRusWoodDh, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'borrow-info',

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
      biggerUrl: '',
      showBig: false,
      isLoan: 0,
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
      isView: 0,
      filePath: '',
      loanAttachList: [],
      TypeArr: [],
      approUserName: '',
      approTime: '',
      loanWoodGuarantees: [],
      insId: this.$route.query.insId,
      flowFlag: parseInt(this.$route.query.flowFlag),
      flowListId: this.$route.query.flowListId,
      objStatus: this.$route.query.objStatus,
      textContent: '',
      woodAuto: {}
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
      console.log(1)
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
              this.woodAuto = res.data.data.woodAuto
              this.loanWoodGuarantees = res.data.data.woodInfo // 被替换车辆信息
              this.approUserName = res.data.data.bizFlow.approUserName
              this.approTime = res.data.data.bizFlow.approTime
              this.loanAttachList = res.data.data.attInfo // 附件
              let TypeArr = this.TypeArr
              if (this.loanAttachList.length > 0) {
                this.loanAttachList.forEach(element => {
                  TypeArr.push(element.attType)
                  return TypeArr
                })
              }
            }
          })
        }
      })
    },
    confirmSave () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          approveRusWoodDh(
            {
              flowListId: this.flowListId,
              radioPro: this.isView + 1,
              textContent: this.textContent,
              insId: this.insId
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
    .info-union {
      .info-select {
        align-items: center;
        margin-bottom: px2rem(14);
        padding-left: px2rem(14);
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
        width: px2rem(114);
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
      width: px2rem(100);
    }
    .contract-num, .back-approve-link {
      width: px2rem(194);
    }
    .customer-name {
      width: px2rem(256);
    }
    .start-time, .end-time {
      width: px2rem(150);
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

</style>
