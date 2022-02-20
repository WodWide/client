<template>
  <div class="information-step flex items-center flex-col">
    <div class="text-4xl">Information</div>
    <div class="information-step__body w-2/3 my-12">
      <div class="flex items-center w-full my-8">
        <font-awesome-icon
          id="font-awesome-icon"
          :icon="['fas', 'user']"
          class="text-2xl text-gray-700"
        />
        <input
          type="text"
          class="information-step__input w-1/2"
          placeholder="First Name"
        />
        <input
          type="text"
          class="information-step__input w-1/2"
          placeholder="Last Name"
        />
      </div>
      <div class="flex flex-col w-full">
        <div class="information-step__wrapper mb-8">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'envelope']"
            class="text-2xl text-gray-700"
          />
          <input
            type="text"
            class="information-step__input"
            placeholder="Email"
          />
        </div>
        <div class="information-step__wrapper">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'lock']"
            class="text-2xl text-gray-700"
          />
          <input
            type="password"
            class="information-step__input"
            placeholder="Password"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "InformationStep",
});
</script>
<style lang="scss">
.information-step {
  &__input {
    @apply p-2 rounded-lg border-2 border-gray-600 mx-4 flex-grow;
  }
  &__wrapper {
    @apply flex justify-center items-center;
  }
}
</style>
