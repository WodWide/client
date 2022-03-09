<template>
  <div class="information-step flex items-center flex-col">
    <div class="text-4xl">Information</div>
    <div class="information-step__body w-fit my-12">
      <div class="flex items-center w-full mt-8 my-12">
        <font-awesome-icon
          id="font-awesome-icon"
          :icon="['fas', 'user']"
          class="text-2xl text-gray-700"
        />
        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="validation__wrapper"
          vid="firstName"
          rules="required"
        >
          <input
            v-model="firstName"
            type="text"
            :class="[
              'information-step__input',
              errors.length > 0 ? 'border-red-600' : 'border-gray-600',
            ]"
            placeholder="First Name"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="validation__wrapper"
          vid="lastName"
          rules="required"
        >
          <input
            v-model="lastName"
            type="text"
            :class="[
              'information-step__input',
              errors.length > 0 ? 'border-red-600' : 'border-gray-600',
            ]"
            placeholder="Last Name"
          />
        </ValidationProvider>
      </div>
      <div class="flex flex-col w-full">
        <div class="information-step__wrapper mb-12">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'envelope']"
            class="text-2xl text-gray-700"
          />
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="validation__wrapper"
            vid="email"
            rules="required|email"
          >
            <input
              v-model="email"
              type="text"
              :class="[
                'information-step__input',
                errors.length > 0 ? 'border-red-600' : 'border-gray-600',
              ]"
              placeholder="Email"
            />
            <div class="text-red-600 pt-2">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div class="information-step__wrapper">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'lock']"
            class="text-2xl text-gray-700"
          />
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="validation__wrapper"
            vid="lastName"
            rules="required|password"
          >
            <input
              v-model="password"
              type="password"
              :class="[
                'information-step__input',
                errors.length > 0 ? 'border-red-600' : 'border-gray-600',
              ]"
              placeholder="Password"
            />
            <div class="text-red-600 pt-2">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider } from "vee-validate";

export default Vue.extend({
  name: "InformationStep",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
});
</script>
<style lang="scss">
.information-step {
  &__input {
    @apply p-2 rounded-lg border-2 flex-grow min-w-0 w-full;
  }
  &__wrapper {
    @apply flex justify-center items-center;
  }
}
.validation {
  &__wrapper {
    @apply flex flex-col items-center w-full px-4;
  }
  &__error {
    @apply text-red-600 mt-2;
  }
}
</style>
