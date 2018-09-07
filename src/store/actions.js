// import {checkSimple} from '@/api/getData.js'
// import {GET_USERINFO} from './mutation-types.js'
// import util from '@/util'

// let openId = util.getUrlParam('openId')
export default {
  setToast ({state, commit, dispatch}, {text}) {
    state.toast.title = text
    state.toast.show = true
    setTimeout(() => {
      state.toast.show = false
    }, 3000)
  }
  // async getUserInfo ({commit, state}, {openId}) {
  //   let res = await checkSimple({openId})
  //   commit(GET_USERINFO, res)
  // }
}
