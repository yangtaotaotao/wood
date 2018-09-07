import UserInfo from '@/pages/user/UserInfo'

export default [
  {
    path: '/user/userInfo',
    name: 'userInfo',
    component: UserInfo,
    meta: { keepAlive: false }
  }
]
