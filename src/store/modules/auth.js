import AppService from '../../services/app.service'
import jwtDecode from 'jwt-decode'
import router from '../../router'
const state = () => ({
  userProfile: {},
  token: AppService.getToken(),
})
const mutations = {
  setUserProfile (state, data) {
    state.userProfile = data
  },
  setToken (state, token) {
    state.token = token
  },
}
const actions = {
  login (context, { email, password }) {
    AppService.login(email, password).then(res => {
      const accessToken = res.data.accessToken
      context.commit('setUserProfile', jwtDecode(accessToken))
      context.commit('setToken', accessToken)
      AppService.setToken(accessToken)
      router.push('/')
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
