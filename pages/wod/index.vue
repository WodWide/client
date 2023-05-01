<template>
  <div class="h-full">
    <SideNavbar />
    <div class="flex items-center justify-center h-full">
      <div
        class="bg-white shadow-2xl rounded-lg md:w-1/2 flex flex-col md:flex-row justify-around p-8"
      >
        <WodFilters class="mr-2" />
        <div class="flex flex-col justify-between items-center">
          <Wod />
          <BaseButton class="w-48 mt-4" @click.native="generateWod"
            >Generate WOD</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Wod from "~/components/wod/Wod.vue";
import WodFilters from "~/components/wod/WodFilters.vue";
import SideNavbar from "~/components/common/SideNavbar.vue";
import BaseButton from "~/components/common/BaseButton.vue";
export default Vue.extend({
  components: { Wod, WodFilters, SideNavbar, BaseButton },
  data() {
    return {
      showWod: false,
    };
  },
  head() {
    return {
      title: "Wod Generator",
      meta: [
        {
          hid: "wod-generator",
          name: "wod generator",
          content:
            "This is the wod generator page when you can get a random hero workout",
        },
      ],
    };
  },
  methods: {
    generateWod() {
      !this.showWod && (this.showWod = true);
      this.$store.dispatch("wod/getWod");
    },
  },
});
</script>
<style lang="scss">
.wod-container div:first-child {
  position: relative;
}

.abs-tr {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -15px;
  z-index: 99;
}
</style>
