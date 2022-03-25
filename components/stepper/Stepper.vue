<template>
  <div class="stepper p-4 shadow-lg rounded-lg flex flex-col w-1/2 mt-24">
    <div class="stepper__header flex items-center justify-center">
      <StepIcon
        v-for="index in steps.length"
        :key="index"
        :active="isActiveStep(index)"
        :disabled="isStepDisabled(index)"
        :is-last="isLast(index)"
      />
    </div>
    <component
      :is="steps[currentStep].component"
      class="my-12"
      @increase-step="increaseStep()"
      @decrease-step="decreaseStep()"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StepIcon from "./StepIcon.vue";
import InformationStep from "./InformationStep.vue";
import ProfileStep from "./ProfileStep.vue";

export default Vue.extend({
  name: "Stepper",
  // props: {
  //   steps: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  components: {
    InformationStep,
    ProfileStep,
    StepIcon,
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        {
          title: "Information",
          component: "InformationStep",
        },
        {
          title: "Profile Setup",
          component: "ProfileStep",
        },
      ],
    };
  },
  computed: {
    isButtonDisabled(): Boolean {
      return this.currentStep === 0;
    },
    isLastStep(): Boolean {
      return this.currentStep === this.steps.length - 1;
    },
  },
  methods: {
    increaseStep() {
      this.isLastStep ? this.submitForm() : this.currentStep++;
    },
    decreaseStep() {
      this.currentStep -= 1;
    },
    submitForm() {
      this.$emit("submit");
      console.log("submit");
    },
    isActiveStep(index: number): boolean {
      return this.currentStep === index - 1;
    },
    isStepDisabled(index: number): boolean {
      return this.currentStep < index - 1;
    },
    isLast(index: number): boolean {
      return index === this.steps.length;
    },
  },
});
</script>
<style lang="scss"></style>
