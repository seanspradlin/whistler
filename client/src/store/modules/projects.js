/* eslint-disable no-param-reassign */
import projects from '../../api/projects';
import services from '../../api/services';

export default {
  state: {
    projects: {},
    services: [],
  },
  getters: {
    currentProject(state) {
      return state.projects[state.currentProjectId];
    },
  },
  actions: {
    getServices({ commit }, { name, environment, project }) {
      services.get({ name, environment, project })
        .then(results => commit('addServices', results));
    },
    getProjects({ commit }, { name }) {
      projects.get({ name })
        .then(results => commit('addProjects', results));
    },
    getProjectById({ commit }, id) {
      projects.getById(id)
        .then(result => commit('addProject', result));
    },
    createProject({ commit }, { name }) {
      projects.create({ name })
        .then(result => commit('addProject', result));
    },
  },
  mutations: {
    addServices(state, payload) {
      state.services = state.services.concat(payload);
    },
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
  },
};

