import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const initState = {
  data: {},
  fetchState: INIT
}

export const state = () => initState

export const getters = {
  node (s) {
    return s.data
  },
  fetchState (s) {
    return s.fetchState
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
  async fetch ({ commit, state }, id) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/one', {
        id
      })

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('SET_STATE', FULFILLED)
      } else {
        commit('SET_STATE', REJECTED)
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  }
}
