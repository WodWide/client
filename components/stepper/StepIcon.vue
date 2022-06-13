<template>
  <div class="step-icon flex items-center">
    <div
      :class="[
        'step-icon__body rounded-full w-8 h-8 flex items-center justify-center',
        {
          'bg-gray-300': active,
          'opacity-25': disabled,
        },
      ]"
    >
      <div class="rounded-full w-5 h-5 bg-gray-800" />
    </div>
    <div v-if="!isLast" class="step-icon__divider w-24 mx-2" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "StepIcon",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss">
.step-icon {
  &__divider {
    border-top: 3px solid #bbb;
  }
}
</style>
