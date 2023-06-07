<template>
  <div class="h-full">
    <SideNavbar />
    <div class="flex items-center justify-center h-full">
      <BaseButton theme="red" @click.native="deleteAccount"
        >Delete account
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SideNavbar from "~/components/common/SideNavbar.vue";
import BaseButton from "~/components/common/BaseButton.vue";
export default Vue.extend({
  components: { SideNavbar, BaseButton },
  head() {
    return {
      title: "Settings",
      meta: [
        {
          hid: "settings-page",
          name: "settings page",
          content: "This is the settings page of the user.",
        },
      ],
    };
  },
  methods: {
    deleteAccount() {
      this.$fire.firestore
        .collection("users")
        .where("email", "==", this.$store.getters["user/user"].email)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef.delete();
        })
        .catch((error) => {
          this.$toast.show({
            type: "danger",
            title: "Error",
            message: error.message,
          });
        });
      this.$fire.auth.currentUser?.delete();
      this.$store.dispatch("user/resetData");
      this.$router.push("/");
    },
  },
});
</script>
<style lang="scss"></style>
