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
    getProjectById({ commit, state }, id) {
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
      state.projects[payload._id] = payload;
    },
    addProjects(state, payload) {
      payload.forEach((p) => {
        state.projects[p._id] = p;
      });
    },
    setProjectError(state, payload) {
      state.error = payload;
    },
  },
};

