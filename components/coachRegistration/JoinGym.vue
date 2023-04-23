<template>
  <div class="join-gym-tab">
    <h2 class="join-gym-tab__heading">Select gym</h2>
    <div class="mb-1 w-full items-center flex flex-col">
      <form class="mb-8 relative" @submit.prevent="handleInput">
        <input
          v-model="searchTerm"
          class="join-gym-tab__input"
          type="text"
          placeholder="Search here..."
        />
      </form>
    </div>
    <template v-if="isResult">
      <div class="m-4 grid gap-5 grid-cols-1 xl:grid-cols-4 sm:grid-cols-3">
        <BaseCard
          v-for="(gym, index) in filteredGyms"
          :key="index"
          :gym="gym"
          @joinGym="joinGym"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "~/components/card/BaseCard.vue";
export default Vue.extend({
  components: {
    BaseCard,
  },
  data(): {
    gyms: any;
    searchTerm: string;
    selectedGym: object | null;
    isResult: boolean;
    error: string;
  } {
    return {
      gyms: [],
      searchTerm: "",
      selectedGym: null,
      isResult: false,
      error: "",
    };
  },
  computed: {
    getUser(): any {
      return this.$store.getters["user/user"];
    },
    filteredGyms(): any {
      return this.gyms?.filter((gym) => {
        const regex = new RegExp(this.searchTerm, "i");
        return (
          gym.name?.match(regex) ||
          gym.country?.match(regex) ||
          gym.phone?.toString().match(regex)
        );
      });
    },
  },
  mounted() {
    this.fetchGyms();
  },
  methods: {
    async joinGym(selectedGym) {
      const trainerData = {
        isTrainer: true,
        gym: selectedGym.name,
      };
      await this.$fire.firestore
        .collection("users")
        .where("email", "==", this.getUser.email)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef.update(trainerData);
          this.updateGym(selectedGym.name);
        })
        .catch((error) => {
          this.$toast.show({
            type: "error",
            title: "Error",
            message: error.message,
          });
        });
    },
    async updateGym(gymName) {
      await this.$fire.firestore
        .collection("gyms")
        .where("name", "==", gymName)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef.get().then((doc) => {
            const trainers = doc.data()?.trainers;
            const newTrainer = trainers.forEach((trainer) => {
              if (trainer === this.getUser.email) {
                this.$toast.show({
                  type: "error",
                  title: "Error",
                  message: "You are already a member of this gym",
                });
                return false;
              }
            });
            if (newTrainer) {
              trainers.push(this.getUser.email);
              docRef
                .update({
                  trainers,
                })
                .then(() => {
                  this.$toast.show({
                    type: "success",
                    title: "Success",
                    message: "You have successfully joined the gym",
                  });
                  setTimeout(() => {
                    this.$router.push("/dashboard");
                  }, 1000);
                });
            }
          });
        })
        .catch((error) => {
          this.$toast.show({
            type: "error",
            title: "Error",
            message: error.message,
          });
        });
    },
    removeSearchQuery(): void {
      this.searchTerm = "";
    },
    handleInput() {
      // Debounce the search input to reduce the number of requests
      setTimeout(() => {
        this.fetchGyms();
      }, 500);
    },
    async fetchGyms(): Promise<void> {
      try {
        const snapshot = await this.$fire.firestore.collection("gyms").get();
        this.gyms = snapshot.docs.map((doc) => doc.data());
        this.isResult = true;
      } catch (error) {
        this.$toast.show({
          type: "error",
          title: "Error",
          message: error,
        });
      }
    },
  },
});
</script>
<style lang="scss">
.join-gym-tab {
  color: #555;
  height: 100%;
  overflow-x: hidden;
  @apply flex flex-col items-center w-full h-full;

  &__heading {
    font-size: 2.5em;
    color: black;
    margin-bottom: 1em;
  }
  &__input {
    @apply p-2 rounded-lg border-2 flex-grow min-w-0 w-full border-black;
  }
}
</style>
