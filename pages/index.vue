<template>
  <div class="index-page overflow-hidden">
    <nav
      id="index-page-navbar"
      class="flex items-center flex-wrap px-2 lg:px-8 py-4"
    >
      <div class="basis-1/4">
        <img src="/logo.png" width="100" />
      </div>
      <button
        class="lg:hidden flex-1 flex justify-end mx-4"
        @click="toggleMenu"
      >
        <img src="/burger-icon.svg" class="w-8" />
      </button>
      <transition name="fade" :css="isMobile">
        <div
          v-if="!isMobile || showMenu"
          class="basis-3/4 lg:flex-1 lg:flex items-center justify-center lg:flex-row flex-col w-full"
        >
          <div class="flex-1 justify-center w-full flex-col lg:flex-row flex">
            <nuxt-link to="/">
              <span class="index-page__nav-item">Home</span>
            </nuxt-link>
            <nuxt-link to="/about">
              <span class="index-page__nav-item">About</span>
            </nuxt-link>
            <nuxt-link to="/pricing">
              <span class="index-page__nav-item">Pricing</span>
            </nuxt-link>
            <nuxt-link to="/contact">
              <span class="index-page__nav-item">Contact</span>
            </nuxt-link>
          </div>
          <div class="flex flex-1 justify-end flex-col lg:flex-row">
            <nuxt-link to="/login" class="flex justify-end my-2 text-sm">
              <BaseButton class="index-page__button">Login &#8594;</BaseButton>
            </nuxt-link>
            <nuxt-link to="/signup" class="flex justify-end my-2 text-sm">
              <BaseButton class="index-page__button">
                Sign up &#8594;
              </BaseButton>
            </nuxt-link>
          </div>
        </div>
      </transition>
    </nav>
    <div
      id="index-page-body"
      class="flex flex-col justify-center items-center mt-8 lg:mt-16 h-full"
    >
      <logo class="text-6xl" />
      <div class="index-page__icons flex my-12">
        <img src="/icon-park_rope-skipping-one.svg" alt="skipping rope" />
        <img src="/healthicons_exercise.svg" alt="dumbbell" />
        <img src="/iconoir_rings.svg" alt="gymnastic rings" />
      </div>
      <span id="index-page-description" class="text-center text-lg">
        A social platform for cross training athletes
      </span>
      <div class="flex justify-center items-center mt-12 lg:mt-16 z-50">
        <nuxt-link to="/signup">
          <BaseButton id="index-page-join" class="text-sm lg:text-lg mr-2">
            Join us
          </BaseButton>
        </nuxt-link>
        <nuxt-link to="/about">
          <span
            id="index-page-learn-more"
            class="bg-white hover:bg-gray-100 text-black font-bold py-3 px-9 rounded border-solid border-black border-2 text-sm lg:text-lg"
          >
            Learn More
          </span>
        </nuxt-link>
      </div>
      <img
        src="/waves.png"
        class="mt-12 xl:-mt-20 flex items-end h-full w-full"
        alt="gray scale waves"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "nuxt-breakpoints";
import Logo from "@/components/Logo.vue";
import BaseButton from "@/components/common/BaseButton.vue";

export default Vue.extend({
  name: "HomePage",
  components: { Logo, BaseButton },
  transition: "fade",
  data() {
    return {
      showMenu: false,
    };
  },
  head() {
    return {
      title: "Home",
      meta: [
        {
          hid: "home-page",
          name: "Home page",
          content:
            "Home page for WOD WIDE. A social platform for cross training athletes",
        },
      ],
    };
  },
  computed: {
    isMobile() {
      return this.$breakpoints.sMd;
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
});
</script>
<style lang="scss">
.index-page {
  font-size: 8px;
  height: 100%;
  @apply text-gray-700;
  &__nav-item {
    @apply hover:text-gray-400 flex justify-end my-1 text-lg mx-4;
  }
  &__button {
    @apply py-2 px-4 mx-4 rounded text-sm;
    @screen lg {
      @apply text-lg py-3 px-5;
    }
  }
  &__icons {
    img {
      @apply mx-2 w-16;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
