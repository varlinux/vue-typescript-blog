import {
  getIndexMenu
} from '../../../api/sys/menu'
import {
  setSession,
  getSession
} from "../../../controller/sessionStorage"

const actions = {
  getIndexMenu() {
    return new Promise((resolve) => {
      const ml = getSession('menuList')
      if (ml) {
        resolve(JSON.parse(ml))
      } else {
        getIndexMenu().then(res => {
          if (res) {
            const {_code, _data} = res
            if (_code === 200) {
              setSession('menuList', JSON.stringify(res))
              resolve(res)
            }
          }
        })
      }
    })
  }
}

export default {
  // namespaced: true,
  actions: actions
}
