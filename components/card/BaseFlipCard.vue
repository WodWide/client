<template>
  <div class="flip-card">
    <transition
      :name="
        flipped ? 'np:flip-card-transition' : 'np:flip-card-transition-reversed'
      "
      mode="out-in"
    >
      <div v-if="!flipped" key="front" class="flip-card__card">
        <slot name="front" :flip="handleFlip" />
      </div>
      <div v-else key="back" class="flip-card__card">
        <slot name="back" :flip="handleFlip" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BaseFlipCard",
  data() {
    return {
      flipped: false,
    };
  },
  methods: {
    handleFlip() {
      this.flipped = !this.flipped;
    },
  },
};
</script>

<style lang="scss" scoped>
.flip-card {
  perspective: 1000px;
  transform-style: preserve-3d;
  display: inline-block;
  &__card {
    backface-visibility: hidden;
    transform: rotateY(0deg);
  }
}
.np\:flip-card-transition {
  &-enter-active,
  &-reversed-enter-active {
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
  &-leave-active,
  &-reversed-leave-active {
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
  }
  &-enter &-reversed-leave-to {
    transform: rotateY(-90deg);
  }
  &-leave-to,
  &-reversed-enter {
    transform: rotateY(90deg);
  }
}
</style>
