import {
  FULFILLED, INIT, PENDING, REJECTED
} from '../utils/constants'

const inProgress = node => node.status !== '5' && node.status !== '6'

const initState = {
  data: {},
  fetchState: INIT,
  counter: 0,
  interval: null
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
  },
  UPDATE_COUNTER (s) {
    s.counter = s.counter + 1
  },
  UPDATE_NAME (s, value) {
    s.data.name = value
  }
}

export const actions = {
  async fetch ({ commit, state, dispatch }, id) {
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
        if (inProgress(response.data)) {
          this.interval = setInterval(() => {
            dispatch('silentFetch', id)
          }, 10000)
        }
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

  async silentFetch ({ commit, state }, id) {
    try {
      const response = await this.$api.$post('/node/one', {
        id
      })

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('UPDATE_COUNTER')

        if (!inProgress(response.data) || state.counter >= 180) {
          clearInterval(this.interval)
        }
      } else {
        return undefined
      }
    } catch (err) {
      console.error(err)
      return undefined
    }
  },

  async saveData ({ commit, state }, name) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/setData', {
        [name]: state.data[name],
        id: state.data.id
      })

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
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

  async deleteNode ({ commit, state }, id) {
    if (state.fetchState === PENDING) {
      return
    }

    commit('SET_STATE', PENDING)
    try {
      const response = await this.$api.$post('/node/delete', {
        id
      })

      if (response.code === 0) {
        commit('UPDATE_DATA', response.data)
        commit('SET_STATE', FULFILLED)
        return true
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

  async restartNode () {

  },

  async updateNode () {

  }
}
