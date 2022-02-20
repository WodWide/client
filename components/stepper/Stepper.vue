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
    <component :is="steps[currentStep].component" class="my-12" />
    <div class="stepper__footer flex px-4 pb-2">
      <div class="stepper__footer--previous flex-1">
        <BaseButton
          :class="{ 'stepper__button--disabled': isButtonDisabled }"
          @click.native="decreaseStep"
        >
          Previous
        </BaseButton>
      </div>
      <div class="stepper__fotter--next">
        <BaseButton @click.native="increaseStep">
          {{ isLastStep ? "Finish" : "Next" }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "../common/BaseButton.vue";
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
    BaseButton,
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
      this.isLastStep ? this.submitForm() : (this.currentStep += 1);
    },
    decreaseStep() {
      this.currentStep -= 1;
    },
    submitForm() {
      console.log("test");
      this.$emit("submit");
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
<style lang="scss">
.stepper {
  &__button {
    &--disabled {
      @apply pointer-events-none rounded-lg opacity-25;
    }
  }
}
</style>
