const UtilsService = {
  buildQuery (queryObj) {
    if (typeof queryObj !== 'object') {
      return ''
    } else {
      for (const propName in queryObj) {
        if (queryObj[propName] === null || queryObj[propName] === undefined || queryObj[propName] === '') {
          delete queryObj[propName]
        }
      }
    }
    return new URLSearchParams(queryObj).toString()
  },
}
export default UtilsService
