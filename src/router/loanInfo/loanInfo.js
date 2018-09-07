import LoanInfoList from '@/pages/loanInfo/LoanInfoList'
import LoanInfo from '@/pages/loanInfo/LoanInfo'
export default [
  {
    path: '/loanInfo/loanInfoList',
    name: 'loanInfoList',
    component: LoanInfoList,
    meta: { keepAlive: true }
  },
  {
    path: '/loanInfo/loanInfo/:loanId',
    name: 'loanInfo',
    component: LoanInfo,
    meta: { keepAlive: false }
  }
]
