import { pathOr } from 'rambda'
import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'
import cleanObject from '@/utils/cleanObject'

const initState = {
  data: {
    token: '',
    address: '',
    name: ''
  },
  step: '1',
  fetchState: INIT
}

export const state = () => initState

export const getters = {
  node (s) {
    return s.data
  },
  fetchState (s) {
    return s.fetchState
  },
  step (s) {
    return pathOr('1', ['step'], s)
  },
  token (s) {
    return pathOr('', ['data', 'token'], s)
  },
  address (s) {
    return pathOr('', ['data', 'address'], s)
  },
  name (s) {
    return pathOr('', ['data', 'name'], s)
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
  },
  UPDATE_TOKEN (s, value) {
    s.data.token = value
  },
  UPDATE_ADDRESS (s, value) {
    s.data.address = value
  },
  UPDATE_NAME (s, value) {
    s.data.name = value
  },
  SET_STEP (s, value) {
    s.step = value
  }
}

export const actions = {
  async checkToken ({ commit, state }) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/checkToken')

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('SET_STATE', FULFILLED)
      } else {
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  },

  async createNode ({ commit, state }) {
    if (state.fetchState === INIT) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const payload = cleanObject(state.data)
      console.log(payload)
      const response = await this.$api.$post('/node/buy', { ...payload })

      if (response.code === 0) {
        commit('SET_STATE', FULFILLED)
        return response.data
      } else {
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  },

  async checkStatus ({ commit, state }, id) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/getStatus', { id })

      if (response.code === 0) {
        commit('SET_STATE', FULFILLED)
        return response.data
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
