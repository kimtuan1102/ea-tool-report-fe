import AppService from '../../services/app.service'
import Vue from 'vue'
const state = () => ({
  reportData: [],
})
const mutations = {
  setReportData (state, data) {
    state.reportData = data
  },
  updateReport (state, report) {
    const idx = state.reportData.findIndex(o => o._id === report._id)
    Vue.set(state.reportData, idx, report)
  },
}
const actions = {
  getAllReportData (context) {
    AppService.getAllReport().then(res => {
      context.commit('setReportData', res.data)
    })
  },
  updateInitialBalance (context, { accountId, initialBalance }) {
    AppService.updateInitialBalance(accountId, initialBalance).then(res => {
      context.commit('updateReport', res.data)
    })
  },
  resetReportData (context) {
    AppService.resetReportData().then(res => {
      context.dispatch('getAllReportData')
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
