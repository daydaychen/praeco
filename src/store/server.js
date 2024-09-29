import axios from 'axios';
// TODO: error  Dependency cycle via @/lib/logger.js:2=>@/store:3  import/no-cycle
import networkError from '../lib/networkError.js';

export default {
  namespaced: true,
  state: {
    status: ''
  },
  mutations: {
    FETCHED_STATUS(state, payload) {
      state.status = payload.status;
    }
  },
  actions: {
    async fetchStatus({ commit }) {
      try {
        let res = await axios.get('/api/monitor/status');
        commit('FETCHED_STATUS', res.data.data);
      } catch (error) {
        networkError(error);
      }
    }
  }
};
