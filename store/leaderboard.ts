export const state = () => ({
  leaderboard: {},
});

export const getters = {
  leaderboard: (state: { leaderboard: Object }) => state.leaderboard,
};

export const mutations = {
  SET_LEADERBOARD(state: { leaderboard: any }, leaderboard: any) {
    state.leaderboard = { ...leaderboard };
  },
};

export const actions = {
  setLeaderboard({ commit }: any, leaderboard: any) {
    leaderboard.items.sort((a: any, b: any) => a.score - b.score);
    commit("SET_LEADERBOARD", leaderboard);
  },
};
