<template>
  <div class="glossary md:h-full">
    <SideNavbar />

    <div class="h-full flex flex-col items-center mx-4 xl:justify-start">
      <div class="lg:text-2xl flex items-center flex-col">
        <div class="text-4xl mt-16">
          <h1>Glossary of CrossFit Terms</h1>
        </div>
      </div>
      <div
        class="glossary__body shadow-lg rounded-lg p-8 text-lg lg:text-xl w-full lg:w-1/2 text-center"
      >
        <div v-for="(item, index) in terms" :key="index" class="term mt-8">
          <h2 class="p-4 bg-gray-100 font-bold py-2 px-4 rounded-lg">
            {{ item.term }}
          </h2>
          <p>{{ item.definition }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavbar from "@/components/common/SideNavbar.vue";
export default {
  components: {
    SideNavbar,
  },
  data() {
    return {
      terms: [
        {
          term: "WOD",
          definition:
            'WOD stands for "Workout of the Day" and refers to the daily workout regimen that is prescribed by CrossFit coaches. WODs typically consist of a combination of exercises and movements, with the goal of improving overall fitness and endurance.',
        },
        {
          term: "AMRAP",
          definition:
            'AMRAP stands for "As Many Rounds As Possible" and is a common format for CrossFit workouts. In an AMRAP workout, athletes are given a set amount of time (e.g., 10 minutes) to complete as many rounds of a prescribed set of exercises as possible.',
        },
        {
          term: "EMOM",
          definition:
            'EMOM stands for "Every Minute on the Minute" and is another common format for CrossFit workouts. In an EMOM workout, athletes are given a set amount of time (e.g., 10 minutes) to complete a specific exercise or set of exercises at the start of every minute.',
        },
        {
          term: "RX",
          definition:
            'RX refers to the prescribed or recommended weight and/or difficulty level for a particular workout. Completing a workout "as RX\'d" means doing it at the prescribed level of difficulty.',
        },
        {
          term: "Box",
          definition:
            'A "Box" is another term for a CrossFit gym or facility. The term originated from the fact that CrossFit gyms often operate in large, open warehouse spaces (i.e., boxes).',
        },
        {
          term: "Double Unders (DU)",
          definition:
            '"Double Unders" are a type of jump rope exercise where the rope passes under the feet twice with each jump. Double unders are often used in CrossFit workouts to improve coordination, endurance, and speed',
        },
        {
          term: "Tabata",
          definition:
            '"Tabata" is a high-intensity interval training (HIIT) method that consists of 20 seconds of work followed by 10 seconds of rest, repeated for a total of eight rounds (four minutes). Tabata workouts are often used in CrossFit to improve cardio and muscular endurance.',
        },
      ],
    };
  },
};
</script>
