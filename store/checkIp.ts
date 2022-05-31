import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const initState = {
  data: null,
  fetchState: INIT
}

export const state = () => initState

export const getters = {
  fetchState (s) {
    return s.fetchState
  },
  isValid (s) {
    return s.data === 0
  },
  errors (s) {
    switch (s.data) {
      case 0:
        return []
      case 1:
        return ['Address can not be empty']
      case 2:
        return ['Address already in use']
      case 3:
        return ['Address invalid']
      default:
        return []
    }
  }
}

export const mutations = {
  UPDATE_DATA (s, data) {
    s.data = data
  },
  CLEAR (s) {
    Object.assign(s, initState)
  },
  SET_STATE (s, fetchState) {
    s.fetchState = fetchState
  }
}

export const actions = {
  async checkIp ({ commit }, ip) {
    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/checkIp', {
        ip
      })

      if (response.code === 0) {
        commit('SET_STATE', FULFILLED)
        commit('UPDATE_DATA', response.data)
        return response.data
      } else {
        return false
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return false
    }
  }
}
