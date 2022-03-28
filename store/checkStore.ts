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
    return s.data
  },
  errors (s) {
    return s.data === false ? ['Address invalid'] : []
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
  async checkAddress ({ commit, state }, address) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/validAddress', {
        address
      })

      if (response.code === 0) {
        commit('SET_STATE', FULFILLED)
        commit('UPDATE_DATA', FULFILLED)
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
