import $http from '../plugins/axios'
const AppService = {
  getAllReport () {
    return $http.get('/copy/reports/')
  },
}
export default AppService
