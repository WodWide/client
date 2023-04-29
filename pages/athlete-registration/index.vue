<template>
  <div class="flex flex-col h-full">
    <SideNavbar />
    <div class="athlete-registration mt-8">
      <h2 class="athlete-registration__heading px-8 pt-2">
        Start your journey as a cross-training athlete
      </h2>
      <div class="mb-1 w-full items-center flex flex-col">
        <form class="mb-8 relative" @submit.prevent="handleInput">
          <input
            v-model="searchTerm"
            class="athlete-registration__input"
            type="text"
            placeholder="Search here..."
          />
        </form>
      </div>
      <template v-if="isResult">
        <div
          class="w-9/12 m-4 grid gap-5 grid-cols-1 xl:grid-cols-4 sm:grid-cols-3"
        >
          <BaseCard
            v-for="(gym, index) in filteredGyms"
            :key="index"
            :gym="gym"
            button-action="Join as a member"
            @joinGym="joinGym"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "~/components/card/BaseCard.vue";
import SideNavbar from "@/components/common/SideNavbar.vue";
export default Vue.extend({
  components: {
    BaseCard,
    SideNavbar,
  },
  data(): {
    gyms: any;
    searchTerm: string;
    selectedGym: object | null;
    isResult: boolean;
    error: string;
    trainerData: object;
  } {
    return {
      gyms: [],
      searchTerm: "",
      selectedGym: null,
      isResult: false,
      error: "",
      trainerData: () => {},
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
    joinGym(selectedGym) {
      this.trainerData = {
        isAthlete: true,
        gym: selectedGym.name,
      };
      this.updateGym(selectedGym.name);
    },
    async updateGym(gymName) {
      await this.$fire.firestore
        .collection("gyms")
        .where("name", "==", gymName)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef.get().then((doc) => {
            const trainers = doc.data()?.trainers.filter((trainer) => {
              return trainer.email === this.getUser.email;
            });
            const members = doc.data()?.members?.filter((member) => {
              return member.email === this.getUser.email;
            });
            const isOwner = doc.data()?.owner?.email === this.getUser.email;
            if (trainers.length === 0 && !isOwner && members.length === 0) {
              members.push({
                email: this.getUser.email,
                firstName: this.getUser.firstName,
                lastName: this.getUser.lastName,
              });
              docRef
                .update({
                  members,
                })
                .then(() => {
                  this.updateTrainer();
                });
            } else {
              this.$toast.show({
                type: "error",
                title: "Error",
                message: "You are already a member of this gym",
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
    async updateTrainer() {
      await this.$fire.firestore
        .collection("users")
        .where("email", "==", this.getUser.email)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef.update(this.trainerData).then(() => {
            this.joinedSuccessfully();
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
    joinedSuccessfully() {
      this.$toast.show({
        type: "success",
        title: "Success",
        message: "You have successfully joined the gym",
      });
      setTimeout(() => {
        this.$router.push("/dashboard");
      }, 1000);
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
.athlete-registration {
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
