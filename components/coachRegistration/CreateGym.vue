<template>
  <div class="create-gym flex items-center flex-col">
    <div class="text-4xl">Create gym</div>
    <div class="create-gym__body p-2 w-fit mt-12">
      <ValidationObserver v-slot="{ valid }">
        <div class="flex items-center w-full mt-8 my-12">
          <font-awesome-icon
            id="font-awesome-icon"
            :icon="['fas', 'user']"
            class="text-2xl text-gray-700"
          />
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="validation__wrapper"
            vid="name"
            rules="required"
          >
            <input
              v-model="gym.name"
              type="text"
              :class="[
                'create-gym__input',
                errors.length > 0 ? 'border-red-600' : 'border-gray-600',
              ]"
              placeholder="Gym Name"
            />
          </ValidationProvider>
          <div class="flex items-center w-full">
            <font-awesome-icon
              id="font-awesome-icon"
              :icon="['fas', 'phone']"
              class="text-2xl text-gray-700"
            />
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="validation__wrapper"
              vid="phone"
              rules="required"
            >
              <input
                v-model="gym.phone"
                type="text"
                :class="[
                  'create-gym__input',
                  errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                ]"
                placeholder="Phone"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <div class="flex items-center w-full mb-6">
            <font-awesome-icon
              id="font-awesome-icon"
              :icon="['fas', 'map-marker']"
              class="text-2xl text-gray-700"
            />
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="validation__wrapper"
              vid="latitude"
              rules="required"
            >
              <input
                v-model="gym.latitude"
                type="text"
                :class="[
                  'create-gym__input',
                  errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                ]"
                placeholder="Latitude"
              />
            </ValidationProvider>
            <div class="flex items-center w-full">
              <font-awesome-icon
                id="font-awesome-icon"
                :icon="['fas', 'map-marker']"
                class="text-2xl text-gray-700"
              />
              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                class="validation__wrapper"
                vid="longitude"
                rules="required"
              >
                <input
                  v-model="gym.longitude"
                  type="text"
                  :class="[
                    'create-gym__input',
                    errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                  ]"
                  placeholder="Longitude"
                />
              </ValidationProvider>
            </div>
          </div>
          <div class="create-gym__wrapper mb-6">
            <font-awesome-icon
              id="font-awesome-icon"
              :icon="['fas', 'envelope']"
              class="text-2xl text-gray-700"
            />
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="validation__wrapper"
              vid="email"
              rules="required"
            >
              <input
                v-model="gym.email"
                type="text"
                :class="[
                  'create-gym__input',
                  errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                ]"
                placeholder="Email"
              />
            </ValidationProvider>
          </div>
          <div class="create-gym__wrapper mb-6">
            <font-awesome-icon
              id="font-awesome-icon"
              :icon="['fas', 'globe']"
              class="text-2xl text-gray-700"
            />
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="validation__wrapper"
              vid="country"
              rules="required"
            >
              <input
                v-model="gym.country"
                type="text"
                :class="[
                  'create-gym__input',
                  errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                ]"
                placeholder="Country"
              />
              <div class="text-red-600 pt-2">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="create-gym__wrapper mb-6">
            <font-awesome-icon
              id="font-awesome-icon"
              :icon="['fas', 'address-card']"
              class="text-2xl text-gray-700"
            />
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="validation__wrapper"
              vid="address"
              rules="required"
            >
              <input
                v-model="gym.address"
                type="text"
                :class="[
                  'create-gym__input',
                  errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                ]"
                placeholder="Address"
              />
              <div class="text-red-600 pt-2">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="create-gym__wrapper mb-12">
            <font-awesome-icon
              id="font-awesome-icon"
              :icon="['fas', 'pager']"
              class="text-2xl text-gray-700"
            />
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="validation__wrapper"
              vid="website"
            >
              <input
                v-model="gym.website"
                type="text"
                :class="[
                  'create-gym__input',
                  errors.length > 0 ? 'border-red-600' : 'border-gray-600',
                ]"
                placeholder="Website (optional)"
              />
              <div class="text-red-600 pt-2">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="create-gym__footer flex justify-end mb-8">
          <BaseButton
            :class="{ 'create-gym__button--disabled': !valid }"
            @click.native="submit"
          >
            Submit
          </BaseButton>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import BaseButton from "../common/BaseButton.vue";

export default Vue.extend({
  name: "InformationStep",
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseButton,
  },
  data() {
    return {
      gym: {
        name: "",
        website: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        country: "",
        email: "",
      },
    };
  },
  computed: {
    getUser(): any {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    submit(): void {
      const user = this.getUser;
      const gymData = {
        name: this.gym.name,
        ...(this.gym.website && { website: this.gym.website }),
        phone: this.gym.phone,
        address: this.gym.address,
        latitude: this.gym.latitude,
        longitude: this.gym.longitude,
        country: this.gym.country,
        email: this.gym.email,
        owner: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        trainers: [],
        members: [],
      };
      this.createGym(gymData);
    },
    createGym(gymData: object) {
      this.$fire.firestore
        .collection("gyms")
        .add(gymData)
        .then(() => {
          this.updateTrainer();
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
      const trainerData = {
        isOwner: true,
        gym: this.gym.name,
      };
      await this.$fire.firestore
        .collection("users")
        .where("email", "==", this.getUser.email)
        .get()
        .then((querySnapshot) => {
          const docRef = querySnapshot.docs[0].ref;
          docRef.update(trainerData).then(() => {
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
        message: "You have successfully create a gym",
      });
      setTimeout(() => {
        this.$router.push("/dashboard");
      }, 1000);
    },
  },
});
</script>
<style lang="scss">
.create-gym {
  &__input {
    @apply p-2 rounded-lg border-2 flex-grow min-w-0 w-full;
  }
  &__wrapper {
    @apply flex justify-center items-center;
  }
  &__button {
    &--disabled {
      @apply pointer-events-none rounded-lg opacity-25;
    }
  }
}
.validation {
  &__wrapper {
    @apply flex flex-col items-center w-full px-4;
  }
  &__error {
    @apply text-red-600 mt-2;
  }
}
</style>
