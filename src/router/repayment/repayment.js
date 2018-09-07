import RepaymentList from '@/pages/repayment/RepaymentList'
import RepaymentInfo from '@/pages/repayment/RepaymentInfo'
export default [
  // 客户列表
  {
    path: '/repayment/repaymentList',
    name: 'repaymentList',
    component: RepaymentList,
    meta: { keepAlive: true }
  },
  // 客户详细信息
  {
    path: '/repayment/repaymentInfo/:repaymentId',
    name: 'repaymentInfo',
    component: RepaymentInfo,
    meta: { keepAlive: false }
  }
]
