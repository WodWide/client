<template>
  <div class="flex cursor-pointer items-center" @click="select = !select">
    <span class="mr-2 font-semibold text-gray-700"><slot /></span>
    <div
      class="w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-gray-800': value }"
    >
      <div
        class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ 'translate-x-6': value }"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    select: {
      get(): Boolean {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
});
</script>
<style lang="scss"></style>
