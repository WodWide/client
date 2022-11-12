<template>
  <div class="side-navbar">
    <nuxt-link to="/">
      <img src="/logo.png" alt="wod wide logo" class="w-20 pt-2" />
    </nuxt-link>
    <div class="side-navbar__content pt-10">
      <div class="side-navbar__upper h-full">
        <BaseButton
          v-for="item in upperMenu"
          :key="item.src"
          :hover-color="hoverColor"
          theme="blank"
          :tooltip-description="item.alt"
        >
          <img :key="item.src" :src="item.src" :alt="item.alt" />
        </BaseButton>
      </div>
      <div class="side-navbar__lower w-24 mb-8">
        <BaseButton
          v-for="item in lowerMenu"
          :key="item.src"
          :hover-color="hoverColor"
          theme="blank"
          :tooltip-description="item.alt"
        >
          <img :key="item.src" :src="item.src" :alt="item.alt" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
const upperMenu = [
  { src: "/home-icon.svg", alt: "Home" },
  { src: "/leaderboard-icon.svg", alt: "Leaderboard" },
  { src: "/wod-icon.svg", alt: "Wod" },
];
const lowerMenu = [
  { src: "/account-icon.svg", alt: "Account" },
  { src: "/settings-icon.svg", alt: "Settings" },
  { src: "/logout-icon.svg", alt: "Logout" },
];
export default Vue.extend({
  name: "SideNavbar",
  components: { BaseButton },
  data() {
    return {
      hoverColor: "bg-gray-300",
      upperMenu,
      lowerMenu,
    };
  },
  computed: {
    isMobile() {
      return this.$breakpoints.sMd;
    },
  },
});
</script>
<style lang="scss">
.side-navbar {
  position: absolute;
  @apply h-full w-24 text-center;
  border-right: 1px solid rgba(43, 43, 43, 0.168);
  background: linear-gradient(
      180deg,
      rgba(249, 251, 252, 0.91) 20%,
      rgba(222, 214, 214, 0) 99.99%,
      rgba(249, 251, 252, 0.91) 100%
    ),
    #ece6e6;

  &__lower {
    position: absolute;
    bottom: 0px;
  }
}
</style>
