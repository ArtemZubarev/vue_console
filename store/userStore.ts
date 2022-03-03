import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const initState = {
  data: {},
  fetchState: INIT,
  isAuth: false
}

export const state = () => initState

export const getters = {
  isAuth () {
    return this.$cookie.get('auth')
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
  },
  SET_AUTH_STATUS (s, status) {
    s.isAuth = status
  }
}

export const actions = {
  async auth ({ commit, state }, token) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)

    try {
      const response = await this.$axios.$post('/auth/sso', {
        token
      })

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('SET_STATE', FULFILLED)
        return {
          auth: '1.testAuth1'
        }
      } else {
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  }
}
