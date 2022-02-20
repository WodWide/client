<template>
  <div class="signup-page flex flex-col h-full">
    <div class="flex flex-shrink md:p-4">
      <nuxt-link to="/">
        <img src="/logo.png" alt="wod wide logo" class="w-24 mr-12" />
      </nuxt-link>
    </div>
    <div class="signup-page__body">
      <Stepper />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Stepper from "@/components/stepper/Stepper.vue";

export default Vue.extend({
  name: "Signup",
  components: {
    Stepper,
  },
  head() {
    return {
      title: "Signup",
      meta: [
        {
          hid: "signup-page",
          name: "signup-page",
          content:
            "Signup page for WOD WIDE. Signup to start your jounrey as a cross-training athlete",
        },
      ],
    };
  },
});
</script>
<style lang="scss">
.signup-page {
  &__body {
    @apply flex flex-col items-center w-full h-full;
  }
  &__stepper {
    @apply h-1/2 w-1/2 mt-12;
  }
}
</style>
