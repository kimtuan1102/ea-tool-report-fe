import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  showDialogSendMessageTelegram: false,
  showDialogEditReport: false,
  showDialogAddPackage: false,
  showDialogEditPackage: false,
  showDialogExtendPackage: false,
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
  openDialogAddPackage ({ commit }) {
    commit('setDialog', { showDialogAddPackage: true })
  },
  closeDialogAddPackage ({ commit }) {
    commit('setDialog', { showDialogAddPackage: false })
  },
  openDialogEditPackage ({ commit, dispatch }, _package) {
    dispatch('package/bindEditPackageForm', _package, { root: true })
    commit('setDialog', { showDialogEditPackage: true })
  },
  closeDialogEditPackage ({ commit }) {
    commit('setDialog', { showDialogEditPackage: false })
  },
  openDialogExtendPackage ({ commit, dispatch }, data) {
    dispatch('package/bindExtendPackageForm', data, { root: true })
    commit('setDialog', { showDialogExtendPackage: true })
  },
  closeDialogExtendPackage ({ commit }) {
    commit('setDialog', { showDialogExtendPackage: false })
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
