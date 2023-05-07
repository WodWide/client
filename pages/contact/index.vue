<template>
  <div class="contact-page h-full">
    <nuxt-link to="/">
      <img src="/logo.png" alt="wod wide logo" class="w-24" />
    </nuxt-link>
    <div class="h-5/6 flex flex-col justify-center sm:px-6">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form>
            <div class="mt-6">
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div class="mt-1">
                <input
                  id="subject"
                  v-model="subject"
                  name="subject"
                  type="text"
                  autocomplete="subject"
                  class="py-2 px-3 block w-full shadow rounded-md"
                />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="message"
                class="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <div class="mt-1">
                <textarea
                  id="message"
                  v-model="message"
                  name="message"
                  rows="4"
                  class="py-2 px-3 block w-full shadow rounded-md"
                ></textarea>
              </div>
            </div>

            <div class="mt-6">
              <BaseButton @click.native="submitEmail">Submit</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
export default Vue.extend({
  components: { BaseButton },
  data() {
    return {
      subject: "",
      message: "",
    };
  },
  head() {
    return {
      title: "Contact",
      meta: [
        {
          hid: "contact-page",
          name: "contact page",
          content: "This is the contact page of the WodWide application.",
        },
      ],
    };
  },
  methods: {
    submitEmail() {
      window.open(
        `mailto:giapagiupa@gmail.com?subject=${this.subject}&body=${this.message}`
      );
    },
  },
});
</script>
<style lang="scss">
.contact-page {
  background: url("/login-icons.svg") no-repeat center center fixed;
  background-size: cover;
}
</style>
