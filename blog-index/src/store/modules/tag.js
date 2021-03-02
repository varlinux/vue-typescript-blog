import {
  getAll
} from '../../api/tag'
import {
  setSession,
  getSession
} from "../../controller/sessionStorage"

const tagType = ['default', 'success', 'info', 'warning', 'danger']

const actions = {
  getAllTag() {
    return new Promise((resolve) => {
      const tags = getSession('tags')

      if (tags && typeof tags === 'object') {
        resolve(JSON.parse(tags))
      } else {
        getAll().then(res => {
          if (res && res._data) {
            res._data.forEach(item => {
              item.tag_color = tagType[Math.floor(Math.random() * 4)]
            })
            setSession('tags', res)
          }
          resolve(res)
        })
      }
    })
  }
}

export default {
  // namespaced: true,
  actions: actions
}
