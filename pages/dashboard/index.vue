<template>
  <div class="dashboard-page h-full">
    <SideNavbar />
    <div class="flex flex-col">
      <div
        class="dashboard-page__title flex items-center justify-center font-lg text-lg lg:text-3xl absolute top-4 shadow-2xl"
        :class="{ 'dashboard-page__title--mobile': isMobile }"
      >
        Welcome to our global community
      </div>
      <Map />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "@/components/Map.vue";
import SideNavbar from "@/components/common/SideNavbar.vue";
export default Vue.extend({
  components: { Map, SideNavbar },
  head() {
    return {
      title: "Dashboard",
      meta: [
        {
          hid: "dashboard",
          name: "Dashboard",
          content:
            "Dashboard of WodWide. This is the main page in which athletes can control everything from here.",
        },
      ],
    };
  },
  computed: {
    isMobile(): boolean {
      return this.$breakpoints.sMd;
    },
  },
});
</script>
<style lang="scss">
.dashboard-page {
  &__title {
    z-index: 999;
    left: 35%;
    background: white;
    padding: 1em;
    border-radius: 1em;
    &--mobile {
      left: 27%;
      width: 60%;
      top: 4em;
      font-size: 0.75em;
    }
  }
}
</style>
