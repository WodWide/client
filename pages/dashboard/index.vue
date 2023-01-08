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
  data() {
    return {
      data: {
        type: String,
      },
    };
  },
});
</script>
<style lang="scss"></style>
