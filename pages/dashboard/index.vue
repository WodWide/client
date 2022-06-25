<template>
  <div class="about-page md:h-full">
    <!-- <div
      class="about-page__body h-full flex flex-col items-center justify-center xl:justify-start mt-4 lg:mt-12"
    > -->
    <SideNavbar />
    <!-- </div> -->
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
