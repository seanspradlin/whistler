export default {
  getAccount() {
    return fetch('/api/account')
      .then(response => response.json());
  },

  login({ email, password }) {
    return fetch('/api/account/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then((body) => {
        if (body.error) {
          return Promise.reject(new Error(body.error));
        }
        return Promise.resolve(body);
      });
  },

  logout() {
    return fetch('/api/account/logout', { method: 'POST' });
  },
};

