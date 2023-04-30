<template>
  <div class="wod-container">
    <div v-if="wod" class="flex justify-center items-center flex-col">
      <h1 class="font-semibold text-2xl">WOD</h1>
      <h1 class="font-medium text-lg mb-4">
        {{ wod["name"] ? wod["name"] : "Todays Workout" }}
      </h1>
      <div class="wod">
        <p class="subtitle is-3">{{ wod["description"] }}</p>
        <ul id="wod-elements" class="ul-container">
          <li v-for="(item, index) in wod['exercises']" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Generate a WOD by clicking the button</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    wod() {
      return this.$store.state.wod.wod;
    },
  },
});
</script>
<style lang="scss">
.wod-container div:first-child {
  position: relative;
}

.abs-tr {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -15px;
  z-index: 99;
}
</style>
