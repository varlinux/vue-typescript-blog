import {
  getIndexTask
} from '../../../api/sys/task'
import {json2parameter} from "../../../utils/UrlUtils";

const actions = {
  getIndexTask({commit}, data) {
    return new Promise((resolve) => {
      return getIndexTask(json2parameter(data)).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  // namespaced: true,
  actions: actions
}
