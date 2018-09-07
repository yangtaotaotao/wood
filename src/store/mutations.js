import {
  SET_LOADING_SHOW,
  SHOW_GET_CATEGORYLIST,
  SHOW_GET_CITYLIST,
  SHOW_GET_SUPPLIERCITY,
  GET_PHONENUM,
  GET_PACKETCOUNT
} from './mutation-types.js'

export default {
  // 设置加载图标是否显示
  [SET_LOADING_SHOW] (state, {isShow = false} = {}) {
    state.isLoadingShow = isShow
  },
  // 材料类别
  [SHOW_GET_CATEGORYLIST] (state, {
    getCategoryList
  }) {
    state.getCategoryList = getCategoryList
  },
  // 城市选择
  [SHOW_GET_CITYLIST] (state, {
    getCityList
  }) {
    state.getCityList = getCityList
  },
  // 供应商地区选择
  [SHOW_GET_SUPPLIERCITY] (state, {
    getSupplierCity
  }) {
    state.getSupplierCity = getSupplierCity
  },
  // 验证手机号 并回显
  [GET_PHONENUM] (state, {
    phoneNum
  }) {
    state.phoneNum = phoneNum
  },
  // 判断当前采购是否收到了红bao
  [GET_PACKETCOUNT] (state, {
    packetCount
  }) {
    state.packetCount = packetCount
  }
}
