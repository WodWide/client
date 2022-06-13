<template>
  <div class="signup-page flex flex-col h-full">
    <div class="flex flex-shrink md:p-4">
      <nuxt-link to="/">
        <img src="/logo.png" alt="wod wide logo" class="w-24 mr-12" />
      </nuxt-link>
    </div>
    <div class="signup-page__body">
      <Stepper @signup="signup" />
      <div
        v-if="error"
        id="signup-page-error"
        class="inline-flex items-center justify-center text-center mb-4 text-red-800"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Stepper from "@/components/stepper/Stepper.vue";
import { REGISTER_USER } from "@/apollo/mutations/UserMutations";
import encrypt from "@/mixins/encrypt";

export default Vue.extend({
  name: "Signup",
  components: {
    Stepper,
  },
  mixins: [encrypt],
  data() {
    return {
      error: "",
    };
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
    signup(): void {
      // TODO update user information on successfull
      const user = this.$store.getters["user/user"];
      const encryptedPassword = encrypt.methods.hashPassword(user.password);
      try {
        this.$apollo
          .mutate({
            mutation: REGISTER_USER,
            variables: {
              email: user.email,
              username: user.username,
              password1: encryptedPassword,
              password2: encryptedPassword,
            },
          })
          .then((res: any) => {
            const success = res.data.register.success;
            if (success) {
              this.storeTokenAndRedirect(res.data.register.token);
            } else {
              const errorKey = Object.keys(res.data.register.errors)[0];
              this.error = res.data.register.errors?.[errorKey][0]?.message;
            }
          });
      } catch (e) {
        console.log(e);
        this.error = "There was an error signing up. Try again later.";
      }
    },
    storeTokenAndRedirect(token: string): void {
      this.$store.dispatch("user/setToken", token);
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
