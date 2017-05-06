import 'whatwg-fetch';

export default {
  getAccount() {
    return fetch('/api/account')
      .then(response => response.json());
  },

  login(token) {
    return fetch('/api/account/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(response => response.json());
  },

  logout() {
    return fetch('/api/account/logout', { method: 'POST' });
  },
};

