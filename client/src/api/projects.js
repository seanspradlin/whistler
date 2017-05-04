export default {
  getProjects({ name }) {
    let uri = '/api/projects?';
    if (name) {
      uri += `email=${name}`;
    }
    return fetch(uri)
      .then(response => response.json());
  },

  getProjectById(id) {
    const uri = `/api/projects/${id}`;
    return fetch(uri)
      .then(response => response.json());
  },

  createProject({ name }) {
    return fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json());
  },

  updateProject(id, { name }) {
    return fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json());
  },

  deleteProject(id) {
    return fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

