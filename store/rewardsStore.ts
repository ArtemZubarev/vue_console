import { isEmpty, pathEq } from 'rambda'
import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const initState = {
  data: {},
  fetchState: INIT
}

const rewardFetched = address => pathEq([address, 'status'], 'fetched')

export const state = () => initState

export const getters = {
  fetchState (s) {
    return s.fetchState
  },
  isValid (s) {
    return s.data === 0
  },
  rewards (s) {
    return s.data
  }

}

export const mutations = {
  UPDATE_DATA (s, data) {
    s.data = { ...s.data, ...data }
  },
  CLEAR (s) {
    Object.assign(s, initState)
  },
  SET_STATE (s, fetchState) {
    s.fetchState = fetchState
  }
}

export const actions = {
  async fetch ({ state, commit }, address) {
    if (rewardFetched(address)(state.data)) {
      return
    }
    commit('SET_STATE', PENDING)
    try {
      const response = await this.$apiExplorer.$get(`/address/${address}/rewards`)
      if (!isEmpty(response.data)) {
        commit('SET_STATE', FULFILLED)
        commit('UPDATE_DATA', {
          [address]: {
            status: 'fetched',
            data: response.data
          }
        })
      } else {
        commit('SET_STATE', FULFILLED)
        commit('UPDATE_DATA', {
          [address]: {
            status: 'failed',
            data: {}
          }
        })
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return false
    }
  }
}
