<template>
  <div
    class="items-center flex border-2 py-2 px-4 rounded-lg my-4 shadow-md"
    :class="selectedType && selectedType.key !== 'count' && 'justify-between'"
  >
    <span>Type:</span>
    <dropdown-menu
      :class="(!selectedType || selectedType.key === 'count') && 'ml-32'"
    >
      <template #trigger>
        <button
          class="border-solid border-black border-2 p-1 m-auto rounded-md"
        >
          {{ displayType }}
        </button>
      </template>
      <template #body>
        <ul class="p-4">
          <li v-for="(type, index) in types" :key="index">
            <button @click="selectType(type)">
              {{ type.name }}
            </button>
          </li>
        </ul>
      </template>
    </dropdown-menu>
    <template v-if="selectedType && selectedType.key !== 'count'">
      <span>{{ valueBasedOnType }}:</span>
      <input
        v-model="inputValue"
        placeholder="Write..."
        class="p-1 rounded-lg border-2 min-w-0 w-20"
        type="number"
        @input="updateValue"
      />
    </template>
  </div>
</template>

<script>
import "v-dropdown-menu/dist/vue2/v-dropdown-menu.css";
import DropdownMenu from "v-dropdown-menu/vue2";
export default {
  name: "WodType",
  components: { DropdownMenu },
  props: {
    wodType: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      inputValue: {
        type: Number,
      },
      types: [
        { name: "For Time", key: "for_time", rounds: null },
        { name: "Count Reps", key: "count" },
      ],
      selectedType: null,
    };
  },
  computed: {
    valueBasedOnType() {
      switch (this.selectedType?.key) {
        case "for_time":
          return "Rounds";
        case "count":
          return "none";
        default:
          return "Select";
      }
    },
    displayType() {
      return this.selectedType?.name || "Select";
    },
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
      this.$emit("update:wodType", type);
      this.inputValue = "";
    },
    updateValue(event) {
      this.$emit("update:wodType", {
        ...this.selectedType,
        [this.valueBasedOnType.toLowerCase()]: parseFloat(event.target.value),
      });
    },
  },
};
</script>

<style scoped></style>
