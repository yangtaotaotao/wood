
import BASE_URL from './baseURL'
import {fetch} from './fetch'

const URL = {
  Login: `${BASE_URL}/app/login`,
  Logout: `${BASE_URL}/app/logout`,
  isLogined: `${BASE_URL}/app/isLogined`,
  updatePass: `${BASE_URL}/app/user/updatePass`,
  isAccounting: `${BASE_URL}/app/AutoGuarantee/isAccounting`,
  loanQueryList: `${BASE_URL}/app/loan/queryList`,
  queryLoanDetail: `${BASE_URL}/app/loan/queryLoanDetail`,
  queryCustomerList: `${BASE_URL}/app/customer/queryCustomerList`,
  queryCustomerInfo: `${BASE_URL}/app/customer/queryCustomerInfo`,
  queryContractList: `${BASE_URL}/app/contract/queryList`,
  queryContractDetail: `${BASE_URL}/app/contract/queryDetail`,
  sendSignCode: `${BASE_URL}/app/contract/sendSignCode`,
  signContract: `${BASE_URL}/app/contract/signContract`,
  queryListAutoGuarantee: `${BASE_URL}/app/AutoGuarantee/queryList`,
  queryDetailAutoGuarantee: `${BASE_URL}/app/AutoGuarantee/queryDetail`,
  queryListRepaymentPlan: `${BASE_URL}/app/repaymentPlan/queryList`,
  queryDetailRepaymentPlan: `${BASE_URL}/app/repaymentPlan/queryDetail`,
  queryTodoList: `${BASE_URL}/app/process/queryTodoList`,
  queryHaveDoneList: `${BASE_URL}/app/process/queryHaveDoneList`,
  queryJointLoanByLoanId: `${BASE_URL}/app/busniess/review/queryJointLoanByLoanId`,
  queryAutoPriceAudisDetail: `${BASE_URL}/app/autoPriceAudit/queryAutoPriceAudisDetail`,
  attachDelete: `${BASE_URL}/app/attach/delete`,
  queryUpcoming: `${BASE_URL}/app/AutoGuarantee/queryUpcoming`,
  queryLoanFlowListByLoanId: `${BASE_URL}/app/busniess/review/queryLoanFlowListByLoanId`,
  addAutoPriceAudit: `${BASE_URL}/app/autoPriceAudit/addAutoPriceAudit`,
  updateRedeemZhSave: `${BASE_URL}/app/AutoGuarantee/updateRedeemZhSave`,
  addLoanOrg: `${BASE_URL}/app/busniess/review/addLoanOrg`,
  queryUpcomingKj: `${BASE_URL}/app/AutoGuarantee/queryUpcomingKj`,
  readUserCardInfo: `${BASE_URL}/app/WoodGuarantee/readUserCardInfo`,
  accountingReview: `${BASE_URL}/app/AutoGuarantee/accountingReview`,
  queryCarInfo: `${BASE_URL}/app/AutoGuarantee/queryCarInfo`,
  queryListWoodGuarantee: `${BASE_URL}/app/WoodGuarantee/queryList`,
  queryDetailWoodGuarantee: `${BASE_URL}/app/WoodGuarantee/queryDetail`,
  queryUpcomingWoodGuarantee: `${BASE_URL}/app/WoodGuarantee/queryUpcoming`,
  redeemFhSave: `${BASE_URL}/app/WoodGuarantee/redeemFhSave`,
  approveRusWoodDh: `${BASE_URL}/app/WoodGuarantee/approveRusWoodDh`,
  approveRusWoodBhk: `${BASE_URL}/app/WoodGuarantee/approveRusWoodBhk`,
  loanSendSignCode: `${BASE_URL}/app/loan/sendSignCode`,
  reviewSignature: `${BASE_URL}/app/loan/reviewSignature`,
  getUserType: `${BASE_URL}/app/busniess/review/getUserType`
}
// 用户登录
export const Login = ({username, password, captcha, deviceId, rememberMe}) => fetch({
  url: URL.Login,
  method: 'post',
  data: {username, password, captcha, deviceId, rememberMe}
})
// 退出
export const Logout = () => fetch({
  url: URL.Logout,
  method: 'post'
})
// 判断用户是否需要发送短信验证
export const getUserType = () => fetch({
  url: URL.getUserType,
  method: 'post'
})
// 修改密码
export const updatePass = ({userId, newPass, oldPass}) => fetch({
  url: URL.updatePass,
  method: 'post',
  data: {userId, newPass, oldPass}
})
// 是否登录
export const isLogined = () => fetch({
  url: URL.isLogined,
  method: 'get'
})
// 判断用户身份
export const isAccounting = ({id}) => fetch({
  url: URL.isAccounting,
  method: 'get',
  params: {id}
})
// 借款信息列表
export const loanQueryList = ({pageSize, pageNum, customerName}) => fetch({
  url: URL.loanQueryList,
  method: 'get',
  params: {pageSize, pageNum, customerName}
})
// 借款信息详情
export const queryLoanDetail = ({loanId}) => fetch({
  url: URL.queryLoanDetail,
  method: 'get',
  params: {loanId}
})
// 客户列表
export const queryCustomerList = ({pageSize, pageNum, objName}) => fetch({
  url: URL.queryCustomerList,
  method: 'get',
  params: {pageSize, pageNum, objName}
})
// 客户详情
export const queryCustomerInfo = ({customerId}) => fetch({
  url: URL.queryCustomerInfo,
  method: 'get',
  params: {customerId}
})
// 合同列表
export const queryContractList = ({pageSize, pageNum, customerName}) => fetch({
  url: URL.queryContractList,
  method: 'get',
  params: {pageSize, pageNum, customerName}
})
// 合同详情
export const queryContractDetail = ({loanId}) => fetch({
  url: URL.queryContractDetail,
  method: 'get',
  params: {loanId}
})
// 签订合同短信验证码
export const sendSignCode = ({loanId}) => fetch({
  url: URL.sendSignCode,
  method: 'post',
  data: {loanId}
})
// 验证短信验证码并签订合同
export const signContract = ({msgCode, loanId}) => fetch({
  url: URL.signContract,
  method: 'post',
  data: {msgCode, loanId}
})
// 质押列表
export const queryListAutoGuarantee = ({pageSize, pageNum, customerName, mainCodeMark, guaranteeStatus, startTime, endTime}) => fetch({
  url: URL.queryListAutoGuarantee,
  method: 'get',
  params: {pageSize, pageNum, customerName, mainCodeMark, guaranteeStatus, startTime, endTime}
})
// 质押详情
export const queryDetailAutoGuarantee = ({id}) => fetch({
  url: URL.queryDetailAutoGuarantee,
  method: 'get',
  params: {id}
})
// 还款列表
export const queryListRepaymentPlan = ({pageSize, pageNum, customerName, mainCodeMark, dueTime, bankCardNo}) => fetch({
  url: URL.queryListRepaymentPlan,
  method: 'get',
  params: {pageSize, pageNum, customerName, mainCodeMark, dueTime, bankCardNo}
})
// 还款详情
export const queryDetailRepaymentPlan = ({repayPlanId}) => fetch({
  url: URL.queryDetailRepaymentPlan,
  method: 'get',
  params: {repayPlanId}
})
// 我的待办
export const queryTodoList = ({pageSize, pageNum, objName, busDesc}) => fetch({
  url: URL.queryTodoList,
  method: 'get',
  params: {pageSize, pageNum, objName, busDesc}
})
// 我的已办
export const queryHaveDoneList = ({pageSize, pageNum, objName, busDesc}) => fetch({
  url: URL.queryHaveDoneList,
  method: 'get',
  params: {pageSize, pageNum, objName, busDesc}
})
// 联合贷款信息
export const queryJointLoanByLoanId = ({loanId}) => fetch({
  url: URL.queryJointLoanByLoanId,
  method: 'get',
  params: {loanId}
})
// 根据借款id查询流程信息列表
export const queryLoanFlowListByLoanId = ({loanId}) => fetch({
  url: URL.queryLoanFlowListByLoanId,
  method: 'get',
  params: {loanId}
})
// 汽车价格
export const queryAutoPriceAudisDetail = ({loanId, autoId}) => fetch({
  url: URL.queryAutoPriceAudisDetail,
  method: 'get',
  params: {loanId, autoId}
})
// 保存汽车价格
export const addAutoPriceAudit = ({data, mainData}) => fetch({
  url: URL.addAutoPriceAudit,
  method: 'post',
  // headers: {'Content-Type': 'application/json;charset=UTF-8'},
  data: {data, mainData}
})
// 删除附件
export const attachDelete = ({fileId}) => fetch({
  url: URL.attachDelete,
  method: 'post',
  data: {fileId}
})
// 车辆质押/赎回 代办详情
export const queryUpcoming = ({id}) => fetch({
  url: URL.queryUpcoming,
  method: 'get',
  params: {id}
})
// 赎回 会计审核
export const queryUpcomingKj = ({id}) => fetch({
  url: URL.queryUpcomingKj,
  method: 'get',
  params: {id}
})
// 读取卡号余额
export const readUserCardInfo = ({id}) => fetch({
  url: URL.readUserCardInfo,
  method: 'get',
  params: {id}
})
// 置换复核
export const updateRedeemZhSave = ({flowListId, radioPro, textContent, id}) => fetch({
  url: URL.updateRedeemZhSave,
  method: 'get',
  params: {flowListId, radioPro, textContent, id}
})
// 待办复核 借款
export const addLoanOrg = ({platformAverageprice, id, carLine, carLineId, carLineValus, goodCar, goodCarId, goodCarValus, cattleCar, cattleCarId, cattleCarValus}) => fetch({
  url: URL.addLoanOrg,
  method: 'post',
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  data: {platformAverageprice, id, carLine, carLineId, carLineValus, goodCar, goodCarId, goodCarValus, cattleCar, cattleCarId, cattleCarValus}
})
// 会计复核
export const accountingReview = ({flowListId, radioPro, textContent, id, customerBankBalance}) => fetch({
  url: URL.accountingReview,
  method: 'get',
  // headers: {'Content-Type': 'application/json;charset=UTF-8'},
  params: {flowListId, radioPro, textContent, id, customerBankBalance}
})
// 车辆详情
export const queryCarInfo = ({id}) => fetch({
  url: URL.queryCarInfo,
  method: 'get',
  params: {id}
})
// 质押列表 木业
export const queryListWoodGuarantee = ({pageSize, pageNum, customerName}) => fetch({
  url: URL.queryListWoodGuarantee,
  method: 'get',
  params: {pageSize, pageNum, customerName}
})
// 质押详情  木业
export const queryDetailWoodGuarantee = ({id}) => fetch({
  url: URL.queryDetailWoodGuarantee,
  method: 'get',
  params: {id}
})
// 倒货详情 代办详情
export const queryUpcomingWoodGuarantee = ({id}) => fetch({
  url: URL.queryUpcomingWoodGuarantee,
  method: 'get',
  params: {id}
})
// 倒货 复核
export const approveRusWoodDh = ({flowListId, radioPro, textContent, insId}) => fetch({
  url: URL.approveRusWoodDh,
  method: 'get',
  params: {flowListId, radioPro, textContent, insId}
})
// 不还款 出库 复核
export const approveRusWoodBhk = ({flowListId, radioPro, textContent, insId}) => fetch({
  url: URL.approveRusWoodBhk,
  method: 'get',
  params: {flowListId, radioPro, textContent, insId}
})
// 正常 出库 复核
export const redeemFhSave = ({loanId, flowListId, radioPro, textContent, insId, customerBankBalance}) => fetch({
  url: URL.redeemFhSave,
  method: 'get',
  params: {loanId, flowListId, radioPro, textContent, insId, customerBankBalance}
})
// 签章
export const loanSendSignCode = ({mobile}) => fetch({
  url: URL.loanSendSignCode,
  method: 'post',
  data: {mobile}
})
export const reviewSignature = ({loanId, mobile, msgCode}) => fetch({
  url: URL.reviewSignature,
  method: 'post',
  data: {loanId, mobile, msgCode}
})
