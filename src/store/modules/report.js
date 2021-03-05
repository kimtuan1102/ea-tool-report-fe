import AppService from '../../services/app.service'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import * as moment from 'moment'
const state = () => ({
  reportData: [],
  filterType: '',
  accountIdSearch: '',
  messageTelegram: 'Chào bạn',
//  Edit field
  accountId: '',
  initialBalance: '',
  telegram: '',
  deposit: '',
  withdraw: '',
  expireDate: new Date().toISOString().substr(0, 10),
  phone: '',
})
const mutations = {
  setReportData (state, data) {
    state.reportData = data
  },
  updateReport (state, report) {
    const idx = state.reportData.findIndex(o => o._id === report._id)
    Vue.set(state.reportData, idx, report)
  },
  setTelegramMessage (state, message) {
    state.messageTelegram = message
  },
  removeReport (state, report) {
    const idx = state.reportData.findIndex(o => o._id === report._id)
    Vue.delete(state.reportData, idx)
  },
  setFieldEdit (state, report) {
    if (typeof report === 'object') {
      for (const propName in report) {
        state[propName] = report[propName]
      }
    }
  },
  updateField,
}
const actions = {
  filterReports ({ commit, state, dispatch }) {
    const filterType = state.filterType
    const accountId = state.accountIdSearch
    dispatch('loading/openLoading', null, { root: true })
    AppService.filterReports({ filterType, accountId })
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
        const report = res.data
        report.expireDateFormat = moment(report.expireDate).format(
          'DD/MM/YYYY',
        )
      context.commit('updateReport', res.data)
      Vue.$toast.success('Update Success')
    })
      .catch(() => {
        Vue.$toast.error('Update Failed')
      })
      .finally(() => {
        context.dispatch('loading/closeLoading', null, { root: true })
        context.dispatch('dialog/closeDialogEditReport', null, { root: true })
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
  bindReportForm ({ commit }, report) {
    commit('setFieldEdit', report)
  },
  pushDynamicKeys ({ commit, state }, key) {
    let _msg = state.messageTelegram
    if (!_msg) _msg = ''
    _msg = _msg + `{${key}}`
    commit('setTelegramMessage', _msg)
  },
  async syncTelegramAccount ({ dispatch }) {
    dispatch('loading/openLoading', null, { root: true })
    const filterType = state.filterType
    const accountId = state.accountIdSearch
    try {
      await AppService.syncTelegramAccount()
      await AppService.filterReports({ filterType, accountId })
      Vue.$toast.success('Sync telegram account success')
    } catch (e) {
      Vue.$toast.error('Sync telegram account Failed')
    } finally {
      dispatch('loading/closeLoading', null, { root: true })
    }
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
