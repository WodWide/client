<template>
  <div class="side-navbar md:h-full w-24 text-center">
    <nuxt-link to="/">
      <img src="/logo.png" alt="wod wide logo" class="w-20 pt-2" />
    </nuxt-link>
    <div class="side-navbar__content pt-10 h-full">
      <div class="side-navbar__upper">
        <BaseButton theme="blank">
          <img src="/home-icon.svg" alt="navigatio icons" />
        </BaseButton>
        <BaseButton theme="blank">
          <img src="/leaderboard-icon.svg" alt="navigatio icons" />
        </BaseButton>
        <BaseButton theme="blank">
          <img src="/wod-icon.svg" alt="navigatio icons" />
        </BaseButton>
      </div>
      <div class="side-navbar__lower w-24">
        <BaseButton theme="blank">
          <img src="/account-icon.svg" alt="navigatio icons" />
        </BaseButton>
        <BaseButton theme="blank">
          <img src="/settings-icon.svg" alt="navigation icons" />
        </BaseButton>
        <hr class="text-black-800" />
        <BaseButton theme="blank">
          <img src="/logout-icon.svg" alt="navigation icons" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
export default Vue.extend({
  name: "SideNavbar",
  components: { BaseButton },
});
</script>
<style lang="scss">
.side-navbar {
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
