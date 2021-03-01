import $http from '../plugins/axios'
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
    window.location.href = process.env.VUE_APP_BASE_API_PUBLIC + '/copy/excels-report-data'
  },
}
export default AppService
