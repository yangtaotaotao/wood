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
        </div>
        <div class="list-right">
          <p class="item-status car-t-dgray">{{isAdmittanceName}}</p>
          <div class="item-address car-t-gray">{{createTime}}</div>
        </div>
      </div>
      <ul class="nav-list car-row car-bg-white">
        <li class="nav-item" :class="{'car-bg-blue': isSelect == index, 'car-t-white': isSelect == index}" v-for="(item, index) in navList" :key="index" @click="selectedTitle(item, index)">{{item}}</li>
      </ul>
    </div>
    <div class="info-content" ref="scrollContent">
      <div class="info car-bg-white" ref="basicInfo">
        <div class="info-title">
          <car-loan-title class="title" title="基本信息"></car-loan-title>
        </div>
        <div class="info-table">
          <template v-for="(item, index) in basicInfoValue">
            <info-table-group :itemTitle="basicInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
      <div class="info car-bg-white" ref="allInfo">
        <div class="info-title">
          <car-loan-title class="title" title="详细信息"></car-loan-title>
        </div>
        <div class="info-table account-table">
          <template v-for="(item, index) in allInfoValue">
            <info-table-group :itemTitle="allInfoKey[index]" :itemCon="item" :key="index"></info-table-group>
          </template>
        </div>
      </div>
      <div class="info car-bg-white" ref="bankInfo">
        <div class="info-title">
          <car-loan-title class="title" title="银行信息"></car-loan-title>
        </div>
        <div class="info-pledge">
          <div class="pledge car-row car-t-gray">
            <div class="brand">开户银行</div>
            <div class="series">所属支行</div>
            <div class="qualified-num">账号名</div>
            <div class="frame-num">银行账户</div>
          </div>
          <template v-for="(item, index) in customerBankInfo">
            <div class="pledge car-row car-t-dgray car-bg-white" v-if="item.bankType === 1" :key="index">
              <div class="brand">{{item.bankNo}}</div>
              <div class="series">{{item.bankBranchNo}}</div>
              <div class="qualified-num">{{item.bankAccName}}</div>
              <div class="frame-num">{{item.bankCardNo}}</div>
            </div>
          </template>
        </div>
      </div>
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="还款银行信息"></car-loan-title>
        </div>
        <div class="info-pledge">
          <div class="pledge car-row car-t-gray">
            <div class="brand">开户银行</div>
            <div class="series">所属支行</div>
            <div class="qualified-num">账号名</div>
            <div class="frame-num">银行账户</div>
          </div>
          <template v-for="(item, index) in customerBankInfo">
            <div class="pledge car-row car-t-dgray car-bg-white" v-if="item.bankType === 2" :key="index">
              <div class="brand">{{item.bankNo}}</div>
              <div class="series">{{item.bankBranchNo}}</div>
              <div class="qualified-num">{{item.bankAccName}}</div>
              <div class="frame-num">{{item.bankCardNo}}</div>
            </div>
          </template>
        </div>
      </div>
      <div class="info car-bg-white" ref="shareholderInfo">
        <div class="info-title">
          <car-loan-title class="title" title="股东信息"></car-loan-title>
        </div>
        <div class="info-pledge">
          <div class="pledge car-row car-t-gray">
            <div class="brand">股东类型</div>
            <div class="series">股东名称</div>
            <div class="qualified-num number">证件号码</div>
            <div class="frame-num">手机号码</div>
          </div>
          <div class="pledge car-row car-t-dgray car-bg-white" v-for="(item, index) in customerShareholderInfo" :key="index">
            <div class="brand">{{item.shareholderTypeName}}</div>
            <div class="series">{{item.shareholderName}}</div>
            <div class="qualified-num number">{{item.shareholderCertNo}}</div>
            <div class="frame-num car-row">
              <span>{{item.shareholderTel}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info car-bg-white" ref="linkInfo">
        <div class="info-title">
          <car-loan-title class="title" title="联系人"></car-loan-title>
        </div>
        <div class="info-pledge">
          <div class="pledge car-row car-t-gray">
            <div class="brand linkname">姓名</div>
            <div class="series phonenum">手机号码</div>
            <div class="qualified-num number">证件号码</div>
            <div class="frame-num">邮箱地址</div>
          </div>
          <div class="pledge car-row car-t-dgray car-bg-white" v-for="(item, index) in customerContactsInfo" :key="index">
            <div class="brand linkname">{{item.contName}}</div>
            <div class="series phonenum">{{item.contPhone}}</div>
            <div class="qualified-num number">{{item.contCertNo}}</div>
            <div class="frame-num car-row">
              <span>{{item.contEmail}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info img car-bg-white" ref="attachmentInfo">
        <div class="info-title">
          <car-loan-title class="title" title="附件信息"></car-loan-title>
        </div>
        <span v-if="!customerAttachmentList.length">没有附件</span>
        <div v-else class="info-img">
          <template v-for="(item, index) in customerAttachmentList">
            <info-img :imgInfo="item" :key="index" @biggerImg="biggerImg"></info-img>
          </template>
        </div>
      </div>
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="备注"></car-loan-title>
        </div>
        <div class="info-remark t-dgray">
          <span>{{subContent}}</span>
        </div>
      </div>
    </div>
    <bigger-img :biggerUrl="biggerUrl" :showBig="showBig" @closeImg.self="closeImg" @nextImg="nextImg"></bigger-img>
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg} from 'components'

import { queryCustomerInfo, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
export default {
  name: 'customer-info',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, BiggerImg
  },

  data () {
    return {
      navList: ['基本信息', '详细信息', '银行信息', '股东信息', '联系人', '附件'],
      // 基本
      basicInfo: {},
      basicInfoValue: [],
      basicInfoKey: ['企业简称', '公司类型', '木业商会会员号 ', '法定代表人 ', '法人证件号', '法人联系电话', '注册资本（万元） ', '营业期限', '客户经理'],
      // 详细
      allInfo: {},
      allInfoValue: [],
      allInfoKey: ['工商登记号', '特许经营许可证号', '登记机关', '年营业总额', '国家税务登记号', '地方税务登记号', '开户许可证核准号', '联系电话', '注册地址', '经营地址', '经营范围'],
      // 银行
      customerBankInfo: [],
      // 股东
      customerShareholderInfo: [],
      // 联系人
      customerContactsInfo: [],
      customerAttachmentList: [],
      biggerUrl: '',
      showBig: false,
      isSelect: 0,
      objName: '',
      creditCode: '',
      isAdmittanceName: '',
      createTime: '',
      subContent: '',
      urlArr: []
    }
  },

  methods: {
    biggerImg (imgUrl) {
      // this.biggerUrl = imgUrl
      this.biggerUrl = imgUrl
      this.showBig = true
    },
    closeImg () {
      this.showBig = false
      // console.log(this.urlArr.indexOf(this.biggerUrl))
    },
    nextImg () {
      // this.showBig = false
      let index = parseInt(this.urlArr.indexOf(this.biggerUrl))
      let length = this.urlArr.length
      if (index >= length - 1) {
        this.biggerUrl = this.urlArr[0]
      } else {
        this.biggerUrl = this.urlArr[index + 1]
      }
      console.log(this.biggerUrl)
    },
    // 菜单选择
    selectedTitle (item, index) {
      let isSelect = this.isSelect === index
      this.isSelect = isSelect ? null : index
      switch (index) {
        case 0:
          this.$refs.scrollContent.scrollTop = this.$refs.basicInfo.offsetTop - 198
          break
        case 1:
          this.$refs.scrollContent.scrollTop = this.$refs.allInfo.offsetTop - 198
          break
        case 2:
          this.$refs.scrollContent.scrollTop = this.$refs.bankInfo.offsetTop - 198
          break
        case 3:
          this.$refs.scrollContent.scrollTop = this.$refs.shareholderInfo.offsetTop - 198
          break
        case 4:
          this.$refs.scrollContent.scrollTop = this.$refs.linkInfo.offsetTop - 198
          break
        case 5:
          this.$refs.scrollContent.scrollTop = this.$refs.attachmentInfo.offsetTop
          break
      }
    },
    getInfo () {
      let customerId = this.$route.params.customerId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryCustomerInfo({customerId}).then(res => {
            let success = res.data.success
            if (success) {
              let data = res.data.data
              let customer = data.customer
              this.subContent = customer.subContent
              this.customerBankInfo = data.customerBankInfo // 银行信息
              this.customerShareholderInfo = data.customerShareholderInfo // 股东信息
              this.customerContactsInfo = data.customerContactsInfo // 联系人信息
              this.customerAttachmentList = data.customerAttachmentList
              let urlArr = this.urlArr
              if (this.customerAttachmentList.length > 0) {
                this.customerAttachmentList.forEach(item => {
                  if (item.fileExt !== 'PDF' && item.fileExt !== 'DOC' && item.fileExt !== 'DOCX') {
                    urlArr.push(item.fileId)
                  }
                  return urlArr
                })
              }
              this.objName = customer.objName // 企业名称
              this.creditCode = customer.creditCode // 证件号码
              this.isAdmittanceName = customer.isAdmittanceName // 是否准入
              this.createTime = formatDate(new Date(customer.createTime), true) // 时间
              // 基本信息
              let basicInfo = this.basicInfo
              basicInfo.objAbName = customer.objAbName // 企业简称
              basicInfo.orgTypeName = customer.orgTypeName // 公司类型
              basicInfo.membershipNum = customer.membershipNum // 木业商会会号
              basicInfo.orgLegalPerson = customer.orgLegalPerson // 法定代表人
              basicInfo.credNum = customer.credNum // 法定人证件号
              basicInfo.phoneNum = customer.phoneNum // 法定人联系电话
              basicInfo.registeredCapital = customer.registeredCapital ? numberFormat(customer.registeredCapital, 2) : '' // 注册资本
              basicInfo.limitTime = customer.startTime ? formatDate(new Date(customer.startTime)).replace(/-/g, '/') + '-' + formatDate(new Date(customer.endTime)).replace(/-/g, '/') : ''
              basicInfo.managerName = customer.managerName // 客户经理
              this.basicInfoValue = Object.values(this.basicInfo)
              // 详细信息
              let allInfo = this.allInfo
              let customerInfo = data.customerInfo
              allInfo.businessRegistration = customerInfo.businessRegistration // 工商登记号
              allInfo.franchiseLicenseNumber = customerInfo.franchiseLicenseNumber // 特许经营许可证号
              allInfo.registrationAuthority = customerInfo.registrationAuthority // 登记机关
              allInfo.totalAnnualTurnover = customerInfo.totalAnnualTurnover ? numberFormat(customerInfo.totalAnnualTurnover, 2) : '' // 年营业总额
              allInfo.nationalTaxRegistrationNumb = customerInfo.nationalTaxRegistrationNumb // 国家税务登记号
              allInfo.localTaxRegistrationNumber = customerInfo.localTaxRegistrationNumber // 地方税务登记号
              allInfo.openAccountLicenseNumber = customerInfo.openAccountLicenseNumber // 开户许可证核准号
              allInfo.contactNumber = customerInfo.contactNumber // 联系电话
              allInfo.address = customerInfo.registeredFirstSelectArea + customerInfo.registeredSecondSelectArea + customerInfo.registeredThirdSelectArea + customerInfo.registeredAddressDetail ? customerInfo.registeredFirstSelectArea + customerInfo.registeredSecondSelectArea + customerInfo.registeredThirdSelectArea + customerInfo.registeredAddressDetail : ''
              allInfo.managerAddress = customerInfo.operatingFirstSelectArea + customerInfo.operatingSecondSelectArea + customerInfo.operatingThirdSelectArea + customerInfo.operatingAddressDetail ? customerInfo.operatingFirstSelectArea + customerInfo.operatingSecondSelectArea + customerInfo.operatingThirdSelectArea + customerInfo.operatingAddressDetail : ''
              allInfo.operatingScope = customerInfo.operatingScope // 经营范围
              this.allInfoValue = Object.values(this.allInfo)
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
.nav-list {
  align-items: center;
  padding: 0 px2rem(20);
  height: px2rem(70);
  font-size: px2rem(24);
  margin-top: px2rem(14);
  border-bottom: 2px solid #eeeeee;
  li {
    height: px2rem(70);
    line-height: px2rem(70);
    padding: 0 px2rem(8);
    flex-grow: 0;
    flex-shrink: 0;
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
        // height: px2rem(54);
        align-items: center;
        padding: px2rem(20) 0;
        // div {
        //   height: px2rem(54);
        //   line-height: px2rem(54);
        // }
      }
      .brand {
        width: px2rem(100);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(14);
      }
      .linkname {
        width: px2rem(60);
      }
      .series {
        width: px2rem(100);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(14);
      }
      .phonenum {
        width: px2rem(140);
      }
      .qualified-num {
        width: px2rem(150);
        flex-grow: 0;
        flex-shrink: 0;
        padding-left: px2rem(14);
      }
      .number {
        width: px2rem(230);
      }
      .frame-num {
        flex-grow: 1;
        padding-left: px2rem(14);
        align-items: center;
        display: flex;
        flex-flow: row wrap;
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
}
.list-right {
  flex-grow: 1;
  text-align: right;
  font-size: px2rem(18);
  .item-address {
    margin-top: px2rem(20);
  }
}
</style>
