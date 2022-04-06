<template>
  <div
    class="profile-card flex items-center w-auto lg:w-full justify-center lg:m-8 mx-4 my-8"
  >
    <div
      class="bg-white shadow-xl rounded-lg p-2 lg:p-8 lg:w-72 flex flex-row lg:flex-col w-full"
    >
      <div class="photo-wrapper p-2">
        <img
          class="profile-card__image w-32 h-32 rounded-full mx-auto"
          :src="image"
          alt="Profile image"
        />
      </div>
      <div class="p-2">
        <h3
          class="profile-card__header text-center text-xl text-gray-900 font-medium leading-8"
        >
          <slot name="header"></slot>
        </h3>
        <div
          class="profile-card__body text-center text-gray-400 text-sm font-semibold pt-4"
        >
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProfileCards",
  props: {
    image: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss"></style>
