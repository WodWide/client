<template>
  <div>
    <BaseButton
      class="mt-4"
      theme="blank"
      :bordered="true"
      @click.native="openModal"
    >
      <span class="text-black">{{ buttonText }} </span>
      <font-awesome-icon
        id="font-awesome-icon"
        :icon="['fas', 'edit']"
        class="ml-1 text-gray-700"
      />
    </BaseButton>
    <Modal v-if="modalVisible" :visible="modalVisible" @close="closeModal">
      <h2 class="font-bold p-4">WOD</h2>
      <div>
        <TuiEditor
          v-model="content"
          mode="markdown"
          preview-style="vertical"
          height="300px"
          width="fit-content"
        />
        <form @submit.prevent="submitForm">
          <BaseButton class="mt-4" type="submit">Submit</BaseButton>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
import Modal from "~/components/common/Modal.vue";
import BaseButton from "~/components/common/BaseButton.vue";

export default {
  components: {
    Modal,
    BaseButton,
  },
  props: {
    gymName: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modalVisible: false,
      content: "",
    };
  },
  computed: {
    sanitizedHTML() {
      return DOMPurify.sanitize(this.content);
    },
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    submitForm() {
      this.sanitizedHTML !== ""
        ? this.updateWod()
        : this.$toast.show({
            type: "danger",
            title: "Error",
            message: "WOD cannot be empty",
          });
    },
    async updateWod() {
      const myDate = new Date();
      const month = myDate.getMonth() + 1;
      const day = myDate.getDate();
      const year = myDate.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      const wod = {
        description: this.sanitizedHTML,
        date: formattedDate,
      };
      await this.$fire.firestore
        .collection("gyms")
        .where("name", "==", this.gymName)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef
            .update({
              wod,
            })
            .then(() => {
              this.$emit("input", wod);
              this.closeModal();
              this.$toast.show({
                type: "success",
                title: "Success",
                message: "WOD updated successfully",
              });
            })
            .catch((error) => {
              this.$toast.show({
                type: "danger",
                title: "Error",
                message: error.message,
              });
            });
        });
    },
  },
};
</script>
