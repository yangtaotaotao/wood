import RedeemList from '@/pages/redeem/RedeemList'
import RedeemInfo from '@/pages/redeem/RedeemInfo'
import SubstitutionInfo from '@/pages/redeem/SubstitutionInfo'
export default [
  {
    path: '/redeem/redeemList',
    name: 'redeemList',
    component: RedeemList,
    meta: { keepAlive: true }
  },
  // 赎回详情
  {
    path: '/redeem/redeemInfo/:id',
    name: 'redeemInfo',
    component: RedeemInfo,
    meta: { keepAlive: false }
  },
  // 质押详情
  {
    path: '/redeem/substitutionInfo/:id',
    name: 'substitutionInfo',
    component: SubstitutionInfo,
    meta: { keepAlive: false }
  }
]
