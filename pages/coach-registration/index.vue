<template>
  <div class="flex flex-col h-full">
    <SideNavbar />
    <vue-tabs
      active-tab-color="black"
      active-text-color="white"
      type="tabs"
      centered
    >
      <v-tab v-for="tab in tabs" :key="tab.id" :title="tab.title">
        <component :is="tab.id" />
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import encrypt from "@/mixins/encrypt";
import SideNavbar from "@/components/common/SideNavbar.vue";
import JoinGym from "@/components/coachRegistration/JoinGym.vue";
import CreateGym from "@/components/coachRegistration/CreateGym.vue";

const TABS = [
  {
    id: "JoinGym",
    title: "Join in existing gym",
  },
  { id: "CreateGym", title: "Create new gym" },
];
export default Vue.extend({
  name: "Signup",
  components: {
    CreateGym,
    SideNavbar,
    JoinGym,
  },
  mixins: [encrypt],
  data() {
    return {
      error: "",
      tabs: TABS,
    };
  },
  head() {
    return {
      title: "coach-registration",
      meta: [
        {
          hid: "coach-registration-page",
          name: "coach-registration",
          content:
            "Coach-registration page for WOD WIDE. Join to start your journey as a cross-training coach",
        },
      ],
    };
  },
});
</script>
<style lang="scss">
.vue-tabs {
  overflow-y: auto;
}
@media only screen and (max-width: 992px) {
  .vue-tabs {
    margin-top: 11%;
  }
}
.nav-tabs-navigation {
  margin: 4% 25%;
}
</style>
