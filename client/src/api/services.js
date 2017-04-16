export default {
  getServices(filter) {
    return Promise.reject(new Error('not implemented'));
  },

  getServiceById(id) {
    return Promise.reject(new Error('not implemented'));
  },

  createService({ name, env, project }) {
    return Promise.reject(new Error('not implemented'));
  },

  updateService(id, { name, env, project }) {
    return Promise.reject(new Error('not implemented'));
  },

  deleteProject(id) {
    return Promise.reject(new Error('not implemented'));
  },
};

