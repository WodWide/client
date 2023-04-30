<template>
  <div class="fixed inset-0 z-40 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
    <div class="bg-white rounded-lg p-6 border-solid z-50">
      <div class="flex justify-end">
        <button @click="closeModal">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'times']"
            class="text-2xl text-gray-700"
          />
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
