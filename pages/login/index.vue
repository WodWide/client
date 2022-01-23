<template>
  <div
    class="login-page flex md:p-4 bg-gray-50 justify-center flex-col md:flex-row h-full"
  >
    <div class="md:flex md:flex-col mb-8 md:mb-0">
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
        class="inline-flex items-center justify-center py-4 text-gray-800 text-center"
      >
        Login to start your journey as a crosstraining athletes
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <div class="inline-flex w-full items-center justify-center">
          <font-awesome-icon
            :icon="['fas', 'user']"
            class="text-2xl text-gray-700"
          />
          <input
            id="email"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 mx-4 text-grey-darker"
            type="text"
            placeholder="Username"
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
            :icon="['fas', 'lock']"
            class="text-2xl text-gray-700"
          />
          <input
            id="password"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 mx-4 text-grey-darker"
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex w-full">
          <BaseToggle v-model="isCoach">Coach</BaseToggle>
          <a
            class="inline-flex justify-end w-full font-bold text-sm text-blue text-gray-800 hover:text-gray-600"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        <BaseButton class="rounded-full mt-4 text-lg">Sign In</BaseButton>
      </div>
      <div class="flex items-center justify-center pt-8">
        <span class="text-gray-800">Dont have an account?</span>
        <nuxt-link to="/register">
          <span class="ml-2 text-gray-500 hover:text-gray-400">
            Register here
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

export default Vue.extend({
  components: { Logo, BaseButton, BaseToggle },
  data() {
    return {
      isCoach: false,
      email: "",
      password: "",
    };
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
