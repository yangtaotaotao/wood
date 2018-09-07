import SignInfoList from '@/pages/sign/SignInfoList'
import SignInfo from '@/pages/sign/SignInfo'
import SignInfoCar from '@/pages/sign/SignInfoCar'
export default [
  {
    path: '/sign/signInfoList',
    name: 'signInfoList',
    component: SignInfoList,
    meta: { keepAlive: true }
  },
  {
    path: '/sign/signInfo/:signId',
    name: 'signInfo',
    component: SignInfo,
    meta: { keepAlive: false }
  },
  {
    path: '/sign/signInfoCar/:signId',
    name: 'signInfoCar',
    component: SignInfoCar,
    meta: { keepAlive: false }
  }
]
