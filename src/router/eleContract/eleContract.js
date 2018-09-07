import EleContract from '@/pages/eleContract/EleContract'
import EleContractInfo from '@/pages/eleContract/EleContractInfo'
export default [
  // 客户列表
  {
    path: '/eleCon/eleContract',
    name: 'eleContract',
    component: EleContract,
    meta: { keepAlive: true }
  },
  // 客户详细信息
  {
    path: '/eleCon/eleContractInfo/:eleId',
    name: 'eleContractInfo',
    component: EleContractInfo,
    meta: { keepAlive: false }
  }
]
