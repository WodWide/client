<template>
  <div class="profile-step flex items-center flex-col">
    <div class="text-4xl">Profile</div>
    <ValidationObserver v-slot="{ valid }" class="w-full xl:w-1/2">
      <div class="profile-step__body w-fit mt-12">
        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="validation__wrapper"
          vid="username"
          rules="required"
        >
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'user']"
            class="profile-step__icon"
          />
          <input
            v-model="user.username"
            type="text"
            :class="[
              'profile-step__input',
              errors.length > 0 ? 'border-red-600' : 'border-gray-600',
            ]"
            placeholder="Username"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="validation__wrapper"
          vid="age"
          rules="required|numeric|digits:2"
        >
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'birthday-cake']"
            class="profile-step__icon"
          />
          <input
            v-model="user.age"
            type="text"
            :class="[
              'profile-step__input w-1/2',
              errors.length > 0 ? 'border-red-600' : 'border-gray-600',
            ]"
            placeholder="Age"
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="validation__wrapper"
          vid="height"
          rules="required"
        >
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'arrow-up']"
            class="profile-step__icon"
          />
          <input
            v-model="user.height"
            v-mask="'#.##'"
            type="text"
            :class="[
              'profile-step__input w-full',
              errors.length > 0 ? 'border-red-600' : 'border-gray-600',
            ]"
            placeholder="Height in cm"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="validation__wrapper"
          vid="weight"
          rules="required|numeric"
        >
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'weight']"
            class="profile-step__icon"
          />
          <input
            v-model="user.weight"
            type="text"
            :class="[
              'profile-step__input w-full',
              errors.length > 0 ? 'border-red-600' : 'border-gray-600',
            ]"
            placeholder="Weight in kg"
          />
        </ValidationProvider>
      </div>
      <div
        class="profile-step__footer w-full flex justify-end mt-12 -mb-8 px-4"
      >
        <div class="profile-step__footer--previous flex-1">
          <BaseButton @click.native="decreaseStep">Previous</BaseButton>
        </div>
        <div class="profile-step__footer--next">
          <BaseButton
            :class="{ 'profile-step__button--disabled': !valid }"
            @click.native="signup"
          >
            Finish
          </BaseButton>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseButton from "../common/BaseButton.vue";

export default Vue.extend({
  name: "ProfileStep",
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseButton,
  },
  data() {
    return {
      user: {
        username: "",
        height: "",
        weight: "",
        age: "",
      },
    };
  },
  created() {
    const storeUser = { ...this.$store.getters["user/user"] };
    Object.entries(storeUser) && (this.user = storeUser);
  },
  methods: {
    decreaseStep(): void {
      this.$store.dispatch("user/setUser", this.user);
      this.$emit("decrease-step");
    },
    signup(): void {
      this.$store.dispatch("user/setUser", this.user);
      this.$emit("signup");
    },
  },
});
</script>
<style lang="scss" scoped>
.profile-step {
  &__input {
    @apply p-2 rounded-lg border-2 flex-grow min-w-0 w-auto;
  }
  &__wrapper {
    @apply flex justify-center items-center;
  }
  &__button {
    &--disabled {
      @apply pointer-events-none rounded-lg opacity-25;
    }
  }
  &__icon {
    @apply text-2xl text-gray-700 mr-4;
  }
}
.validation {
  &__wrapper {
    @apply flex flex-row flex-wrap items-center w-full px-4 mb-8;
  }
}
</style>
