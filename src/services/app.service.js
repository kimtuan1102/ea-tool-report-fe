import $http from '../plugins/axios'
const AppService = {
  getAllReport () {
    return $http.get('/copy/reports/')
  },
  updateInitialBalance (accountId, initialBalance) {
    return $http.post('/copy/update-initial-balance', { accountId: accountId, initialBalance: initialBalance })
  },
  resetReportData () {
    return $http.post('/copy/reset-report-data')
  },
}
export default AppService
