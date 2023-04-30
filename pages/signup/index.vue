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
      loading: false,
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
  created() {
    if (this.$store.state.user.authStatus) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    signup() {
      const user = { ...this.$store.getters["user/user"] };
      const encryptedPassword = encrypt.methods.hashPassword(user.password);
      this.$fire.auth
        .createUserWithEmailAndPassword(user.email, encryptedPassword)
        .then((res: any) => {
          delete user.password;
          const ref = this.$fire.firestore.collection("users");
          ref.add(user);
          this.storeTokenAndRedirect(res.user.accessToken);
          this.$store.dispatch("user/setUser", user);
        })
        .catch((e: any) => {
          console.log(e);
          this.error = "Error:" + e.message;
          this.setError(this.error);
        });
    },
    storeTokenAndRedirect(token: string): void {
      this.$store.dispatch("user/setToken", token);
      this.$router.push("/dashboard");
    },
    setError(error: string) {
      this.$toast.show({
        type: "danger",
        title: "Error",
        message: error,
      });
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
