import AppService from '../../services/app.service'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  reportData: [],
  accountIdSearch: '',
  telegramSearch: '',
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
  getAllReportData ({ commit, state }) {
    const accountId = state.accountIdSearch
    const telegram = state.telegramSearch
    AppService.getReports({ accountId, telegram }).then(res => {
      commit('setReportData', res.data)
    })
  },
  updateReportFields (context, { accountId, initialBalance, telegram, deposit, withdraw }) {
    AppService.updateReportFields(accountId, initialBalance, telegram, deposit, withdraw).then(res => {
      context.commit('updateReport', res.data)
    })
  },
  resetReportData (context) {
    AppService.resetReportData().then(res => {
      context.dispatch('getAllReportData')
    })
  },
  reportExcels ({ commit, state }) {
    const accountId = state.accountIdSearch
    const telegram = state.telegramSearch
    AppService.reportExcels({ accountId, telegram })
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
