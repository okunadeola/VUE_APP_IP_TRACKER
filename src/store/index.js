import { createStore } from "vuex";

const store = createStore({


  state() {
    return {
      token: ''
    }
  },


  mutations: {
    setAuthentication(state, payload) {
      state.token = payload.payload
    },
    removeToken(state) {
      state.token = ""
    },
  },


  actions: {
    setAuthentication(context, payload) {
      context.commit('setAuthentication', payload)
    },
    
    removeToken(context) {
      context.commit('removeToken')
    },

  },


  getters: {
    getToken(state) {
      return state.token
    }
  }
})


export default store