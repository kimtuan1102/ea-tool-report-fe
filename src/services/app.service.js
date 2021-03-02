import $http from '../plugins/axios'
import VueCookies from 'vue-cookies'
import $const from '../common/const'
import jwtDecode from 'jwt-decode'
const AppService = {
  getAllReport () {
    return $http.get('/copy/reports/')
  },
  updateReportFields (accountId, initialBalance, telegram, deposit, withdraw) {
    return $http.post('/copy/update-report-fields',
      {
        accountId: accountId, initialBalance: initialBalance, telegram: telegram, deposit: deposit, withdraw: withdraw,
      })
  },
  resetReportData () {
    return $http.post('/copy/reset-report-data')
  },
  reportExcels () {
    window.location.href = '/copy/excels-report-data'
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
