<template>
  <div class="flex flex-col h-full">
    <SideNavbar />
    <div class="lg:text-2xl flex items-center flex-col">
      <div class="text-4xl mt-16">
        <b> Video submission</b>
      </div>
    </div>
    <div class="flex items-center justify-center my-auto">
      <div class="bg-white shadow-2xl rounded-lg md:w-1/2 justify-around p-8">
        <p class="p-3 border-2 rounded-lg shadow-md">
          Welcome to the video submission page, where you can choose one or
          multiple exercises to submit your video for evaluation by an AI. We
          offer a variety of exercises for you to select from. Once you've made
          your selection, simply upload your video, and our AI system will
          assess it.
        </p>
        <WodType
          v-model="wodType"
          @update:wodType="(newValue) => (wodType = newValue)"
        />
        <Exercises
          v-for="index in exercises"
          :key="index"
          v-model="exerciseList"
          :exercise-list="exerciseList"
          :index="index"
          :is-reps-enabled="isCountRepsSelected"
          @update:exerciseList="(newValue) => (exerciseList = newValue)"
        />
        <div class="flex items-center py-4">
          <template v-if="exercises < 10 && isCountRepsSelected">
            <button @click="addComponent">
              <font-awesome-icon
                class="text-4xl mr-2"
                :icon="['fas', 'plus-circle']"
              />
            </button>
            <span> add exercise</span>
          </template>

          <div class="ml-auto">
            <span>Total time cap: </span>
            <input
              v-model="timeCap"
              placeholder="Time..."
              class="p-1 rounded-lg border-2 min-w-0 w-20"
              type="number"
            />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="relative mr-4">
            <input
              ref="videoFile"
              type="file"
              class="FileUpload"
              accept=".mp4"
              @change="onFileChange"
            />
            <div class="dropZoneOverlay">
              <template v-if="!fileName">
                <font-awesome-icon :icon="['fas', 'upload']" />
                Drag and drop your video <br />or<br />Click to add
              </template>
              <template v-else>
                <font-awesome-icon :icon="['fas', 'check']" />
                {{ fileName }}
              </template>
            </div>
          </div>
          <font-awesome-icon
            v-if="loading"
            class="text-2xl"
            :icon="['fas', 'spinner']"
            spin
          />
          <BaseButton v-else type="submit" @click.native="checkSubmit"
            >Submit</BaseButton
          >
        </div>
      </div>
    </div>
    <Modal v-if="modalVisible" :visible="modalVisible" @close="closeModal">
      <h2 class="font-bold p-4">Results</h2>
      <div class="grid grid-cols-4 items-center justify-between py-2 px-4">
        <div class="mt-8">
          <span class="border-black rounded-md border-2 p-2">Exercise:</span>
          <template v-if="exerciseList.length > 1">
            <span
              v-for="exercise in exerciseList"
              :key="exercise.id"
              class="px-2"
            >
              {{ exercise.name }}
            </span>
          </template>
          <template v-else>
            {{ selectedExercise }}
          </template>
        </div>
        <div class="mt-8">
          <span class="border-black rounded-md border-2 p-2">Time:</span>
          {{ response.time.toFixed(2) }}
        </div>
        <div class="mt-8">
          <span class="border-black rounded-md border-2 p-2">Total reps:</span>
          {{ response.total_reps }}
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SideNavbar from "~/components/common/SideNavbar.vue";
import BaseButton from "~/components/common/BaseButton.vue";
import Exercises from "~/components/common/Exercises.vue";
import WodType from "~/components/common/WodType.vue";
import Modal from "~/components/common/Modal.vue";

export default Vue.extend({
  components: { SideNavbar, BaseButton, Exercises, WodType, Modal },
  data() {
    return {
      loading: false,
      newComp: false,
      exercises: 1,
      fileName: null,
      file: null,
      timeCap: null,
      modalVisible: false,
      wodType: {
        key: "",
        name: "",
      },
      exerciseList: [],
      response: null,
    };
  },
  computed: {
    isCountRepsSelected(): boolean {
      return this.wodType && this.wodType?.key !== "count";
    },
    selectedExercise(): string {
      return (this.exerciseList[0] as any).name || "";
    },
  },
  watch: {
    wodType: {
      handler(newValue) {
        if (newValue.key === "count") {
          this.exercises = 1;
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.modalVisible = false;
    },
    onFileChange(event) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    addComponent() {
      if (this.exercises < 10) this.exercises += 1;
    },
    checkSubmit() {
      if (this.exerciseList.length === 0) {
        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Please select at least one exercise",
        });
      } else if (this.timeCap && parseFloat(this.timeCap) <= 0) {
        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Please define total time cap",
        });
      } else if (!this.fileName) {
        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Please upload a video",
        });
      } else if (this.wodType.key !== "count") this.checkRestTypes();
      else this.submit();
    },
    checkRestTypes() {
      if (this.wodType.key === "") {
        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Please select a type",
        });
      } else if (
        this.wodType.key === "amrap" &&
        (this.wodType as any)?.time <= 0
      ) {
        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Please define time",
        });
      } else if (
        this.wodType.key === "for_time" &&
        (this.wodType as any)?.rounds < 0
      ) {
        this.$toast.show({
          type: "danger",
          title: "Error",
          message: "Please define rounds",
        });
      } else this.submit();
    },
    submit() {
      this.loading = true;
      const formData = new FormData();
      this.file && formData.append("file", this.file);
      formData.append("upload_preset", "yuhpuwao");
      formData.append("cloud_name", "dupnuirra");
      fetch("https://api.cloudinary.com/v1_1/dupnuirra/video/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$toast.show({
              type: "danger",
              title: "Error",
              message: data.error.message,
            });
            this.loading = false;
          } else {
            this.aiRequest(data.url);
          }
        })
        .catch((error) =>
          this.$toast.show({
            type: "danger",
            title: "Error",
            message: error.message,
          })
        );
    },
    aiRequest(url) {
      let body = this.buildBody();
      body = { ...body, video_source: url };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const endpoint = this.wodType.key === "count" ? "count" : "wod";
      fetch(`http://127.0.0.1:8000/${endpoint}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code) {
            this.modalVisible = true;
            this.response = data;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$toast.show({
            type: "danger",
            title: "Error",
            message: error,
          });
          this.loading = false;
        });
    },
    buildBody() {
      let body = {};
      if (this.wodType.key === "count") {
        body = {
          exercise: (this.exerciseList[0] as any).name,
          total_time: this.timeCap && parseFloat(this.timeCap),
        };
      } else {
        body = {
          type: this.wodType.key,
          ...((this.wodType.key === "amrap" && {
            time: (this.wodType as any).time,
          }) ||
            (this.wodType.key === "for_time" && {
              rounds: (this.wodType as any).rounds,
            }) ||
            {}),
          total_time: this.timeCap && parseFloat(this.timeCap),
          exercises: this.exerciseList,
        };
      }
      return body;
    },
  },
});
</script>
<style lang="scss">
.dropZoneOverlay,
.FileUpload {
  width: 283px;
  height: 80px;
  cursor: pointer;
}

.dropZoneOverlay {
  @apply rounded-md text-black absolute border-solid border-2 border-black;
  top: 0px;
  text-align: center;
}

.FileUpload {
  opacity: 0;
  position: relative;
  z-index: 1;
}
</style>
