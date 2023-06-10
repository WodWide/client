<template>
  <div
    class="items-center flex border-2 py-2 px-4 rounded-lg my-4 shadow-md"
    :class="isRepsEnabled && 'justify-between'"
  >
    <span>Exercise:</span>
    <dropdown-menu>
      <template #trigger>
        <button
          class="border-solid border-black border-2 p-1 m-auto rounded-md"
          :class="!isRepsEnabled && 'ml-32'"
        >
          {{ selectedExercise || "Select" }}
        </button>
      </template>
      <template #body>
        <ul class="p-4">
          <li v-for="(exercise, index) in exercises" :key="index">
            <button @click="selectExercise(exercise)">
              {{ exercise }}
            </button>
          </li>
        </ul>
      </template>
    </dropdown-menu>
    <template v-if="isRepsEnabled">
      <span>Reps:</span>
      <input
        v-model="reps"
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
  name: "Exercises",
  components: { DropdownMenu },
  props: {
    isRepsEnabled: {
      type: Boolean,
      default: true,
    },
    exerciseList: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      exercises: ["pull-up", "push-up", "squat"],
      selectedExercise: null,
      reps: null,
    };
  },
  watch: {
    // if count reps is selected, reset the selected exercise and the previous list
    isRepsEnabled(newValue) {
      if (!newValue) {
        this.selectedExercise = null;
        this.$emit("update:exerciseList", []);
      }
    },
  },
  methods: {
    selectExercise(exercise) {
      this.selectedExercise = exercise;
      const filterList = this.exerciseList.filter(
        (item) => item.index !== this.index
      );
      const newList = [...filterList];
      newList.push({ index: this.index, name: exercise, reps: this.reps });
      this.$emit("update:exerciseList", newList);
    },
    updateValue(event) {
      const filterList = this.exerciseList.filter(
        (item) => item.index !== this.index
      );
      filterList.push({
        index: this.index,
        reps: parseInt(event.target.value),
        name: this.selectedExercise,
      });
      this.$emit("update:exerciseList", filterList);
    },
  },
};
</script>
