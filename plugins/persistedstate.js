import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  if (process.browser) {
    createPersistedState({})(store);
  }
};
