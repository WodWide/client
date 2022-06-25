<template>
  <button class="base-button" :class="themeClasses">
    <slot />
  </button>
</template>
<script lang="ts">
import Vue from "vue";

const THEMES = { BLANK: "blank", PRIMARY: "primary" };

export default Vue.extend({
  name: "BaseButton",
  props: {
    theme: {
      type: String,
      default: THEMES.PRIMARY,
      validator: (theme) => {
        return Object.values(THEMES).includes(theme);
      },
    },
    bordered: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    themeClasses() {
      return [
        `base-button--${this.theme}`,
        this.bordered ? `base-button--${this.theme}--bordered` : "",
      ];
    },
  },
});
</script>
<style lang="scss">
.base-button {
  @apply text-white font-bold py-3 px-8 rounded-lg;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &--blank--bordered {
    border: 2px solid black;
  }

  &--primary {
    @apply bg-gray-900 hover:bg-gray-700;
  }
}
</style>
