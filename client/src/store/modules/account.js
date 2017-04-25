const state = {
  name: null,
  picture: null,
  googleId: null,
  _id: null,
};

const getters = {};

const actions = {};

const mutations = {
  getAccount(value) {
    const stored = window.localStorage.getItem('account');
    if (stored) {
      const account = JSON.parse(stored);
      /* eslint-disable no-param-reassign */
      value.name = account.name;
      value.picture = account.picture;
      value._id = account._id;
    }
  },

  setAccount(value, payload) {
    window.localStorage.setItem('account', JSON.stringify(payload));
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

