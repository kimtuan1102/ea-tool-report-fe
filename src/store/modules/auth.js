import AppService from '../../services/app.service'
import jwtDecode from 'jwt-decode'
import router from '../../router'
import Vue from 'vue'
const errorList = [
  'isAccountDoesNotExist',
  'isUserBlocked',
  'isWrongPassword',
]
const state = () => ({
  userProfile: {},
  token: AppService.getToken(),
  loading: false,
  isAccountDoesNotExist: false,
  isUserBlocked: false,
  isWrongPassword: false,
  loginAttempts: 0,

})
const mutations = {
  setUserProfile (state, data) {
    state.userProfile = data
  },
  setToken (state, token) {
    state.token = token
  },
  setLoading (state, isLoading) {
    state.loading = isLoading
  },
  setErrorSate (state, stateName) {
    for (const item of errorList) {
      state[item] = false
    }
    state[stateName] = true
  },
  setLoginAttempts (state, loginAttempts) {
    state.loginAttempts = loginAttempts
  },
  resetError (state) {
    state.isAccountDoesNotExist = false
    state.isUserBlocked = false
    state.isWrongPassword = false
    state.loginAttempts = 0
  },
}
const actions = {
  login (context, { email, password }) {
    context.commit('setLoading', true)
    AppService.login(email, password)
      .then(res => {
        const accessToken = res.data.accessToken
        context.commit('setUserProfile', jwtDecode(accessToken))
        context.commit('setToken', accessToken)
        context.commit('resetError')
        AppService.setToken(accessToken)
        router.push('/')
    })
      .catch((e) => {
        const response = e.response.data
        switch (response.type) {
          case 'accountDoesNotExist':
            context.commit('setErrorSate', 'isAccountDoesNotExist')
            break
          case 'userBlocked':
            context.commit('setErrorSate', 'isUserBlocked')
            break
          case 'wrongPassword':
            context.commit('setErrorSate', 'isWrongPassword')
            context.commit('setLoginAttempts', response.loginAttempts)
            break
          default:
            Vue.$toast.error('Lỗi không xác định')
            break
        }
      })
      .finally(() => {
        context.commit('setLoading', false)
      })
  },
  logout (context) {
    context.commit('setUserProfile', {})
    context.commit('setToken', null)
    AppService.removeToken()
    router.push('/login')
  },
  getProfile (context) {
    context.commit('setUserProfile', AppService.getProfile())
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
