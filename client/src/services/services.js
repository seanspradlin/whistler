export default {
  get({ name, environment, project }) {
    let uri = '/api/services?';
    if (name) {
      uri += `name=${name}&`;
    }

    if (environment) {
      uri += `environment=${environment}&`;
    }

    if (project) {
      uri += `project=${project}&`;
    }

    return fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  getById(id) {
    const uri = `/api/services/${id}`;
    return fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  create({ name, environment, project }) {
    return fetch('/api/services', {
      method: 'POST',
      body: JSON.stringify({ name, environment, project }),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(response => response.json());
  },

  update(id, { name, environment, project }) {
    return fetch(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, environment, project }),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(response => response.json());
  },

  delete(id) {
    return fetch(`/api/services/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
  },
};

