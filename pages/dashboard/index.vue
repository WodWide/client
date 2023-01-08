<template>
  <div class="about-page h-full">
    <SideNavbar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SideNavbar from "@/components/layoutComponents/SideNavbar.vue";

export default Vue.extend({
  components: { SideNavbar },
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
<style lang="scss"></style>
