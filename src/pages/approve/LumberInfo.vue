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
          <span class="approve-wait car-t-dgray">等待<span class="car-t-blue" v-text="`【${approUserName}】`"></span>审批</span>
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
          <car-loan-title class="title" title="担保信息"></car-loan-title>
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
      <div class="info img car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="联合贷款协议"></car-loan-title>
        </div>
        <span v-if="loanAttachList.length === 0 || TypeArr.indexOf(6) === -1">
          <other-img :imgInfo="6"></other-img>
        </span>
        <div v-else class="info-img">
          <template v-for="(item, index) in loanAttachList">
            <contract-img v-if="item.attType === 6" :key="index" :imgInfo="item"></contract-img>
          </template>
        </div>
      </div>
      <div class="info car-bg-white">
        <div class="info-title">
          <car-loan-title class="title" title="联合贷款"></car-loan-title>
        </div>
        <div class="info-union">
          <div class="info-add car-row">
            <ul class="info-select car-row">
              <li class="info-select-item car-row" v-for="(item, index) in selectLoan" :key="index" @click="selectedLoan(item, index)">
                <span class="circle" :class="{selected: index == isLoan}"></span>
                <span class="select car-t-dgray" v-text="item.text"></span>
              </li>
            </ul>
            <button class="add-btn" v-if="flowFlag === 1 && type === 2 && isLoan === 1" @click="addUnion">添加联合贷款</button>
          </div>
          <div class="loan-person car-column" ref="unionWrap">
            <div class="person car-row car-t-dgray">
              <span>主要贷款人</span>
              <span class="loan-company">{{loanOrgMainName}}</span>
              <span class="loan-price">{{loanOrgMainPrice | numberFormat}}</span>
            </div>
            <div class="person car-row car-t-dgray" v-for="(item, index) in loanOrgList" :key="item.id" v-show="index > 0 && item.loanAmount">
              <span>其他贷款人</span>
              <span class="loan-company">{{item.loanOrgName}}</span>
              <span class="loan-price">{{item.loanAmount | numberFormat}}</span>
            </div>
            <div class="person car-row car-t-dgray" v-for="(key, keyIndex) in addLength" :key="keyIndex" v-show="addLength.length">
              <span>其他贷款人</span>
              <div class="union-selector">
                <span class="loan-company user-company" @click="key.flag = !key.flag">{{key.name}}</span>
                <ul v-show="key.flag">
                  <li class="loan-company" v-for="(item, itemIndex) in loanOrgList" :key="item.itemIndex" v-show="itemIndex > 0" v-text="item.loanOrgName" @click="selectName(key, item)"></li>
                </ul>
              </div>
              <input class="loan-price user-price" placeholder="金额" v-model="key.loanAmountSum" @change="inputPrice(key)"/>
              <button class="delete-btn car-bg-red" @click="deleteUnion(key, keyIndex)">删 除</button>
            </div>
          </div>
        </div>
      </div>
      <div class="info car-bg-white" v-show="flowFlag === 1">
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
          <div class="file">
            <div class="info-upload car-column car-main-center">
              <icon class="car-icon" icon="icon-yunshangchuan1"></icon>
              <span>附件上传</span>
              <img :src="filePath" alt="" v-if="filePath">
              <input type="file" ref="fileInput" @change="pushImg($event)" accept="image/*">
            </div>
            <div class="info-upload car-column car-main-center" v-for="(item) in imgURLArr" :key="item">
              <img :src="URL + item" alt="">
              <span @click="deleteURL(item)" class="img-delete car-t-white">X</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-footer car-row" v-if="flowFlag === 1 ">
      <div class="confirm car-row car-main-center car-bg-blue car-t-white" @click="confirmPrice">复核</div>
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
    <!-- <input type="button" value="" placeholder=""> -->
  </div>
</template>
<script>
import {AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, ContractImg, OtherImg, BiggerImg} from 'components'
import { queryLoanDetail, isLogined, queryJointLoanByLoanId, attachDelete, getUserType } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
import BASE_URL from '@/api/baseURL.js'
import axios from 'axios'
export default {
  name: 'approve-info',

  components: {
    AppTitle, Icon, CarLoanTitle, InfoTableGroup, InfoImg, ContractImg, OtherImg, BiggerImg
  },

  data () {
    return {
      URL: `${BASE_URL}/app/readRes/`,
      loanInfo: {},
      loanInfoValue: [],
      loanInfoKey: ['贷款产品', '开始日期', '结束日期 ', '合同天数', '利率种类', '借款利率 ', '借款金额', '借款用途', '保证金', '保证金比例', '保证金额度', '抵押率', '京农比例', '京农金额'],
      accountInfo: {},
      accountInfoValue: [],
      accountInfoKey: ['开户银行', '所属支行', '账号名', '银行账户'],
      imgURLArr: [],
      selectLoan: [
        {
          type: 0,
          text: '普通贷款'
        },
        {
          type: 1,
          text: '联合贷款'
        }
      ],
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
      loanOrgList: [],
      loanOrgMainId: '',
      loanOrgMainName: '',
      loanOrgMainPrice: '',
      loanOrgId: '',
      approUserName: '',
      approTime: '',
      addLength: [],
      objId: this.$route.query.objId,
      insId: this.$route.query.insId,
      bbaNodeId: this.$route.query.bbaNodeId,
      flowFlag: parseInt(this.$route.query.flowFlag),
      type: parseInt(this.$route.query.type),
      flowListId: this.$route.query.flowListId,
      objStatus: this.$route.query.objStatus,
      loanAmount: '',
      textContent: '',
      objCode: '',
      canClick: true,
      auditStatus: 0,
      showMatte: false,
      phoneNum: '',
      msgCode: '',
      isDisabled: true,
      verifyPoint: '60s后重新发送',
      seconds: 60
    }
  },

  computed: {
    // loanOrgMainPrice () {
    //   if (this.loanAmount) {
    //     // let price1 = 0
    //     // let price2 = 0
    //     // if (this.loanOrgList.length > 1) {
    //     //   this.loanOrgList.slice(1).reduce((pre, cur) => {
    //     //     price1 = parseInt(pre) + parseInt(cur)
    //     //   })
    //     // }
    //     // if (this.addLength.length > 0) {
    //     //   this.addLength.reduce((pre, cur) => {
    //     //     price2 = parseInt(pre) + parseInt(cur)
    //     //   })
    //     // }
    //     // return parseInt(this.loanAmount) - price1 - price2
    //     return this.loanAmount
    //     // return 1
    //   }
    // }
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
    confirmSign () {
      this.showMatte = false
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          this.savePrice()
        }
      })
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
    // 审批记录
    toRecord () {
      this.$router.push(`/approve/approveRecord/${this.insId}`)
    },
    // 返回
    goBack () {
      this.$router.back()
    },
    // 联合贷款
    selectedLoan (item, index) {
      if (this.flowFlag === 1 && this.type === 2) { // 1 待办 可编辑
        let isLoan = this.isLoan === index
        this.isLoan = isLoan ? null : index
      } else {
        return false
      }
    },
    // 添加联合贷款
    addUnion () {
      // this.showList = false
      let item = {
        flag: false,
        loanOrgId: '',
        loanAmountSum: '',
        id: '',
        name: '请选择其他贷款人'
      }
      this.addLength.push(item)
    },
    deleteUnion (key, keyIndex) {
      this.addLength.splice(keyIndex, 1)
      let price2 = 0
      let addLength = this.addLength
      if (addLength.length === 1) {
        price2 = addLength[0].loanAmountSum
      } else if (addLength.length > 1) {
        price2 = addLength.reduce((pre, cur) => {
          return parseInt(pre.loanAmountSum) + parseInt(cur.loanAmountSum)
        })
      }
      this.loanOrgMainPrice = this.loanAmount - price2
    },
    // 输入金额
    inputPrice (key) {
      // let price1 = 0
      let price2 = 0
      let addLength = this.addLength
      if (addLength.length === 1) {
        price2 = addLength[0].loanAmountSum
      } else if (addLength.length > 1) {
        price2 = addLength.reduce((pre, cur) => {
          return parseInt(pre.loanAmountSum) + parseInt(cur.loanAmountSum)
        })
      }
      if (this.loanOrgMainPrice < parseInt(key.loanAmountSum)) {
        this.$store.dispatch('setToast', {text: '剩余贷款余额不足'})
      } else {
        this.loanOrgMainPrice = this.loanAmount - price2
      }
    },
    // 选择联合贷款
    selectName (key, item) {
      key.flag = false
      key.name = item.loanOrgName
      key.loanOrgId = item.loanOrgId
      key.id = item.id
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
        var formData = new FormData()
        formData.append('type', 8)
        formData.append('file', _this.$refs.fileInput.files[0])
        isLogined().then(res => {
          if (!res.data.success) {
            this.$router.push('/login')
          } else {
            axios.post(`${BASE_URL}/app/busniess/review/importAttachment`, formData).then(res => {
              if (res.data.success) {
                _this.$store.dispatch('setToast', {text: '图片上传成功'})
                _this.imgURLArr.push(res.data.data.fileId)
              }
            })
          }
        })
      }
    },
    deleteURL (item) {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          attachDelete({fileId: item}).then(res => {
            if (res.data.success) {
              let index = this.imgURLArr.indexOf(item)
              if (index > -1) {
                this.imgURLArr.splice(index, 1)
              }
              //  this.$store.dispatch('setToast', {text: '图片删除成功'})
            }
          })
        }
      })
    },
    // 价格编辑
    toPriceEdit (item) {
      this.$router.push(`/approve/priceEdit?type=${this.type}&insId=${this.insId}&autoId=${item.id}`)
    },
    getInfo () {
      let id = this.insId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryLoanDetail({loanId: id}).then(res => {
            let success = res.data.success
            if (success) {
              let customer = res.data.data.customer
              let loan = res.data.data.loan
              let customerBank = res.data.data.customerBank
              let product = res.data.data.product
              this.approUserName = res.data.data.bizFlow.approUserName
              this.approTime = res.data.data.bizFlow.approTime
              this.objCode = product.objCode // 产品编码
              this.loanWoodGuarantees = res.data.data.loanWoodGuarantees // 价格编辑
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
              loanInfo.beginTime = formatDate(new Date(loan.beginTime))
              loanInfo.endTime = formatDate(new Date(loan.endTime))
              loanInfo.contDay = loan.contDay.toString() // 合同天数
              loanInfo.rateTypeName = product.rateTypeName // 利率种类
              loanInfo.contRate = loan.contRate.toFixed(2) + '%' // 借款利率
              loanInfo.loanAmount = numberFormat(loan.loanAmount, 2) // 借款金额
              this.loanAmount = loan.loanAmount
              loanInfo.loanUseName = loan.loanUseName // 借款用途
              loanInfo.loanBond = loan.loanBond ? '是' : '否' // 是否需要保证金
              loanInfo.bondProportion = loan.bondProportion.toFixed(2) + '%' // 保证金比例
              loanInfo.bondLimit = numberFormat(loan.bondLimit, 2) // 保证金额度
              loanInfo.mortgageRate = loan.mortgageRate.toFixed(2) + '%' // 抵押率
              loanInfo.jnLoanProportion = loan.jnLoanProportion.toFixed(2) + '%' // 京农出资比例
              loanInfo.jnLimit = numberFormat(loan.jnLimit, 2) // 京农出资额度
              this.loanInfoValue = Object.values(this.loanInfo)
              // 借款人账户
              let accountInfo = this.accountInfo
              accountInfo.bankNo = customerBank.bankNo // 开户银行
              accountInfo.bankBranchNo = customerBank.bankBranchNo // 所属支行
              accountInfo.bankAccName = customerBank.bankAccName // 账号名
              accountInfo.bankCardNo = customerBank.bankCardNo // 银行账户
              this.accountInfoValue = Object.values(this.accountInfo)
              // 备注
              this.subContent = loan.subContent
            }
          })
          this.queryJoint()
        }
      })
    },
    queryJoint () {
      queryJointLoanByLoanId({loanId: this.insId}).then(res => {
        if (res.data.success) {
          this.isLoan = res.data.data.jointLoan
          this.loanOrgList = res.data.data.loanOrgList // 联合贷款
          this.loanOrgMainName = this.loanOrgList[0].loanOrgName // 主贷款人
          this.loanOrgMainId = this.loanOrgList[0].loanOrgId
          this.loanOrgMainPrice = this.loanOrgList[0].loanAmount
          this.loanOrgId = this.loanOrgList[0].id
        }
      })
    },
    confirmPrice () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          getUserType().then(res => {
            let userType = res.data.data.userType
            if (res.data.success && userType === 1) {
              this.showMatte = true
              this.phoneNum = res.data.data.mobile
            } else {
              this.savePrice()
            }
          })
        }
      })
    },
    savePrice () {
      let addLength = this.addLength
      let arrMain = [{id: this.loanOrgId, loanOrgId0: this.loanOrgMainId, loanAmountSum: this.loanOrgMainPrice}]
      let str = `${this.insId},${this.objId},${this.bbaNodeId},flow,${this.type},1,${this.flowListId}`
      let param = {
        loanId: this.insId,
        auditOpinion: this.textContent,
        auditStatus: this.isView + 1,
        attachments: this.imgURLArr.join(','),
        loanOrgInfo: arrMain.concat(addLength),
        business: str,
        msgCode: this.msgCode
      }
      let _this = this
      this.$store.commit('SET_LOADING_SHOW', {isShow: true})
      axios({
        method: 'post',
        params: param,
        headers: { 'Content-Type': 'application/json;charse=UTF-8' },
        transformRequest: [function () {
          return JSON.stringify(param)
        }],
        url: `${BASE_URL}/app/busniess/review/addLoanOrg`
      }).then((res) => {
        if (res.data.success) {
          _this.$store.dispatch('setToast', {text: res.data.message})
          _this.$store.commit('SET_LOADING_SHOW', {isShow: false})
          _this.$router.back()
        } else {
          _this.$store.dispatch('setToast', {text: res.data.message})
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
        input {
          margin-right: px2rem(12);
          display: block;
          font-size: px2rem(18);
          color: #999999!important;
        }
        .loan-company {
          width: px2rem(258);
          height: px2rem(46);
          line-height: px2rem(46);
          // padding: px2rem(8);
          padding-left: px2rem(10);
          border-radius: 2px;
          border: 1px solid #EFEFEF;
          color: #999999!important;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
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
        .user-price {
          width: px2rem(120);
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
      .file {
        display: flex;
        flex-flow: row wrap;
      }
      .info-upload {
        position: relative;
        width: px2rem(120);
        height: px2rem(120);
        border: 1px solid #eeeeee;
        font-size: px2rem(18);
        color: #999;
        margin-top: px2rem(30);
        margin-right: px2rem(20);
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
        .img-delete {
          position: absolute;
          right: px2rem(-10);
          top: px2rem(-16);
          width: px2rem(30);
          height: px2rem(30);
          border-radius: 50%;
          text-align: center;
          line-height: px2rem(30);
          font-size: px2rem(20);
          background: #999;
        }
      }
    }
  }
}
.union-selector {
  position: relative;
  ul {
    position: absolute;
    width: px2rem(256);
    border: 1px solid #efefef;
    border-top: 0;
    color: #999;
    li {
      height: px2rem(46);
      line-height: px2rem(46);
      padding-left: px2rem(10);
      background: #fff;
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
.add-btn {
  padding: px2rem(10) px2rem(10);
  background: #2e6f99;
  color: #fff;
  margin-left: px2rem(40);
  margin-top: px2rem(-10);
  border-radius: 3px;
}
.delete-btn {
  padding: px2rem(10) px2rem(10);
  color: #fff;
  margin-left: px2rem(20);
  border-radius: 3px;
}
input::-webkit-input-placeholder {
  // WebKit browsers
  color: #999 !important;
}
input:-moz-placeholder {
  // Mozilla Firefox 4 to 18
  color: #999 !important;
}
input::-moz-placeholder {
  // Mozilla Firefox 19+/
  color: #999 !important;
}
input:-ms-input-placeholder {
  // Internet Explorer 10+/
  color: #999 !important;
}
</style>
