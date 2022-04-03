<template>
  <div
    class="login-page flex md:p-4 bg-gray-50 justify-center flex-col md:flex-row h-full"
  >
    <div class="md:flex md:flex-col md:w-2/3">
      <nuxt-link to="/">
        <img src="/logo.png" alt="wod wide logo" class="w-24 mr-12" />
      </nuxt-link>
      <div class="w-full h-full md:flex items-center justify-center hidden">
        <img
          src="/login-icons.svg"
          alt="exercise icons"
          class="my-24 flex items-center"
        />
      </div>
    </div>
    <div class="login-page__wrapper">
      <logo class="text-6xl flex justify-center py-4" />
      <div
        id="login-page-description"
        class="inline-flex items-center justify-center py-4 text-gray-800 text-center"
      >
        Login to start your journey as a cross-training athlete/coach
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <div class="inline-flex w-full items-center justify-center">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'user']"
            class="text-2xl text-gray-700"
          />
          <input
            id="username"
            v-model="username"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 mx-4 text-grey-darker"
            type="text"
            placeholder="Username"
            @keyup.enter="signIn"
          />
        </div>
      </div>
      <div class="mb-6 mt-2">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <div class="inline-flex w-full items-center justify-center">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'lock']"
            class="text-2xl text-gray-700"
          />
          <input
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 mx-4 text-grey-darker"
            type="password"
            placeholder="******************"
            @keyup.enter="signIn"
          />
        </div>
      </div>
      <div
        v-if="error"
        id="login-page-error"
        class="inline-flex items-center justify-center text-center mb-4 text-red-800"
      >
        {{ error }}
      </div>
      <div class="flex flex-col items-center w-auto">
        <div class="flex w-full mx-16">
          <BaseToggle v-model="isCoach">Coach</BaseToggle>
          <a
            class="inline-flex justify-end w-full font-bold text-sm text-blue text-gray-800 hover:text-gray-600"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        <BaseButton
          id="login-page-submit"
          class="rounded-full mt-4 text-lg"
          @click.native="signIn"
        >
          Sign In
        </BaseButton>
      </div>
      <div class="flex items-center justify-center pt-8">
        <span class="text-gray-800">Dont have an account?</span>
        <nuxt-link to="/signup">
          <span
            id="login-page-signup-button"
            class="ml-2 text-gray-500 hover:text-gray-400"
          >
            Sign up here
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Logo from "@/components/Logo.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseToggle from "@/components/common/BaseToggle.vue";
import { LOGIN_USER } from "@/apollo/mutations/UserMutations";
import mixins from "@/mixins/mixins";

export default Vue.extend({
  components: { Logo, BaseButton, BaseToggle },
  mixins: [mixins],

  data() {
    return {
      isCoach: false,
      error: "",
      username: "",
      password: "",
    };
  },
  head() {
    return {
      title: "Login",
      meta: [
        {
          hid: "login-page",
          name: "Login page",
          content:
            "Login page for WOD WIDE. Login to start your jounrey as a cross-training athlete",
        },
      ],
    };
  },
  created() {
    if (this.$store.state.user.authStatus) {
      this.$router.push("/");
    }
  },
  methods: {
    signIn(): void {
      if (this.username === "" || this.password === "") {
        this.error = "Please fill in all fields";
      } else {
        const hashedPassword: string = mixins.methods.encryptPassword(
          this.password
        );
        try {
          this.$apollo
            .mutate({
              mutation: LOGIN_USER,
              variables: {
                username: this.username,
                password: hashedPassword,
              },
            })
            .then((res: any) => {
              this.storeInformation(res);
            });
        } catch (e) {
          console.log(e);
          this.error = "There was an error logging in. Try again later.";
        }
      }
    },
    storeInformation(response: any) {
      if (response.data.tokenAuth.success) {
        this.setUserToken(response.data.tokenAuth.token);
        this.setUserDetails(response.data.tokenAuth.user);
        this.$router.push("/");
      } else {
        this.error =
          "Error: " + response.data.tokenAuth.errors.nonFieldErrors[0].message;
      }
    },
    setUserToken(token: string) {
      this.$store.dispatch("user/setToken", token);
    },
    setUserDetails(user: any) {
      this.$store.dispatch("user/setUser", user);
    },
  },
});
</script>
<style lang="scss">
.login-page {
  &__wrapper {
    @apply flex flex-col justify-center items-center w-full h-full rounded-lg;
    @screen md {
      @apply bg-white shadow-2xl w-3/4 h-3/4 mt-24;
    }
    @screen lg {
      @apply p-12 lg:m-32 items-stretch w-1/2;
    }
  }
}
</style>
