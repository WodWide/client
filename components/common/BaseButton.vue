<template>
  <button
    class="base-button transition ease-in-out delay-150"
    :class="themeClasses"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import Vue from "vue";

const THEMES = { BLANK: "blank", PRIMARY: "primary", RED: "red" };

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
      default: false,
    },
    hoverColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    themeClasses() {
      return [
        `base-button--${this.theme}`,
        this.bordered ? `base-button--${this.theme}--bordered` : "",
        this.hoverColor ? `hover:${this.hoverColor}` : "",
      ];
    },
  },
});
</script>
<style lang="scss">
.base-button {
  @apply font-bold py-3 px-8 rounded-lg;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &--blank--bordered {
    border: 2px solid black;
  }

  &--primary {
    @apply bg-gray-900 hover:bg-gray-700 text-white;
  }
  &--red {
    @apply bg-red-900 hover:bg-red-700 text-white;
  }
}
</style>
