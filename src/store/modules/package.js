import { getField, updateField } from 'vuex-map-fields'
import PackageService from '../../services/package.service'
import Vue from 'vue'
import * as _ from 'lodash'

function buildPackageData (state) {
  return {
    id: state.id,
    name: state.name,
    monthNumber: state.monthNumber,
    price: state.price,
    minBalance: state.minBalance,
    maxBalance: state.maxBalance,
  }
}
const state = () => ({
  id: '',
  packages: [],
  name: '',
  monthNumber: '',
  price: '',
  minBalance: '',
  maxBalance: '',
  extendPackage: {
    accountId: '',
    month: '',
  },
})
const mutations = {
  setPackages (state, packages) {
    state.packages = _.map(packages, v => _.assign({}, v, { icon: 'mdi-package', title: v.name, value: v.price.toString() + ' $', color: 'primary' }))
  },
  pushPackage (state, _package) {
    state.packages.push(_.assign({}, _package, { icon: 'mdi-package', title: _package.name, value: _package.price.toString() + ' $', color: 'primary' }))
  },
  deletePackage (state, _package) {
    const idx = state.packages.findIndex(o => o._id === _package._id)
    Vue.delete(state.packages, idx)
  },
  updatePackage (state, _package) {
    const idx = state.packages.findIndex(o => o._id === _package._id)
    Vue.set(state.packages, idx, _.assign({}, _package, { icon: 'mdi-package', title: _package.name, value: _package.price.toString() + ' $', color: 'primary' }))
  },
  clearVariable (state) {
    state.name = ''
    state.monthNumber = ''
    state.price = ''
    state.minBalance = ''
    state.maxBalance = ''
  },
  setFieldEdit (state, _package) {
    if (typeof _package === 'object') {
      for (const propName in _package) {
        if (propName === '_id') {
          state.id = _package[propName]
        }
        state[propName] = _package[propName]
      }
    }
  },
  setExtendPackage (state, data) {
    Vue.set(state.extendPackage, 'accountId', data.accountId)
  },
  updateField,
}
const actions = {
  addPackage ({ commit, state, dispatch }) {
    dispatch('loading/openLoading', null, { root: true })
    PackageService.addPackage(buildPackageData(state))
      .then(res => {
        commit('pushPackage', res.data)
        commit('clearVariable')
        Vue.$toast.success('Thêm gói thành công')
      })
      .catch(() => {
        Vue.$toast.error('Thêm gói thất bại')
      })
      .finally(() => {
        dispatch('loading/closeLoading', null, { root: true })
        dispatch('dialog/closeDialogAddPackage', null, { root: true })
      })
  },
  getAllPackages ({ commit, state, dispatch }) {
    dispatch('loading/openLoading', null, { root: true })
    PackageService.getAllPackages()
      .then((res) => {
        commit('setPackages', res.data)
      })
      .catch(() => {
        Vue.$toast.error('Không thể lấy được dữ liệu gói')
      })
      .finally(() => {
        dispatch('loading/closeLoading', null, { root: true })
      })
  },
  deletePackageById ({ commit, state, dispatch }, { packageId }) {
    Vue.$confirm(
      {
        message: 'Bạn có chắc chắn muốn xóa gói?',
        button: {
          no: 'Hủy',
          yes: 'Đồng ý',
        },
        callback: confirm => {
          if (confirm) {
            dispatch('loading/openLoading', null, { root: true })
            PackageService.deletePackageById(packageId).then(res => {
              commit('deletePackage', res.data)
              Vue.$toast.success('Xóa gói thành công')
            }).catch((e) => {
              Vue.$toast.error('Xóa gói thất bại')
            }).finally(() => {
              dispatch('loading/closeLoading', null, { root: true })
            })
          }
        },
      },
    )
  },
  updatePackage (context, updateData) {
    context.dispatch('loading/openLoading', null, { root: true })
    PackageService.updatePackage(updateData)
      .then(res => {
        context.commit('updatePackage', res.data)
        Vue.$toast.success('Cập nhật gói thành công')
      })
      .catch(() => {
        Vue.$toast.error('Cập nhật gói thất bại')
      })
      .finally(() => {
        context.dispatch('loading/closeLoading', null, { root: true })
        context.dispatch('dialog/closeDialogEditPackage', null, { root: true })
      })
  },
  extendPackage (context) {
    context.dispatch('loading/openLoading', null, { root: true })
    PackageService.extendPackage(context.state.extendPackage)
      .then(res => {
        Vue.$toast.success('Gia hạn thành công')
      })
      .catch(() => {
        Vue.$toast.error('Gia hạn thất bại')
      })
      .finally(() => {
        context.dispatch('loading/closeLoading', null, { root: true })
        context.dispatch('dialog/closeDialogExtendPackage', null, { root: true })
      })
  },
  bindEditPackageForm ({ commit }, _package) {
    commit('setFieldEdit', _package)
  },
  bindExtendPackageForm ({ commit }, data) {
    commit('setExtendPackage', data)
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
