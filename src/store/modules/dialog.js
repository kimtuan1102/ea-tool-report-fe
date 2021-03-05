import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  showDialogSendMessageTelegram: false,
  showDialogEditReport: false,
})
const mutations = {
  setDialog (state, data) {
    if (typeof data === 'object') {
      for (const propName in data) {
        state[propName] = data[propName]
      }
    }
  },
  updateField,
}
const actions = {
  openDialogSendMessageTelegram ({ commit }) {
    commit('setDialog', { showDialogSendMessageTelegram: true })
  },
  closeDialogSendMessageTelegram ({ commit }) {
    commit('setDialog', { showDialogSendMessageTelegram: false })
  },
  openDialogEditReport ({ commit, dispatch }, report) {
    dispatch('report/bindReportForm', report, { root: true })
    commit('setDialog', { showDialogEditReport: true })
  },
  closeDialogEditReport ({ commit }) {
    commit('setDialog', { showDialogEditReport: false })
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
