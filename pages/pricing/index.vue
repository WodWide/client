<template>
  <div class="pricing-page md:h-full">
    <nuxt-link to="/">
      <img src="/logo.png" alt="wod wide logo" class="w-24" />
    </nuxt-link>
    <div
      class="pricing-page__body h-full flex flex-col items-center justify-center xl:justify-start mt-4 lg:mt-12"
    >
      <div
        class="pricing-page__body-desc lg:text-2xl flex items-center flex-col"
      >
        <div class="text-4xl"><b>WodWide</b></div>
        <div class="text-gray-600 text-center">
          is a social-utility platmform design for cross training athletes and
          trainers
        </div>
      </div>
      <div
        class="pricing-page__body-cards shadow-lg rounded-lg p-8 text-lg lg:text-2xl mt-4 lg:mt-24 w-full lg:w-1/2"
      >
        <div class="flex justify-center">Pricing</div>
        <div class="flex flex-col md:flex-row justify-center">
          We currenlty do not offer any pricing plans. The application will be
          free for all user and we will only plan on charging extra for the AI
          features.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  head() {
    return {
      title: "Pricing",
      meta: [
        {
          hid: "pricing-page",
          name: "pricing page",
          content:
            "This is the pricing page of the WodWide application containing information about the prices and packages we offer.",
        },
      ],
    };
  },
});
</script>
<style lang="scss"></style>
