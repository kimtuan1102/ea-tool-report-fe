import { getField, updateField } from 'vuex-map-fields'
const state = () => ({
  showDialogSendMessageTelegram: false,
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
