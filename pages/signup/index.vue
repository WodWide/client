<template>
  <div class="signup-page flex flex-col h-full">
    <div class="flex flex-shrink md:p-4">
      <nuxt-link to="/">
        <img src="/logo.png" alt="wod wide logo" class="w-24 mr-12" />
      </nuxt-link>
    </div>
    <div class="signup-page__body">
      <Stepper @signup="signup" />
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
  methods: {
    signup() {
      const user = this.$store.getters["user/user"];
      // TODO add query for registration and hash password
      console.log(user);
      this.$router.push("/");
    },
  },
});
</script>
<style lang="scss">
.signup-page {
  &__body {
    @apply flex flex-col items-center w-full h-full;
  }
}
</style>
