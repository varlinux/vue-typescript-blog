import {
  getArtypes
} from '../../../api/sys/artype'

const actions = {
  getArtypes({commit} ,data) {
    return new Promise((resolve) => {
      getArtypes(data).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  // namespaced: true,
  actions: actions
}
