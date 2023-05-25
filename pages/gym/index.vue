<template>
  <div class="gym-page h-full">
    <SideNavbar />
    <div class="flex flex-col p-4">
      <div
        class="gym-page__title flex items-center justify-center font-lg text-lg lg:text-3xl self-center w-fit shadow-xl"
        :class="{ 'dashboard-page__title--mobile': isMobile }"
      >
        Gym Page
        <img class="pl-4" src="/gym-icon.svg" alt="gym" />
      </div>
      <div v-if="loading" class="self-center mt-20">
        <font-awesome-icon class="text-2xl" :icon="['fas', 'spinner']" spin />
      </div>
      <template v-else>
        <div
          v-if="!isCoach && !isOwner && !isAthlete"
          class="gym-page__content"
        >
          <p>Do you want to become a coach or an athlete?</p>
          <div class="text-center mt-4">
            <BaseButton class="m-4" @click.native="redirectToCoachPage"
              >Coach</BaseButton
            >
            <BaseButton @click.native="redirectToAthletePage"
              >Athlete</BaseButton
            >
          </div>
        </div>
        <template v-else-if="gym">
          <GymDetails :gym="gym" />
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SideNavbar from "@/components/common/SideNavbar.vue";
import BaseButton from "~/components/common/BaseButton.vue";
import GymDetails from "~/components/GymDetails.vue";
export default Vue.extend({
  components: { SideNavbar, BaseButton, GymDetails },
  data() {
    return {
      gym: null,
      newUser: false,
      user: null,
      loading: true,
    };
  },
  head() {
    return {
      title: "Gym",
      meta: [
        {
          hid: "gym-page",
          name: "Gym page",
          content:
            "Gym of WodWide. This is the page in which athletes and coaches can see information about a gym.",
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
    isCoach(): any {
      return this.getUser.isTrainer;
    },
    isAthlete(): any {
      return this.getUser.isAthlete;
    },
    isOwner(): any {
      return this.getUser.isOwner;
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    redirectToCoachPage() {
      this.$router.push("/coach-registration");
    },
    redirectToAthletePage() {
      this.$router.push("/athlete-registration");
    },
    async fetchGym(gymName: string) {
      await this.$fire.firestore
        .collection("gyms")
        .where("name", "==", gymName)
        .get()
        .then((querySnapshot) => {
          const gym = querySnapshot.docs[0];
          if (gym.exists) this.gym = gym.data();
        })
        .catch((error) => {
          this.$toast.show({
            type: "danger",
            title: "Error",
            message: error.message,
          });
        });
    },
    async fetchUser() {
      await this.$fire.firestore
        .collection("users")
        .where("email", "==", this.getUser.email)
        .get()
        .then((querySnapshot) => {
          const userDoc = querySnapshot.docs[0];
          const gym = userDoc.data().gym;
          if (gym) this.fetchGym(gym);
          this.loading = false;
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
.gym-page {
  &__title {
    z-index: 10;
    background: white;
    padding: 1em;
    border-radius: 1em;
    &--mobile {
      left: 27%;
      width: 60%;
      top: 4em;
      font-size: 0.75em;
    }
  }
  &__content {
    @apply self-center;
    margin-top: 4em;
    padding: 4em;
    border: 2px solid black;
    border-radius: 2em;
  }
  &__details {
    margin-top: 4em;
    margin-left: 7em;
    padding: 2em;
    border: 2px solid black;
    border-radius: 2em;
  }
}
</style>
