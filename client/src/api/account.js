import 'whatwg-fetch';

export default {
  getAccount() {
    return Promise.reject(new Error('not implemented'));
  },

  login() {
    return Promise.reject(new Error('not implemented'));
  },

  logout() {
    return fetch('/api/account/logout', { method: 'POST' });
  },
};

