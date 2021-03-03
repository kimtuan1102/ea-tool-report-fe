import AppService from '../../services/app.service'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  reportData: [],
  accountIdSearch: '',
  zaloSearch: '',
})
const mutations = {
  setReportData (state, data) {
    state.reportData = data
  },
  updateReport (state, report) {
    const idx = state.reportData.findIndex(o => o._id === report._id)
    Vue.set(state.reportData, idx, report)
  },
  updateField,
}
const actions = {
  getAllReportData ({ commit, state, dispatch }) {
    const accountId = state.accountIdSearch
    const zalo = state.zaloSearch
    dispatch('loading/openLoading', null, { root: true })
    AppService.getReports({ accountId, zalo }).then(res => {
      commit('setReportData', res.data)
      dispatch('loading/closeLoading', null, { root: true })
    })
  },
  updateReportFields (context, { accountId, initialBalance, zalo, deposit, withdraw, expireDate }) {
    context.dispatch('loading/openLoading', null, { root: true })
    AppService.updateReportFields(accountId, initialBalance, zalo, deposit, withdraw, expireDate).then(res => {
      context.commit('updateReport', res.data)
      context.dispatch('loading/closeLoading', null, { root: true })
    })
  },
  resetReportData (context) {
    context.dispatch('loading/openLoading', null, { root: true })
    AppService.resetReportData().then(res => {
      context.dispatch('getAllReportData')
      context.dispatch('loading/closeLoading', null, { root: true })
    })
  },
  reportExcels ({ commit, state }) {
    const accountId = state.accountIdSearch
    const zalo = state.zaloSearch
    AppService.reportExcels({ accountId, zalo })
  },
}
const getters = {
  getField,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
