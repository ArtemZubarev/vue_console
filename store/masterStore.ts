import { pathOr, find, propEq } from 'rambda'
import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const initState = {
  data: {
    token: '',
    address: '',
    contracts: []
  },
  userChoice: {
    token: '',
    address: '',
    name: '',
    contract: null,
    provider: 'DO', // DO || other
    ip: '',
    script: false
  },
  step: '1',
  fetchState: INIT,
  errors: []
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
    return pathOr('', ['userChoice', 'token'], s)
  },
  address (s) {
    return pathOr('', ['userChoice', 'address'], s)
  },
  name (s) {
    return pathOr('', ['userChoice', 'name'], s)
  },
  contract (s) {
    return pathOr('', ['userChoice', 'contract'], s)
  },
  contracts (s) {
    return pathOr('', ['data', 'contracts'], s)
  },
  provider (s) {
    return pathOr('', ['userChoice', 'provider'], s)
  },
  ip (s) {
    return pathOr('', ['userChoice', 'ip'], s)
  }
}

export const mutations = {
  UPDATE_DATA (s, data) {
    s.data = { ...data }
    const contract: any = find(propEq('used', false))(data.contracts)
    if (contract) {
      s.userChoice.contract = contract.id
    }
  },
  CLEAR (s) {
    Object.assign(s, initState)
  },
  CLEAR_WITHOUT_STEP_CHANGING (s) {
    const state = { ...initState, step: s.step }
    Object.assign(s, state)
  },
  SET_STATE (s, fetchState) {
    s.fetchState = fetchState
  },
  UPDATE_TOKEN (s, value) {
    s.userChoice.token = value
  },
  UPDATE_ADDRESS (s, value) {
    s.userChoice.address = value
  },
  UPDATE_NAME (s, value) {
    s.userChoice.name = value
  },
  UPDATE_CONTRACT (s, value) {
    s.userChoice.contract = value
  },
  SET_STEP (s, value) {
    s.step = value
  },
  UPDATE_PROVIDER (s, value) {
    s.userChoice.provider = value
  },
  UPDATE_IP (s, value) {
    s.userChoice.ip = value
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
        commit('SET_STATE', REJECTED)
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  },

  async createNode ({ commit, state }) {
    if (state.fetchState === INIT || state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const payload = { ...state.userChoice }

      const response = await this.$api.$post('/node/buy', { ...payload })

      if (response.code === 0) {
        commit('SET_STATE', FULFILLED)
        return response.data
      } else {
        commit('SET_STATE', REJECTED)
        return undefined
      }
    } catch (err) {
      commit('SET_STATE', REJECTED)
      console.error(err)
      return undefined
    }
  },

  async createNodeCustom ({ commit, state }) {
    if (state.fetchState === INIT) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const payload = { ...state.userChoice }

      const response = await this.$api.$post('/node/customBuy', { ...payload })

      if (response.code === 0) {
        commit('SET_STATE', FULFILLED)
        return response.data
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
