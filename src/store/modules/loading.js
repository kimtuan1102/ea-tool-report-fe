const state = () => ({
    showLoading: false,
})
const mutations = {
    setLoading (state, payload) {
        state.showLoading = payload
    },
}
const actions = {
    openLoading (context) {
        context.commit('setLoading', true)
    },
    closeLoading (context) {
        context.commit('setLoading', false)
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
