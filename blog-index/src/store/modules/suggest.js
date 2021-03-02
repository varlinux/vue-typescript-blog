import {
  addSuggest
} from '../../api/suggest'

const actions = {
  addSuggest({commit}, data) {
    return new Promise((resolve, reject) => {
      addSuggest(data).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  // namespaced: true,
  actions: actions
}
