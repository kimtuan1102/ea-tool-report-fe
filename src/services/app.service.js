import $http from '../plugins/axios'
import VueCookies from 'vue-cookies'
import $const from '../common/const'
import jwtDecode from 'jwt-decode'
import UtilsService from './utils.service'
const AppService = {
  getReports (params) {
    const queryStr = UtilsService.buildQuery(params)
    return $http.get(`/copy/reports?${queryStr}`)
  },
  updateReportFields (updateData) {
    return $http.post('/copy/update-report-fields', updateData)
  },
  resetReportData () {
    return $http.post('/copy/reset-report-data')
  },
  reportExcels (params) {
    const queryStr = UtilsService.buildQuery(params)
    window.location.href = `/copy/excels-report-data?${queryStr}`
  },
  sendMessageToTelegram (params, sendMessageData) {
    const queryStr = UtilsService.buildQuery(params)
    return $http.post(`/copy/send-message-telegram?${queryStr}`, sendMessageData)
  },
  deleteReportByAccountId (accountId) {
    return $http.delete(`/copy/delete-report/${accountId}`)
  },
  login (email, password) {
    return $http.post('/user/login', { email, password })
  },
  setToken (token) {
    return VueCookies.set($const.TOKEN_KEY, token)
  },
  getToken () {
    return VueCookies.get($const.TOKEN_KEY)
  },
  removeToken () {
    return VueCookies.remove($const.TOKEN_KEY)
  },
  getProfile () {
    return jwtDecode(this.getToken())
  },
}
export default AppService
