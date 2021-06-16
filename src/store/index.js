import Vuex from 'vuex'
import Vue from 'vue'
import { debounce, isEqual } from "lodash";

Vue.use(Vuex)



export default new Vuex.Store({
  state: () => {
    return {
      websocket: null,
      websocket_host: 'ws://localhost:3000',
      followed: {
        message: 'sup',
        num_clicks: 0,
      }
    }
  },
  mutations: {
    SET_UP_WEBSOCKET (state) {
      state.websocket = new WebSocket('ws://localhost:3000')
    },
    SET_UP_WEBSOCKET_ONMESSAGE (state, callback) {
      state.websocket.onmessage = callback
    },
    SET_UP_WEBSOCKET_ONOPEN (state, callback) {
      state.websocket.onopen = callback
    },
    // ONMESSAGE (state, message) {
    //   state.followed.message = message
    // },
    UPDATE_STATE_FROM_WEBSOCKET (state, new_followed_state) {
      // console.log("We did it! We're getting the state from someone else!")
      state.followed = new_followed_state
    },
    UPDATE_FOLLOWED (state, new_followed_state) {
      state.followed = { ...state.followed, ...new_followed_state }
    }
  },
  actions: {
    creation ({ commit, dispatch, state }, payload) {
      // this.subscribe((mutation) => {
      //   if (mutation.type === 'ONMESSAGE') {
      //     console.log(mutation.payload)
      //     console.log('subscription')
      //   }
      // })
      commit('SET_UP_WEBSOCKET')
      commit('SET_UP_WEBSOCKET_ONMESSAGE', (data) => dispatch('onmessage', data))
      commit('SET_UP_WEBSOCKET_ONOPEN', () => dispatch('onopen'))
    },
    // send_message ({ state }, message) {
    //   state.websocket.send(message)
    // },
    send_followed_state ({ state }) {
      state.websocket.send(JSON.stringify(state.followed))
    },
    onmessage ({ state, commit }, data) {
      // if (JSON.stringify(state.followed) !== data.data) {
      let new_data = JSON.parse(data.data)
      if (!isEqual(new_data, state.followed)) {
        commit('UPDATE_STATE_FROM_WEBSOCKET', new_data)
      }
    },
    onopen ({ state, commit }) {
      // anything on open?
    },
    update_followed ({dispatch, commit}, new_followed) {
      commit('UPDATE_FOLLOWED', new_followed)
      dispatch('debounce_send_followed_state')
    },
    debounce_send_followed_state: debounce(({ dispatch }) => {
      dispatch("send_followed_state")
    }, 300),
  },
  modules: {
  },
})
