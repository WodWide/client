<template>
  <div class="card-front text-white relative text-left overflow-hidden">
    <img class="card-front__image" src="../../static/logo.png" alt="bg" />
    <div class="absolute top-0 left-0 flex flex-col w-full h-full">
      <div class="card-front__header items-start flex">
        <div v-if="title" class="card-front__header-title">{{ title }}</div>
      </div>
      <button
        type="button"
        class="card-front__button text-black font-bold p-2"
        @click="$emit('click')"
      >
        <span class="card-front__button-text">More details ></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardFront",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-front {
  background: linear-gradient(
      180deg,
      rgba(249, 251, 252, 0.91) 20%,
      rgba(222, 214, 214, 0) 99.99%,
      rgba(249, 251, 252, 0.91) 100%
    ),
    #ece6e6;
  font-size: 8px;
  max-width: 240px;
  border-radius: 1.5em;
  box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.2);
  &__image {
    width: 41em;
    height: 160px;
  }
  &__header {
    min-height: 35px;
    &-title {
      font-size: 3em;
      @apply font-bold text-black m-auto;
    }
  }
  &__body {
    line-height: 1.5em;
    margin: 0 1.25em;
  }
  &__button {
    border-radius: 0.5em;
    font-size: 2em;
    margin: auto 0.5em 0.4em 0.5em;
    &:focus {
      outline: 0;
    }
    &-text {
      border-bottom: 1px solid;
    }
  }
}
</style>
