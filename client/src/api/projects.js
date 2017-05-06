export default {
  get({ name }) {
    let uri = '/api/projects?';
    if (name) {
      uri += `email=${name}`;
    }
    return fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  getById(id) {
    const uri = `/api/projects/${id}`;
    return fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  create({ name }) {
    return fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(response => response.json());
  },

  update(id, { name }) {
    return fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(response => response.json());
  },

  delete(id) {
    return fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
  },
};

