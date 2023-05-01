<template>
  <div class="gym-details">
    <div class="gym-details__left">
      <h1 class="font-bold">Details</h1>
      <hr class="gym-details--line" />
      <h1 v-if="gym.name" class="mb-3">
        <span class="font-bold"> Name: </span>{{ gym.name }}
      </h1>
      <h1 v-if="gym.country" class="mb-3">
        <span class="font-bold"> Country: </span>
        {{ gym.country }}
      </h1>
      <h1 v-if="gym.address" class="mb-3">
        <span class="font-bold"> Address: </span>{{ gym.address }}
      </h1>
      <h1 v-if="gym.phone" class="mb-3">
        <span class="font-bold"> Phone: </span> {{ gym.phone }}
      </h1>
      <h1 v-if="gym.email" class="mb-3">
        <span class="font-bold"> Email: </span> {{ gym.email }}
      </h1>
      <h1 v-if="gym.website" class="mb-3">
        <span class="font-bold"> Website: </span>
        <a :href="gym.website" class="underline">{{ gym.website }} </a>
      </h1>
    </div>
    <div class="gym-details__wod">
      <h1 class="font-bold">WOD</h1>
      <hr class="gym-details--line m-auto" />
      <template v-if="Object.keys(wod).length !== 0">
        {{ wod.date }}
        <div v-html="$md.render(wod.description)"></div>
      </template>
      <EditWod
        v-if="isCoach || isOwner"
        v-model="wod"
        :gym-name="gym.name"
        :button-text="buttonText"
      />
    </div>
    <div class="gym-details__right">
      <h1 class="font-bold">Staff</h1>
      <hr class="gym-details--line m-auto" />
      <h1 v-if="gym.members" class="mb-3">
        <span class="font-bold"> Members: </span>
        {{ gym.members.length }}
      </h1>
      <h1 v-if="gym.owner" class="mb-3">
        <span class="font-bold"> Owner: </span>
        {{ gym.owner.firstName }} {{ gym.owner.lastName }}
      </h1>
      <div v-if="gym.trainers.length > 0">
        <h1 class="font-bold">Trainers:</h1>
        <h1 v-for="(trainer, index) in gym.trainers" :key="index">
          {{ trainer.firstName }} {{ trainer.lastName }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditWod from "~/components/EditWod.vue";

export default Vue.extend({
  components: { EditWod },
  props: {
    gym: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      wod: {
        date: "",
        description: "",
      },
      buttonText: "Create WOD",
    };
  },
  computed: {
    isMobile(): boolean {
      return this.$breakpoints.sMd;
    },
    getUser(): any {
      return this.$store.getters["user/user"];
    },
    isCoach(): any {
      return this.getUser.isTrainer;
    },
    isOwner(): any {
      return this.getUser.isOwner;
    },
  },
  watch: {
    wod: {
      handler(newValue) {
        if (newValue !== "") {
          this.buttonText = "Update WOD";
        } else {
          this.buttonText = "Create WOD";
        }
      },
    },
  },
  created() {
    this.fetchWod();
  },
  methods: {
    async fetchWod() {
      await this.$fire.firestore
        .collection("gyms")
        .where("name", "==", this.gym.name)
        .get()
        .then((querySnapshot) => {
          const wod = querySnapshot.docs[0].data().wod;
          if (Object.keys(wod).length !== 0) {
            this.wod = wod;
          }
        })
        .catch((error) => {
          this.$toast.show({
            type: "error",
            title: "Error",
            message: error.message,
          });
        });
    },
  },
});
</script>
<style lang="scss">
.gym-details {
  display: flex;
  margin-top: 4em;
  padding: 2em;
  border: 2px solid black;
  border-radius: 2em;
  @screen lg {
    margin-left: 7em;
  }
  &__left {
    @apply w-1/3;
  }
  &__wod {
    @apply w-1/3 text-center;
  }
  &__right {
    @apply w-1/3 text-center;
  }
  &--line {
    @apply mb-5 w-1/6;
    border-bottom: 1px solid;
  }
  .te-preview {
    width: auto !important;
  }
}
</style>
