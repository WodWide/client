<template>
  <div class="leaderboard-page md:h-full">
    <SideNavbar />

    <div
      class="leaderboard-page__body h-full flex flex-col items-center mx-4 xl:justify-start"
    >
      <font-awesome-icon
        v-if="loading"
        class="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        :icon="['fas', 'spinner']"
        spin
      />
      <template v-else>
        <div class="lg:text-2xl flex items-center flex-col">
          <div class="text-4xl mt-16">
            <b>{{ userGym }} Leaderboard</b>
          </div>
        </div>
        <div
          class="leaderboard-page__body-cards shadow-lg rounded-lg p-8 text-lg lg:text-2xl mt-4 lg:mt-24 w-full lg:w-1/2"
        >
          <div class="flex justify-center mb-10 italic">
            WOD {{ currentWodDate }}
          </div>
          <div
            v-if="currentWod && currentWod.toString()"
            class="text-center"
            v-html="$md.render(currentWod)"
          ></div>
          <template v-if="leaderboardItems && leaderboardItems.length > 0">
            <div class="flex flex-col space-y-4 mt-10 max-w-lg mx-auto">
              <div
                class="flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg"
              >
                <span class="font-medium">Rank</span>
                <span class="font-medium">Name</span>
                <span class="font-medium">Time</span>
                <span class="font-medium">Description</span>
              </div>
              <div
                v-for="(item, index) in leaderboardItems"
                :key="index"
                class="grid grid-cols-4 items-center justify-between bg-white py-2 px-4 rounded-lg"
              >
                <span>{{ getRankEmoji(index) }}</span>
                <span>{{ item.user.username }}</span>
                <span>{{ item.score }}'</span>
                <span>{{ item.description }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-center">No entries yet</div>
          </template>

          <BaseButton
            v-if="!submited && currentWod !== ''"
            class="fixed bottom-10 right-10 text-white text-base"
            @click.native="openModal"
          >
            <span>
              <font-awesome-icon
                id="font-awesome-icon"
                :icon="['fas', 'plus']"
                class="text-2xl"
              />
              Add your time
            </span>
          </BaseButton>
          <Modal
            v-if="modalVisible"
            :visible="modalVisible"
            @close="closeModal"
          >
            <h2 class="font-bold p-4">Add your time in minutes</h2>
            <div class="w-56 m-auto text-center text-base">
              <form @submit.prevent="submit">
                <input
                  v-model="entryData.score"
                  type="number"
                  step="0.01"
                  class="leaderboard-page__input"
                  placeholder="Time"
                />
                <textarea
                  v-model="entryData.description"
                  class="leaderboard-page__input mt-4"
                  placeholder="Description(optional)"
                />
                <BaseButton class="mt-4" type="submit">Submit</BaseButton>
              </form>
            </div>
          </Modal>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "~/components/common/Modal.vue";
import BaseButton from "~/components/common/BaseButton.vue";
import SideNavbar from "@/components/common/SideNavbar.vue";

export default Vue.extend({
  components: {
    Modal,
    BaseButton,
    SideNavbar,
  },
  data() {
    return {
      error: "",
      gymDetails: {},
      entryData: {
        score: null,
        description: "",
        user: {
          username: "",
          email: "",
        },
      },
      modalVisible: false,
      loading: true,
      submited: false,
    };
  },
  head() {
    return {
      title: "Leaderboard",
      meta: [
        {
          hid: "leaderboard-page",
          name: "leaderboard page",
          content: "This is the leaderboard page of the WodWide application.",
        },
      ],
    };
  },
  computed: {
    isMobile(): boolean {
      return this.$breakpoints.sMd;
    },
    getUser(): any {
      return this.$store.getters["user/user"];
    },
    userGym(): string {
      return this.$store.getters["user/user"]?.gym;
    },
    leaderboard(): any {
      return this.$store.getters["leaderboard/leaderboard"];
    },
    leaderboardItems(): any {
      const leaderboard =
        this.$store.getters["leaderboard/leaderboard"]?.items?.slice() || [];
      if (this.submited) {
        leaderboard.push(this.entryData);
      }
      leaderboard.sort((a, b) => a.score - b.score);
      return leaderboard;
    },
    currentWod(): string {
      return (this.gymDetails as any)?.wod?.description ?? "";
    },
    currentWodDate(): string {
      return (this.gymDetails as any)?.wod?.date ?? "";
    },
  },
  async created() {
    this.gymDetails = (await this.getUserGym()) ?? {};
    this.getLeaderboard();
    this.loading = false;
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    getRankEmoji(index: number): string {
      if (index === 0) {
        return "🥇";
      } else if (index === 1) {
        return "🥈";
      } else if (index === 2) {
        return "🥉";
      } else {
        return index + 1 + "";
      }
    },
    getUserGym() {
      if (!this.userGym) {
        return;
      }
      return this.$fire.firestore
        .collection("gyms")
        .where("name", "==", this.userGym)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const gymDoc = querySnapshot.docs[0];
            const gymDetails = gymDoc.data();
            return gymDetails;
          } else {
            this.setError("Error: Gym does not exist");
          }
        })
        .catch((err) => {
          this.setError("Error: " + err.message);
        });
    },
    getLeaderboard() {
      if (!this.userGym) {
        return;
      }
      return this.$fire.firestore
        .collection("leaderboard")
        .where("gym", "==", this.userGym)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const leaderboardDoc = querySnapshot.docs[0];
            const leaderboardDetails = leaderboardDoc.data();
            const leaderboardId = leaderboardDoc.id;
            this.setLeaderboard({ ...leaderboardDetails, id: leaderboardId });
          } else {
            this.setError("Error: Leaderboard does not exist");
          }
        })
        .catch((err) => {
          this.setError("Error: " + err.message);
        });
    },
    setLeaderboard(leaderboard: any) {
      this.$store.dispatch("leaderboard/setLeaderboard", leaderboard);
    },
    setError(error: string) {
      this.$toast.show({
        type: "danger",
        title: "Error",
        message: error,
      });
    },
    submit(): void {
      if (!this.entryData.score) {
        this.setError("Please enter a time");
        return;
      }
      this.submited = false;
      const user = this.getUser;
      this.entryData.user = {
        username: user.username,
        email: user.email,
      };
      (this.entryData as any).score = parseFloat(this.entryData.score);
      this.createLeaderboardEntry();
      this.modalVisible = false;
    },
    createLeaderboardEntry() {
      if (!this.leaderboard.id) {
        return;
      }
      this.$fire.firestore
        .collection("leaderboard")
        .doc(this.leaderboard.id)
        .get()
        .then((querySnapshot) => {
          const items = querySnapshot.get("items");
          items.push(this.entryData);
          querySnapshot.ref.update({ items }).then(() => {
            this.$toast.show({
              type: "success",
              title: "Success",
              message: "Successfully added entry",
            });
            this.submited = true;
          });
        })
        .catch((error) => {
          this.$toast.show({
            type: "danger",
            title: "Error",
            message: error.message,
          });
        });
    },
  },
});
</script>
<style lang="scss">
.leaderboard-page {
  &__input {
    @apply p-2 rounded-lg border-2 flex-grow min-w-0 w-full border-gray-600;
  }
}
</style>
