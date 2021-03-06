import { login, logout } from '@/api/login'
import { getToken, setUser, getUser, removeUser } from '@/utils/auth'
// import { resolve } from 'path'
// import { error } from 'util'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        login(email, userInfo.password).then(response => {
          const data = response.result
          setUser(data)
          // commit('SET_TOKEN', data.token)
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.nickname)
          commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const data = JSON.parse(getUser())
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.nickname)
        commit('SET_AVATAR', data.avatar)
        resolve()
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          // commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeUser()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeUser()
        resolve()
      })
    }
  }
}

export default user
