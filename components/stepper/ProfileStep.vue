<template>
  <div class="profile-step flex items-center flex-col">
    <div class="text-4xl">Profile</div>
    <ValidationObserver v-slot="{ valid }" class="w-full">
      <div class="profile-step__body w-fit mt-12"></div>
      <div
        class="profile-step__footer w-full flex justify-end mt-12 -mb-8 px-4"
      >
        <div class="profile-step__footer--previous flex-1">
          <BaseButton @click.native="$emit('decrease-step')">
            Previous
          </BaseButton>
        </div>
        <div class="profile-step__footer--next">
          <BaseButton
            :class="{ 'information-step__button--disabled': !valid }"
            @click.native="$emit('increase-step')"
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
import { ValidationObserver } from "vee-validate";
import BaseButton from "../common/BaseButton.vue";

export default Vue.extend({
  name: "ProfileStep",
  components: {
    ValidationObserver,
    BaseButton,
  },
});
</script>
<style lang="scss">
.profile-step {
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
</style>
