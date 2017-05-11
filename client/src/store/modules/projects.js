/* eslint-disable no-param-reassign */
import projects from '../../api/projects';

export default {
  state: {
    projects: {},
    currentProjectId: null,
    error: null,
  },
  getters: {
    currentProject(state) {
      return state.projects[state.currentProjectId];
    },
  },
  actions: {
    getProjects({ commit }, { name }) {
      projects.get({ name })
        .then(results => commit('addProjects', results));
    },
    getProjectById({ commit }, id) {
      projects.getById(id)
        .then(result => commit('addProject', result));
    },
    createProject({ commit }, { name }) {
      if (!name) {
        commit('setProjectError', 'Project name is required');
      } else {
        projects.create({ name })
          .then(result => commit('addProject', result));
      }
    },
  },
  mutations: {
    addProject(state, payload) {
      const container = { ...state.projects };
      container[payload._id] = payload;
      state.projects = container;
    },
    addProjects(state, payload) {
      const container = { ...state.projects };
      payload.forEach((p) => {
        container[p._id] = p;
      });
      state.projects = container;
    },
    setProjectError(state, payload) {
      state.error = payload;
    },
  },
};

