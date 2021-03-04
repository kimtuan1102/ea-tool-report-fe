import AppService from '../../services/app.service'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  reportData: [],
  filterType: '',
  messageTelegram: '',
})
const mutations = {
  setReportData (state, data) {
    state.reportData = data
  },
  updateReport (state, report) {
    const idx = state.reportData.findIndex(o => o._id === report._id)
    Vue.set(state.reportData, idx, report)
  },
  removeReport (state, report) {
    const idx = state.reportData.findIndex(o => o._id === report._id)
    Vue.delete(state.reportData, idx)
  },
  updateField,
}
const actions = {
  getAllReportData ({ commit, state, dispatch }) {
    const filterType = state.filterType
    dispatch('loading/openLoading', null, { root: true })
    AppService.getReports({ filterType }).then(res => {
      commit('setReportData', res.data)
      dispatch('loading/closeLoading', null, { root: true })
    })
  },
  updateReportFields (context, updateData) {
    context.dispatch('loading/openLoading', null, { root: true })
    AppService.updateReportFields(updateData).then(res => {
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
    const filterType = state.filterType
    AppService.reportExcels({ filterType })
  },
  sendMessageToTelegram ({ commit, state, dispatch }) {
    const filterType = state.filterType
    const messageTelegram = state.messageTelegram
    dispatch('loading/openLoading', null, { root: true })
    AppService.sendMessageToTelegram({ filterType }, { message: messageTelegram }).then(res => {
      dispatch('loading/closeLoading', null, { root: true })
      dispatch('dialog/closeDialogSendMessageTelegram', null, { root: true })
    })
  },
  deleteReportByAccountId (context, { accountId }) {
    context.dispatch('loading/openLoading', null, { root: true })
    AppService.deleteReportByAccountId(accountId).then(res => {
      context.commit('removeReport', res.data)
      context.dispatch('loading/closeLoading', null, { root: true })
    })
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
