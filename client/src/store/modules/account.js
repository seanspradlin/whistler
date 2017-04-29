/* eslint-disable no-param-reassign */
import account from '../../api/account';

export default {
  state: {
    name: null,
    picture: null,
    _id: null,
  },
  getters: {},
  actions: {
    login({ commit }, token) {
      account.login(token)
        .then(response => commit('setAccount', response))
        .catch(() => commit('clearAccount'));
    },
    logout({ commit }) {
      account.logout()
        .then(() => commit('clearAccount'))
        .catch(() => commit('clearAccount'));
    },
  },
  mutations: {
    getAccount(state) {
      const stored = window.localStorage.getItem('session');
      if (stored) {
        const session = JSON.parse(stored);
        if (new Date(session.cookie.expires) > new Date()) {
          /* eslint-disable no-param-reassign */
          state.name = session.user.name;
          state.picture = session.user.picture;
          state._id = session.user._id;
        } else {
          state.name = null;
          state.picture = null;
          state._id = null;
        }
      }
    },

    setAccount(state, payload) {
      window.localStorage.setItem('session', JSON.stringify(payload));
      /* eslint-disable no-param-reassign */
      state.name = payload.user.name;
      state.picture = payload.user.picture;
      state._id = payload.user._id;
    },

    clearAccount(state) {
      state.name = null;
      state.picture = null;
      state._id = null;
      window.localStorage.removeItem('session');
    },
  },
};

