export const state = () => ({
  token: null,
  user: {},
  authStatus: false,
});

export const getters = {
  token: (state: { token: string }) => state.token,
  authStatus: (state: { authStatus: Boolean }) => state.authStatus,
  user: (state: { user: Object }) => state.user,
};

export const mutations = {
  SET_TOKEN(state: { token: string; authStatus: boolean }, token: string) {
    state.token = token;
    state.authStatus = token !== "";
  },
  SET_USER(state: { user: any }, user: any) {
    state.user = { ...user };
  },
  UPDATE_USER(state: { user: any }, userData: any) {
    console.log("userData", userData);
    state.user = { ...state.user, ...userData };
  },
  RESET_DATA(state: { token: string; authStatus: boolean; user: any }) {
    state.token = "";
    state.authStatus = false;
    state.user = {};
  },
};

export const actions = {
  setToken({ commit }: any, token: string) {
    commit("SET_TOKEN", token);
  },
  setUser({ commit }: any, user: any) {
    commit("SET_USER", user);
  },
  updateUser({ commit }: any, userData: any) {
    console.log("userData", userData);
    commit("UPDATE_USER", userData);
  },
  resetData({ commit }: any) {
    commit("RESET_DATA");
  },
};
