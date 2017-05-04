/* eslint-disable no-param-reassign */
import projects from '../../api/projects';

export default {
  state: {
    projects: null,
    currentProject: null,
  },
  getters: {},
  actions: {
    getProjects({ commit }, { name }) {
      projects.get({ name })
        .then(results => commit('setProjects', results));
    },
    getProjectById({ commit, state }, id) {
      const project = state.projects.find(p => p._id === id);
      if (project) {
        commit('setProject', project);
      } else {
        projects.getById(id)
          .then(result => commit('setProject', result));
      }
    },
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setProject(state, payload) {
      state.currentProject = payload;
    },
  },
};

