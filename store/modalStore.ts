interface State {
  currentModal: String;
}

export const state = (): State => ({
  currentModal: ''
})

export const getters = {
  currentOpen (state: State) {
    return state.currentModal
  }
}

export const mutations = {
  changeCurrentModal (state: State, modalName: string) {
    state.currentModal = modalName
  },
  closeModal (state: State) {
    state.currentModal = ''
  }
}
