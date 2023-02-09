<template>
  <div class="dashboard-page h-full">
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "SideNavbar",
  middleware: "auth",
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
});
</script>
