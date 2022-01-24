export const state = () => ({
  token: null,
  user: {},
  authStatus: false,
});

export const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.authStatus,
  user: (state) => state.user,
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    state.authStatus = true;
    localStorage.setItem("apollo-token", token);
  },
  SET_USER(state, user) {
    state.user = { ...user };
  },
};

export const actions = {
  setToken({ commit }, token) {
    commit("SET_TOKEN", token);
  },
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
};
