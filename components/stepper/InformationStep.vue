<template>
  <div class="information-step flex items-center flex-col">
    <div class="text-4xl">Information</div>
    <div class="information-step__body w-fit mt-12">
      <ValidationObserver v-slot="{ valid }">
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
              v-model="user.firstName"
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
              v-model="user.lastName"
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
                v-model="user.email"
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
                v-model="user.password"
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
        <div class="information-step__footer flex justify-end mt-12 -mb-8">
          <BaseButton
            :class="{ 'information-step__button--disabled': !valid }"
            @click.native="increaseStep"
          >
            Next
          </BaseButton>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import BaseButton from "../common/BaseButton.vue";

export default Vue.extend({
  name: "InformationStep",
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseButton,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    const storeUser = { ...this.$store.getters["user/user"] };
    Object.entries(storeUser) && (this.user = storeUser);
  },
  methods: {
    increaseStep() {
      this.$store.dispatch("user/setUser", this.user);
      this.$emit("increase-step");
    },
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
  &__button {
    &--disabled {
      @apply pointer-events-none rounded-lg opacity-25;
    }
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
