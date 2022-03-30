import { any } from 'rambda'
import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const hasInProgress = list =>
  any((item: any) => item.status !== 5 && item.status !== 6 && item.status !== 7)(list)

const initState = {
  data: [],
  fetchState: INIT,
  interval: null,
  counter: 0
}

export const state = () => initState

export const getters = {
  nodesList (s) {
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
    clearInterval(this.interval)
    Object.assign(s, initState)
  },
  CLEAR_INTERVAL () {
    clearInterval(this.interval)
  },
  SET_STATE (s, fetchState) {
    s.fetchState = fetchState
  },
  UPDATE_COUNTER (s) {
    s.counter = s.counter + 1
  }
}

export const actions = {
  async fetch ({ commit, state, dispatch }) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/all')

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('SET_STATE', FULFILLED)

        if (hasInProgress(response.data)) {
          this.interval = setInterval(() => {
            dispatch('silentFetch')
          }, 10000)
        }
      } else {
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  },

  async silentFetch ({ commit, state }) {
    try {
      const response = await this.$api.$post('/node/all')

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('UPDATE_COUNTER')

        if (!hasInProgress(response.data) || state.counter >= 80) {
          clearInterval(this.interval)
        }
        commit('UPDATE_DATA', response.data)
      } else {
        return undefined
      }
    } catch (err) {
      console.error(err)
      return undefined
    }
  }
}
