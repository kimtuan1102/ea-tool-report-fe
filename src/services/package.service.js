import $http from '../plugins/axios'
const PackageService = {
  async addPackage (_package) {
    return await $http.post('package/add-package', _package)
  },
  async getAllPackages () {
    return await $http.get('package/get-all-package')
  },
  async deletePackageById (packageId) {
    return await $http.delete(`package/delete-package-by-id/${packageId}`)
  },
  async updatePackage (updateData) {
    return await $http.patch(`package/updatePackage/${updateData.id}`, updateData)
  },
  async extendPackage (extendData) {
    return await $http.post('package/extendPackage', extendData)
  },
}
export default PackageService
