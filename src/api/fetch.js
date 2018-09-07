import axios from 'axios'
import util from '../util'
import store from '../store/index'

const baseURL = window.location.origin
export const ajax = axios.create({
  baseURL,

  // data: {
  //   code,
  //   purchaserId
  // },

  paramsSerializer (params) {
    let requset = []
    for (let type in params) {
      let target = util.isEmpty(params[type]) ? params[type] : ''
      requset.push(`${type}=${target}`)
    }
    return requset.join('&')
  },

  transformRequest (data) {
    let requset = []
    for (let type in data) {
      let target = util.isEmpty(data[type]) ? data[type] : ''
      requset.push(`${type}=${target}`)
    }
    return requset.join('&')
  },

  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  // cache: 'reload',
  timeout: 20000,

  responseType: 'json', // default

  xsrfCookieName: 'XSRF-TOKEN', // default

  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  validateStatus (status) {
    return status >= 200 && status < 300 // default
  },

  // requset headers: set-cookie
  withCredentials: true
})

export const fetch = ({logError = true, url, method = 'post', data = {}, params = {}, headers = {}}) => {
  store.commit('SET_LOADING_SHOW', {isShow: true})
  const response = ajax({
    url, method, data, params, headers
  }).then(response => {
    store.commit('SET_LOADING_SHOW', {isShow: false})
    return response
  }).catch((err) => {
    if (!logError) return
    store.dispatch('setToast', {text: '网络出错, 请稍后再试'})
    store.commit('SET_LOADING_SHOW', {isShow: false})
    console.log('err', err.status)
    console.log('err', err.statusText)
    console.log('err', err.url)
    console.log('err', window.navigator.userAgent)
  })
  return response
}
