import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index/Index'

// 登陆
import login from './login/login'
// 赎回
import redeem from './redeem/redeem'
// 客户
import customer from './customer/customer'
// 质押详情
import loanInfo from './loanInfo/loanInfo'
// 放款审批
import approve from './approve/approve'
// 合同
import contract from './contract/contract'
// 还款
import repayment from './repayment/repayment'
// 我的代办已办
import process from './process/process'
// 电子合同
import eleContract from './eleContract/eleContract'
// 我的资料
import user from './user/user'
// 符合盖章
import signInfo from './sign/signInfo'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    { // 首页
      path: '/index',
      name: 'index',
      component: Index
      // meta: { keepAlive: true }
    },
    ...login,
    ...redeem,
    ...customer,
    ...loanInfo,
    ...approve,
    ...contract,
    ...repayment,
    ...process,
    ...eleContract,
    ...user,
    ...signInfo
  ]
})
