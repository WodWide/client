<template>
  <div class="about-page md:h-full">
    <nuxt-link to="/">
      <img src="/logo.png" alt="wod wide logo" class="w-24" />
    </nuxt-link>
    <div
      class="about-page__body h-full flex flex-col items-center justify-center xl:justify-start mt-4 lg:mt-12"
    >
      <div class="about-page__body-desc lg:text-2xl flex items-center flex-col">
        <div class="text-4xl"><b>WodWide</b></div>
        <div class="text-gray-600 text-center">
          is a social-utility platmform design for cross training athletes and
          trainers
        </div>
      </div>
      <div
        class="about-page__body-cards text-lg lg:text-2xl mt-4 lg:mt-24 w-full lg:w-1/2"
      >
        <div class="flex justify-center">Meet the developers</div>
        <div class="flex flex-col md:flex-row justify-center">
          <ProfileCard
            v-for="developer in developers"
            :key="developer.name"
            :image="developer.image"
          >
            <template #header>{{ developer.name }}</template>
            <template #body>
              <p v-for="role in developer.roles" :key="role">{{ role }}</p>
            </template>
          </ProfileCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProfileCard from "@/components/common/ProfileCard.vue";

export default Vue.extend({
  components: { ProfileCard },
  data() {
    return {
      developers: [
        {
          name: "Grigoris Giapantzis",
          roles: ["Full-Stack developer", "DevOps engineer", "QA specialist"],
          image: "giapa-profile.jpg",
        },
        {
          name: "Dimitris Tolios",
          roles: ["Full-Stack developer", "Machine Learning engineer"],
          image: "tolios-profile.jpg",
        },
      ],
    };
  },
  head() {
    return {
      title: "About page of WodWide application",
      meta: [
        {
          hid: "about-page",
          name: "about-page",
          content:
            "This is the about page of the WodWide application containing information about the developers and the app",
        },
      ],
    };
  },
});
</script>
<style lang="scss"></style>
