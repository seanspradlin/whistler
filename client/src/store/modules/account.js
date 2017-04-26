const state = {
  name: null,
  picture: null,
  _id: null,
};

const getters = {};

const actions = {};

const mutations = {
  getAccount(value) {
    const stored = window.localStorage.getItem('session');
    if (stored) {
      const session = JSON.parse(stored);
      if (new Date(session.cookie.expires) > new Date()) {
        /* eslint-disable no-param-reassign */
        value.name = session.user.name;
        value.picture = session.user.picture;
        value._id = session.user._id;
      } else {
        value.name = null;
        value.picture = null;
        value._id = null;
      }
    }
  },

  setAccount(value, payload) {
    window.localStorage.setItem('session', JSON.stringify(payload));
    /* eslint-disable no-param-reassign */
    value.name = payload.name;
    value.picture = payload.picture;
    value._id = payload._id;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

