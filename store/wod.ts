import axios from "axios";
export const state = () => ({
  wod: {},
  blacklistedEquipment: [],
});

export const mutations = {
  SET_WOD(state, wod) {
    state.wod = wod;
  },
  SET_EQ_BLACKLIST(state, items) {
    state.blacklistedEquipment = items;
  },
};

export const actions = {
  getWod({ commit, state }) {
    axios
      .get("/wods.json")
      .then((response) => {
        // Get random wod based on blacklist

        const validWods = response.data.filter(function (item) {
          if (!item.equipment) return true;

          return !state.blacklistedEquipment.some((r) =>
            item.equipment.includes(r)
          );
        });
        const wod = validWods[Math.floor(Math.random() * validWods.length)];
        commit("SET_WOD", wod);
      })
      .catch(function (err) {
        return err;
      });
  },
};
