<template>
  <div class="chat-of-day flex items-end flex-col">
    <div
      v-show="isChatOpen"
      ref="chatContainer"
      class="chat-of-day__container flex flex-col justify-between bg-white rounded-lg p-4 drop-shadow-2xl mb-2"
    >
      <div class="flex items-center justify-center text-2xl font-bold mb-2">
        Chat Of The Day
      </div>
      <div ref="chatMessages" class="chat-of-day__messages overflow-auto">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex flex-col mb-4 w-4/5 px-2 py-1 rounded-lg"
          :class="
            isUsersChatMessage(message)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300'
          "
        >
          <div class="flex items-center">
            <font-awesome-icon
              class="w-8 h-8 rounded-full mr-2"
              :icon="['far', 'user']"
            />
            <div class="font-semibold">
              {{ message.sender }}
            </div>
          </div>
          <div>
            {{ message.message }}
          </div>
        </div>
      </div>
      <div class="chat-of-day__input">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message here..."
        />
        <button type="submit" @click="sendMessage">Send</button>
      </div>
    </div>
    <div
      class="chat-of-day__button rounded-full bg-white drop-shadow-2xl flex items-center justify-center cursor-pointer"
      @click="isChatOpen = !isChatOpen"
    >
      <font-awesome-icon :icon="['far', 'comment']" class="chat-of-day__icon" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import PerfectScrollbar from "perfect-scrollbar";

export default Vue.extend({
  components: {},
  data() {
    return {
      messages: [],
      newMessage: "",
      isChatOpen: false,
      ps: null,
    };
  },
  created() {
    const ref = this.$fire.database.ref(this.$store.state.user.user.gym);
    // @ts-ignore
    ref.on("child_added", (snapshot) => this.messages.push(snapshot.val()));
  },
  mounted() {
    // @ts-ignore
    this.ps = new PerfectScrollbar(this.$refs.chatContainer);
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
      const database = this.$fire.database;
      const ref = database.ref(this.$store.state.user.user.gym);
      const newMessage = {
        sender: this.$store.state.user.user.username,
        email: this.$store.state.user.user.email,
        message: this.newMessage,
      };
      await ref.push(newMessage).catch((error) => console.error(error));
      this.newMessage = "";
      this.$nextTick(() => {
        // @ts-ignore
        this.ps.update();
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages;
      // @ts-ignore
      chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    isUsersChatMessage(message) {
      return message.email === this.$store.state.user.user.email;
    },
  },
});
</script>
<style lang="scss" scoped>
.chat-of-day {
  position: fixed;
  bottom: 2.5em;
  right: 2.5em;
  z-index: 999;
  &__container {
    width: 20em;
    height: 25em;
  }
  &__scroll {
    height: 100%;
    position: relative;
    margin: auto;
  }
  &__button {
    width: 5em;
    height: 5em;
  }
  &__input {
    display: flex;
    align-items: center;
    border: 0.125em solid #ccc;
    border-radius: 0.5em;
    padding: 0.5em;
    input[type="text"] {
      flex: 1;
      border: none;
      outline: none;
      margin-right: 0.25em;
    }
    button[type="submit"] {
      border: none;
      background-color: #007bff;
      color: #fff;
      padding: 0.625em 0.938em;
      border-radius: 0.5em;
      cursor: pointer;
      &:hover {
        background-color: #0069d9;
      }
    }
  }
  &__messages {
    min-height: 16em;
  }
  &__icon {
    font-size: 2.5em;
  }
}
</style>
