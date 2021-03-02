import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import $const from '../common/const'
const $http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_PRIVATE,
})
$http.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${VueCookies.get($const.TOKEN_KEY)}`,
    }
    return config
  },
  err => Promise.reject(err),
)
$http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      VueCookies.remove($const.TOKEN_KEY)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
Vue.prototype.$http = $http
export default $http
