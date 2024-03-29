<template>
  <div
    class="side-navbar"
    :class="{ 'side-navbar--desktop': isNotMobileOrShowMenu }"
  >
    <button
      v-if="isMobile"
      class="mt-2"
      :class="isMobile ? 'mx-8' : 'mx-4'"
      @click="toggleMenu"
    >
      <img
        v-if="!showMenu"
        src="/burger-icon.svg"
        class="w-8"
        alt="burger-menu-icon"
      />
      <font-awesome-icon
        v-else
        :icon="['fa', 'angle-left']"
        class="side-navbar__icon"
      />
    </button>
    <div v-if="!isMobile || showMenu" class="side-navbar__content">
      <nuxt-link to="/">
        <img src="/logo.png" alt="wod wide logo" class="w-20 pt-2" />
      </nuxt-link>
      <div class="side-navbar__content pt-10">
        <div class="side-navbar__upper h-full">
          <BaseButton
            v-for="(item, index) in menu"
            :key="item.src"
            v-tooltip.top="{ content: item.alt, classes: 'tooltip' }"
            :hover-color="hoverColor"
            theme="blank"
            @click.native="
              index === menu.length - 1 ? logout() : goToPage(item)
            "
          >
            <img
              :key="item.src"
              class="w-8 h-8"
              :src="item.src"
              :alt="item.alt"
            />
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
const menu = [
  { src: "/home-icon.svg", alt: "Home", location: "/dashboard" },
  {
    src: "/leaderboard-icon.svg",
    alt: "Leaderboard",
    location: "/leaderboard",
  },
  { src: "/gym-icon.svg", alt: "Gym", location: "/gym" },
  { src: "/healthicons_exercise.svg", alt: "Wod", location: "/wod" },
  {
    src: "/upload-icon.svg",
    alt: "AI-submission",
    location: "/video-submission",
  },
  { src: "/account-icon.svg", alt: "Account", location: "/account" },
  { src: "/glossary.svg", alt: "Glossary", location: "/glossary" },
  { src: "/settings-icon.svg", alt: "Settings", location: "/settings" },
  { src: "/logout-icon.svg", alt: "Logout", location: "/logout" },
];
export default Vue.extend({
  name: "SideNavbar",
  components: { BaseButton },
  data() {
    return {
      hoverColor: "bg-gray-300",
      menu,
      showMenu: false,
    };
  },
  computed: {
    isMobile(): boolean {
      return this.$breakpoints.sMd;
    },
    isNotMobileOrShowMenu(): boolean {
      return this.showMenu || !this.isMobile;
    },
  },
  methods: {
    goToPage(object): void {
      this.$router.push(object.location);
    },
    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    },
    logout(): void {
      this.$store.dispatch("user/resetData");
      this.$router.push("/");
    },
  },
});
</script>
<style lang="scss">
.tooltip {
  background: white;
  color: black;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
  z-index: 999;
}
.side-navbar {
  z-index: 500;
  position: absolute;
  &--desktop {
    @apply h-full w-24 text-center;
    border-right: 1px solid rgba(43, 43, 43, 0.168);
    background: linear-gradient(
        180deg,
        rgba(249, 251, 252, 0.91) 20%,
        rgba(222, 214, 214, 0) 99.99%,
        rgba(249, 251, 252, 0.91) 100%
      ),
      #ece6e6;
  }
  &__icon {
    font-size: 1.5em;
  }
  &__lower {
    bottom: 0;
  }
}
</style>
