import AppService from '../../services/app.service'

const state = () => ({
  reportData: [],
})
const mutations = {
  setReportData (state, data) {
    state.reportData = data
  },
}
const actions = {
  getAllReportData (context) {
    AppService.getAllReport().then(res => {
      context.commit('setReportData', res.data)
    })
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
