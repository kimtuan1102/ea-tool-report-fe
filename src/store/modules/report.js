import AppService from '../../services/app.service'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  reportData: [],
  filterType: 'All',
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
    AppService.getReports({ filterType })
      .then(res => {
      commit('setReportData', res.data)
    }).catch(() => {
      Vue.$toast.error('Get data failed')
    })
      .finally(() => {
        dispatch('loading/closeLoading', null, { root: true })
      })
  },
  updateReportFields (context, updateData) {
    context.dispatch('loading/openLoading', null, { root: true })
    AppService.updateReportFields(updateData)
      .then(res => {
      context.commit('updateReport', res.data)
      Vue.$toast.success('Update Success')
    })
      .catch(() => {
        Vue.$toast.error('Update Failed')
      })
      .finally(() => {
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
    AppService.sendMessageToTelegram({ filterType }, { message: messageTelegram })
      .then(res => {
      dispatch('dialog/closeDialogSendMessageTelegram', null, { root: true })
        Vue.$toast.success('Send message to telegram success')
    }).catch(() => {
      Vue.$toast.error('Send message to telegram failed')
    }).finally(() => {
      dispatch('loading/closeLoading', null, { root: true })
    })
  },
  deleteReportByAccountId (context, { accountId }) {
    Vue.$confirm(
        {
          message: 'Are you sure delete item?',
          button: {
            no: 'Cancel',
            yes: 'OK',
          },
          callback: confirm => {
            if (confirm) {
              context.dispatch('loading/openLoading', null, { root: true })
              AppService.deleteReportByAccountId(accountId).then(res => {
                context.commit('removeReport', res.data)
                Vue.$toast.success('Delete item success')
              }).catch((e) => {
                Vue.$toast.error('Delete item failed')
              }).finally(() => {
                context.dispatch('loading/closeLoading', null, { root: true })
              })
            }
          },
        },
      )
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
