import CustomerList from '@/pages/customer/CustomerList'
import CustomerInfo from '@/pages/customer/CustomerInfo'
export default [
  // 客户列表
  {
    path: '/customer/customerList',
    name: 'customerList',
    component: CustomerList,
    meta: { keepAlive: true }
  },
  // 客户详细信息
  {
    path: '/customer/customerInfo/:customerId',
    name: 'customerInfo',
    component: CustomerInfo,
    meta: { keepAlive: false }
  }
]
