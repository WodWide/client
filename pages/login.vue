<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg6>
        <v-card class="elevation-12">
          <!-- <v-toolbar dark color="primary">
          </v-toolbar> -->
          <v-card-title class="justify-start pb-15 font-6rem">
            Login
          </v-card-title>
          <v-card-text>
            <v-form action="POST" @submit.prevent="loginUser">
              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
                v-model="user.email"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                v-model="user.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <!-- <v-spacer></v-spacer> -->
            <v-btn
              class="mb-4 rounded-pill elevation-8"
              min-height="4em"
              min-width="20em"
              color="primary"
              to="/"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
};
</script>

<style></style>
