import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state = {
  /**
   * 控制 loading 是否显示
   * @type {Boolean}
   */
  isLoadingShow: false,
  toast: {
    title: '操作成功',
    show: false
  },
  // 材料类别
  getCategoryList: {},
  // 城市地区
  getCityList: {},
  // 供应商地区选择
  getSupplierCity: {},
  // 电话
  phoneNum: '请输入您的手机号',
  // 红包
  packetCount: 0
}
const modules = {
  home: {
    namespaced: true,
    state: {
      tabs: [
        // {
        //   to: '/gold',
        //   title: '金牌供应商库',
        //   icon: 'icon-jinpai'
        // },
        {
          to: '/index',
          title: '神采易易',
          icon: 'icon-zhuye'
        },
        {
          to: '/user',
          title: '个人中心',
          icon: 'icon-gerenziliao'
        }
      ]
    }
  }
}
export default new Vuex.Store({
  modules,
  state,
  actions,
  mutations,
  getters
})
