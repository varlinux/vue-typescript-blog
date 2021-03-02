import { login, logout, getInfo } from '../../api/user'
import { setSession, getSession, removeSession } from '../../controller/sessionStorage'
import SecretUtils from "../../utils/SecretUtils";

const state = {
  userInfo: {}
}

const mutations = {
  SET_USER: (state, user) => {
    state.userInfo = user
  }
}

const actions = {
  // user login
  login({ commit }, user) {
    const { username, password } = user
    const enData = SecretUtils.encrypt(username + process.env.VUE_APP_LOGIN_SECRET_KEY + password)
    return new Promise((resolve, reject) => {
      login({ data : enData }).then(res => {
        if (res._code === 200) {
          const { _data, _token } = res
          commit('SET_USER', _data[0])
          setSession(process.env.VUE_APP_TOKEN_KEY, _token)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

// todo 注意namespaced的使用
export default {
  // namespaced: true,
  state,
  mutations,
  actions
}
