<template>
  <v-row
    class="bg"
    justify="center"
    align="center"
  >
    <v-col
      cols="6"
      md="3"
    >
      <material-card
        color="#e91e63"
        full-header
      >
        <template #heading>
          <div
            class="pa-5 white--text text-center"
          >
            <div class="text-h4 font-weight-bold white--text">
              Login
            </div>
          </div>
        </template>
        <v-card-text>
          <v-card-text class="text-body-1 text-center">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="email"
                      label="Email"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="password"
                      color="purple"
                      label="Password"
                      type="password"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <v-btn
              class="mt-6 accent--text"
              rounded
              light
              large
              text
              @click="login({email, password})"
            >
              LET'S GO
            </v-btn>
          </v-card-text>
        </v-card-text>
      </material-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Login',
    data: () => ({
      password: '',
      email: '',
    }),
    methods: {
      ...mapActions('auth', ['login']),
    },
  }
</script>

<style scoped>
  .bg {
    height: 100vh;
    background-image: url("../assets/login.jpg");
  }

</style>
