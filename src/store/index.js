import { debounce, isEqual } from "lodash"
import { v4 as uuidv4 } from 'uuid'
import Env from "../environment/env.json"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => {
    return {
      env: Env,
      websocket: null,
      uuid: uuidv4(),
      followed: {
        message: 'sup',
        num_clicks: 0,
        cards: [
          { id: 12, img_src: 'https://www.ibrahima-ndaw.com/static/7edf5aa0b6be704f1c421111fc8a0523/31987/cover-3.png', title: 'good card', desc: 'This is a good card' },
          { id: 13, img_src: '', title: 'good card', desc: 'This is a good card' },
          { id: 14, img_src: 'https://www.ibrahima-ndaw.com/static/7edf5aa0b6be704f1c421111fc8a0523/31987/cover-3.png', title: '', desc: 'This is a good card' },
          { id: 15, img_src: 'https://www.ibrahima-ndaw.com/static/7edf5aa0b6be704f1c421111fc8a0523/31987/cover-3.png', title: 'good card', desc: '' },
        ]
      }
    }
  },
  mutations: {
    SET_UP_WEBSOCKET (state) {
      state.websocket = new WebSocket(state.env.WEBSOCKET_HOST)
    },
    SET_UP_WEBSOCKET_ONMESSAGE (state, callback) {
      state.websocket.onmessage = callback
    },
    SET_UP_WEBSOCKET_ONOPEN (state, callback) {
      state.websocket.onopen = callback
    },
    UPDATE_STATE_FROM_WEBSOCKET (state, new_followed_state) {
      if (!isEqual(new_followed_state, state.followed)) {
        state.followed = new_followed_state
      }
    },
    UPDATE_FOLLOWED (state, new_followed_state) {
      state.followed = { ...state.followed, ...new_followed_state }
    },
  },
  actions: {
    creation ({ commit, dispatch, state }, payload) {
      commit('SET_UP_WEBSOCKET')
      commit('SET_UP_WEBSOCKET_ONMESSAGE', (data) => dispatch('onmessage', data))
      commit('SET_UP_WEBSOCKET_ONOPEN', () => dispatch('onopen'))
    },
    send_followed_state ({ state }) {
      state.websocket.send(JSON.stringify({ payload: state.followed, action: 'ws_receive_followed_state' }))
    },
    onmessage ({ dispatch }, data) {
      // if (JSON.stringify(state.followed) !== data.data) {
      let new_data = JSON.parse(data.data)
      if (!new_data.action.startsWith('ws_')) throw Error('No good!')
      dispatch(new_data.action, new_data.payload)
    },
    ws_receive_followed_state ({ state, commit }, new_state) {
      commit('UPDATE_STATE_FROM_WEBSOCKET', new_state)
    },
    ws_request ({ state, dispatch }, uuid) {
      if (uuid !== state.uuid) {
        dispatch('debounce_send_followed_state')
      }
    },
    onopen ({ state, commit }) {
      // When we first open the websocket, we need to see if anyone
      // else has state already to show us.
      state.websocket.send(JSON.stringify({ action: 'ws_request', payload: state.uuid }))
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
