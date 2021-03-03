<template>
  <v-row
    class="bg"
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
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
              <v-text-field
                v-model="email"
                label="Email"
                :error-messages="emailErrors"
                required
                @input="$v.$touch()"
                @blur="$v.$touch()"
              />
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                label="Password"
                required
                type="password"
                @input="$v.$touch()"
                @blur="$v.$touch()"
              />
              <v-btn
                class="mt-6 accent--text"
                rounded
                light
                large
                text
                @click="submit"
              >
                LET'S GO
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card-text>
      </material-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    mixins: [validationMixin],
    validations: {
      password: { required },
      email: { required, email },
    },
    data: () => ({
      password: '',
      email: '',
    }),
    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    methods: {
      ...mapActions('auth', ['login']),
      submit () {
        this.$v.$touch()
        if (this.$v.$error) return
        const email = this.email
        const password = this.password
        this.login({ email, password })
      },
    },
  }
</script>

<style scoped>
  .bg {
    height: 100vh;
    background-image: url("../assets/login.jpg");
  }

</style>
