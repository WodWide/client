<template>
  <div class="h-full">
    <div class="h-full">
      <SideNavbar />
      <div
        class="flex items-center justify-center mx-auto py-6 sm:px-6 lg:px-8"
      >
        <div class="w-full md:w-1/2 bg-white shadow-xl sm:rounded-lg">
          <div class="p-6">
            <h1 class="text-2xl font-bold mb-4">Account Information</h1>
            <div
              v-for="key in Object.keys(user)"
              :key="key"
              class="mb-4 grid grid-rows-2"
            >
              <label class="font-bold w-200 mb-2"
                >{{ camelcaseToReadable(key) }}
              </label>
              <input
                v-model="user[key]"
                :disabled="isInputDisabled(key)"
                :class="{ 'bg-gray-300': isInputDisabled(key) }"
                type="text"
                class="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="updateAccount"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SideNavbar from "@/components/common/SideNavbar.vue";

export default Vue.extend({
  components: { SideNavbar },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        age: "",
        height: "",
        weight: "",
      },
    };
  },
  computed: {
    getUser(): any {
      return this.$store.getters["user/user"];
    },
  },
  created() {
    this.user = { ...this.getUser };
  },
  methods: {
    isInputDisabled(key) {
      return key === "email";
    },
    camelcaseToReadable(str: string) {
      return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },
    async updateAccount() {
      const user = await this.$fire.firestore
        .collection("users")
        .where("email", "==", this.getUser.email)
        .get();
      const update = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        email: this.user.email,
        age: this.user.age,
        height: this.user.height,
        weight: this.user.weight,
      };

      await this.$fire.firestore
        .collection("users")
        .doc(user.docs[0].id)
        .update(update);
      await this.$store.dispatch("user/setUser", update);
      this.$toast.show({
        type: "success",
        title: "Success",
        message: "Your information has been updated",
      });
    },
  },
});
</script>
