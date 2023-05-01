<template>
  <div class="settings-container">
    <h1 class="mt-2 font-semibold text-3xl">Available Equipment</h1>
    <div>
      <button type="button" class="button" @click="selectAll">
        {{ selectAllText }}
      </button>
      <hr class="my-2" />
      <template v-for="eq in equipment">
        <div :key="eq.id">
          <input
            :id="eq.id"
            v-model="whitelist"
            type="checkbox"
            :value="eq.id"
            @change="updateState"
          />
          <label :for="eq.id"> {{ eq.name }}</label>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      whitelist: [
        "airbike",
        "barbell",
        "bench",
        "boxjump",
        "dumbbell",
        "kettlebell",
        "pool",
        "pullupbar",
        "rings",
        "rower",
        "skippingrope",
        "track",
        "wallball",
      ],
      equipment: [
        { id: "airbike", name: "Airbike" },
        { id: "barbell", name: "Barbell" },
        { id: "bench", name: "Barbell-Bench" },
        { id: "boxjump", name: "Boxjump" },
        { id: "dumbbell", name: "Dumbbell" },
        { id: "kettlebell", name: "Kettlebell" },
        { id: "pool", name: "Pool / Any option to swim" },
        { id: "pullupbar", name: "Pull-Up-Bar" },
        { id: "rings", name: "Rings" },
        { id: "rower", name: "Rowing Ergometer" },
        { id: "skippingrope", name: "Skipping rope" },
        { id: "track", name: "Track / Any option to run" },
        { id: "wallball", name: "Wallball" },
      ],
    };
  },
  computed: {
    selectAllText() {
      // @ts-ignore
      return this.whitelist.length < this.equipment.length
        ? "Select All"
        : "Deselect All";
    },
  },
  methods: {
    selectAll() {
      const wlength = this.whitelist.length;
      this.whitelist.splice(0, wlength);
      if (wlength < this.equipment.length) {
        for (let i = 0; i < this.equipment.length; i++) {
          const item = this.equipment[i];
          this.whitelist.push(item.id);
        }
      }
      this.updateState();
    },
    updateState() {
      const blacklist = this.equipment
        .map((a) => a.id)
        .filter((eq) => !this.whitelist.includes(eq));
      this.$store.commit("wod/SET_EQ_BLACKLIST", blacklist);
    },
  },
});
</script>
<style lang="scss"></style>
