import QueryTodoList from '@/pages/process/QueryTodoList'
import QueryDoneList from '@/pages/process/QueryDoneList'
export default [
  // 我的代办
  {
    path: '/process/queryTodoList',
    name: 'queryTodoList',
    component: QueryTodoList,
    meta: { keepAlive: true }
  },
  // 我的已办
  {
    path: '/process/queryDoneList',
    name: 'queryDoneList',
    component: QueryDoneList,
    meta: { keepAlive: true }
  }
]
