<template>
  <div class="card-back relative">
    <div class="card-back__container">
      <div class="card-back__header pb-2">
        <button type="button" class="flex items-center ml-auto" @click="cancel">
          <span class="card-back__cancel-text">Cancel</span>
          <font-awesome-icon
            class="card-back__cancel-icon ml-1"
            :icon="['fas', 'times']"
          />
        </button>
      </div>
      <div class="card-back__body">
        <div v-if="gym.name">
          <span class="font-bold">Name:</span>
          {{ gym.name }}
        </div>
        <div v-if="gym.country">
          <span class="font-bold">Country:</span>
          {{ gym.country }}
        </div>
        <div v-if="gym.address">
          <span class="font-bold">Address:</span>
          {{ gym.address }}
        </div>
        <div v-if="gym.phone">
          <span class="font-bold">Phone:</span>
          {{ gym.phone }}
        </div>
        <div v-if="gym.email">
          <span class="font-bold">Email:</span>
          {{ gym.email }}
        </div>
        <template v-if="gym.members">
          <div v-if="gym.members.length > 0">
            <span class="font-bold">Members:</span>
            {{ gym.members.length }}
          </div>
        </template>
        <div v-if="gym.website">
          <span class="font-bold">Website:</span>
          <a class="underline" :href="gym.website">{{ gym.website }}</a>
        </div>
      </div>
      <div class="card-back__footer flex justify-center py-2">
        <BaseButton @click.native="joinGym">{{ buttonAction }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/common/BaseButton.vue";
export default {
  name: "CardBack",
  components: { BaseButton },
  props: {
    gym: {
      type: Object,
      required: true,
    },
    buttonAction: {
      type: String,
      required: true,
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    joinGym() {
      this.$emit("joinGym", this.gym);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-back {
  color: black;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13),
    1px 1px 5px 2px rgba(0, 1, 1, 0.28);
  //background: linear-gradient(
  //    180deg,
  //    rgba(249, 251, 252, 0.91) 20%,
  //    rgba(222, 214, 214, 0) 99.99%,
  //    rgba(249, 251, 252, 0.91) 100%
  //  ),
  //  #ece6e6;
  border-radius: 1em;
  padding: 0 1em 0.5em;
  &__container {
  }
  &__body {
    border: solid 1px;
    border-radius: 1em;
    padding: 1em;
  }
}
</style>
