import ApproveList from '@/pages/approve/ApproveList'
import ApproveInfo from '@/pages/approve/ApproveInfo'
import BackInfo from '@/pages/approve/BackInfo'
import BorrowInfo from '@/pages/approve/BorrowInfo'
import PriceEdit from '@/pages/approve/PriceEdit'
import CarInfo from '@/pages/approve/CarInfo'
import ApproveRecord from '@/pages/approve/ApproveRecord'
import BackInfoSecond from '@/pages/approve/BackInfoSecond'
import LumberInfo from '@/pages/approve/LumberInfo'
import GuaranteeInfo from '@/pages/approve/GuaranteeInfo'
import GuaranteeInfoSec from '@/pages/approve/GuaranteeInfoSec'
import GuaranteeInfoTrd from '@/pages/approve/GuaranteeInfoTrd'
import NoRepayOut from '@/pages/approve/NoRepayOut'
export default [
  // 放款审批列表
  {
    path: '/approve/approveList',
    name: 'approveList',
    component: ApproveList,
    meta: { keepAlive: true }
  },
  // 放款审批详情
  {
    path: '/approve/approveInfo',
    name: 'approveInfo',
    component: ApproveInfo,
    meta: { keepAlive: false }
  },
  // 质押物赎回详情
  {
    path: '/approve/backInfo',
    name: 'backInfo',
    component: BackInfo,
    meta: { keepAlive: false }
  },
  // 质押物赎回详情
  {
    path: '/approve/backInfoSecond',
    name: 'backInfoSecond',
    component: BackInfoSecond,
    meta: { keepAlive: false }
  },
  // 质押物详情
  {
    path: '/approve/borrowInfo',
    name: 'borrowInfo',
    component: BorrowInfo,
    meta: { keepAlive: false }
  },
  // 不还款出库
  {
    path: '/approve/noRepayOut',
    name: 'noRepayOut',
    component: NoRepayOut,
    meta: { keepAlive: false }
  },
  // 汽车价格编辑
  {
    path: '/approve/priceEdit',
    name: 'priceEdit',
    component: PriceEdit,
    meta: { keepAlive: false }
  },
  // 车辆信息
  {
    path: '/approve/carInfo',
    name: 'carInfo',
    component: CarInfo,
    meta: { keepAlive: false }
  },
  // 审批记录
  {
    path: '/approve/approveRecord/:loanId',
    name: 'approveRecord',
    component: ApproveRecord,
    meta: { keepAlive: false }
  },
  // 木业借款详情
  {
    path: '/approve/lumberInfo',
    name: 'lumberInfo',
    component: LumberInfo,
    meta: { keepAlive: false }
  },
  // 担保信息
  {
    path: '/approve/guaranteeInfo',
    name: 'guaranteeInfo',
    component: GuaranteeInfo,
    meta: { keepAlive: false }
  },
  // 担保信息
  {
    path: '/approve/guaranteeInfoSec',
    name: 'guaranteeInfoSec',
    component: GuaranteeInfoSec,
    meta: { keepAlive: false }
  },
  // 担保信息
  {
    path: '/approve/guaranteeInfoTrd',
    name: 'guaranteeInfoTrd',
    component: GuaranteeInfoTrd,
    meta: { keepAlive: false }
  }
]
