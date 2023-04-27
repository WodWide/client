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
      <ChatOfDay v-if="showChat" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "@/components/Map.vue";
import SideNavbar from "@/components/common/SideNavbar.vue";
import ChatOfDay from "@/components/common/ChatOfDay.vue";

export default Vue.extend({
  components: { Map, SideNavbar, ChatOfDay },
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
    showChat(): boolean {
      return this.$store.getters["user/user"]?.gym;
    },
  },
});
</script>
<style lang="scss">
.dashboard-page {
  &__title {
    z-index: 499;
    left: 35%;
    background: white;
    padding: 1em;
    border-radius: 1em;
    &--mobile {
      left: 0;
      width: 100%;
      top: 4em;
      z-index: 499;
    }
  }
}
</style>
