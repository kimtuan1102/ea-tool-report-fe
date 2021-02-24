import axios from 'axios'
import Vue from 'vue'
const $http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
})
Vue.prototype.$http = $http
export default $http
