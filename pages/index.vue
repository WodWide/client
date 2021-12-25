<template>
  <div class="index-page d-flex flex-column">
    <v-app-bar
      elevation="0"
      fluid
      light
      class="white px-16 py-4 d-flex align-center flex-shrink-1"
    >
      <v-img src="/logo.png" max-height="60" max-width="110" contain />
      <v-container flex-grow-1 class="index-page__wrapper justify-end">
        <v-btn plain>Home</v-btn>
        <v-btn plain>About</v-btn>
        <v-btn plain>Pricing</v-btn>
        <v-btn plain>Contact</v-btn>
      </v-container>
      <v-container class="d-flex justify-end">
        <NuxtLink to="/login">
          <v-btn color="primary" class="mr-2">Athlete &rarr;</v-btn>
        </NuxtLink>
        <NuxtLink to="/login">
          <v-btn color="primary">Coach &rarr;</v-btn>
        </NuxtLink>
      </v-container>
    </v-app-bar>
    <v-row elevation="0" class="index-paged__row d-flex justify-center mt-16">
      <span class="font-weight-medium display-4 mr-6">Wod</span>
      <span class="font-weight-medium display-4 grey--text text--darken-1">
        Wide
      </span>
    </v-row>
    <v-row class="d-flex justify-center mt-16">
      <v-img
        src="/icon-park_rope-skipping-one.svg"
        max-height="60"
        max-width="110"
        contain
      />
      <v-img
        src="/healthicons_exercise.svg"
        max-height="60"
        max-width="110"
        contain
      />
      <v-img src="/iconoir_rings.svg" max-height="60" max-width="110" contain />
    </v-row>
    <v-row class="d-flex justify-center mt-16">
      A social platform for cross training athletes and coaches.
    </v-row>
    <v-row class="d-flex justify-center mt-16" style="z-index: 20001">
      <v-btn color="primary" class="mr-2">Sign Up</v-btn>
      <v-btn plain outlined>Learn More</v-btn>
    </v-row>
    <v-row class="mt-n16">
      <img
        v-for="index in 5"
        :key="index"
        :class="'index-page__waves--' + index"
        :src="'/wave-' + index + '.svg'"
      />
    </v-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.app-bar {
  border: none;
}
.v-toolbar {
  &__content {
    width: 100%;
  }
}
.index-page {
  max-height: 80px;
  &__wrapper {
    position: relative;
    left: 10%;
  }
  &__waves {
    &--1 {
      position: absolute;
      bottom: 25%;
      z-index: 1;
    }
    &--2 {
      position: fixed;
      bottom: 15%;
      z-index: 2;
    }
    &--3 {
      position: fixed;
      bottom: 5%;
      z-index: 3;
    }
    &--4 {
      position: fixed;
      bottom: -5%;
      z-index: 4;
    }
    &--5 {
      position: fixed;
      bottom: -15%;
      z-index: 5;
    }
  }
}
</style>
