import ContractList from '@/pages/contract/ContractList'
import Contract from '@/pages/contract/Contract'
export default [
  {
    path: '/contract/contractList',
    name: 'contractLst',
    component: ContractList,
    meta: { keepAlive: true }
  },
  {
    path: '/contract/contractPage/:loanId',
    name: 'contract',
    component: Contract,
    meta: { keepAlive: false }
  }
]
