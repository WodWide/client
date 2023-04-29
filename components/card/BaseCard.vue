<template>
  <div class="card flex justify-center items-center">
    <BaseFlipCard>
      <template #front="{ flip }">
        <CardFront :title="gym.name" @click="flip && flip()" />
      </template>
      <template #back="{ flip }">
        <CardBack
          :gym="gym"
          :buttonAction="buttonAction"
          @click="flip && flip()"
          @joinGym="joinGym(gym)"
          @cancel="handleCancel({ callbackFlip: flip })"
        />
      </template>
    </BaseFlipCard>
  </div>
</template>

<script>
import BaseFlipCard from "~/components/card/BaseFlipCard.vue";
import CardFront from "~/components/card/CardFront.vue";
import CardBack from "~/components/card/CardBack.vue";

export default {
  name: "BaseCard",
  components: { BaseFlipCard, CardFront, CardBack },
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
    joinGym(gym) {
      this.$emit("joinGym", gym);
    },
    handleCancel({ callbackFlip: flip }) {
      flip && flip();
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped></style>
