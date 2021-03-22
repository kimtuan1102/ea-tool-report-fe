<template>
  <v-dialog
    v-model="showDialogAddPackage"
    max-width="500"
  >
    <v-card>
      <v-card-title>
        Thêm mới gói
        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="closeDialogAddPackage"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text class="text-body-1 text-center">
        <v-form>
          <v-text-field
            v-model="name"
            color="purple"
            :error-messages="nameErrors"
            required
            label="Tên gói"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model="monthNumber"
            color="purple"
            :error-messages="monthNumberErrors"
            required
            type="number"
            label="Số tháng"
            suffix="Tháng"
            @input="$v.monthNumber.$touch()"
            @blur="$v.monthNumber.$touch()"
          />
          <v-text-field
            v-model="price"
            color="purple"
            :error-messages="priceErrors"
            required
            type="number"
            label="Giá"
            prefix="$"
            @input="$v.price.$touch()"
            @blur="$v.price.$touch()"
          />
          <v-text-field
            v-model="minBalance"
            color="purple"
            type="number"
            :error-messages="minBalanceErrors"
            required
            prefix="$"
            label="Số tiền tài khoản từ"
            @input="$v.minBalance.$touch()"
            @blur="$v.minBalance.$touch()"
          />
          <v-text-field
            v-model="maxBalance"
            color="purple"
            :error-messages="maxBalanceErrors"
            required
            type="number"
            prefix="$"
            label="Số tiền tài khoản đến"
            @input="$v.maxBalance.$touch()"
            @blur="$v.maxBalance.$touch()"
          />
          <v-btn
            class="mt-6"
            color="primary"
            depressed
            default
            rounded
            style="text-transform: none"
            @click="submit({name,monthNumber, price, minBalance,maxBalance})"
          >
            Thêm
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  export default {
    name: 'DialogAddPackage',
    mixins: [validationMixin],
    validations: {
      name: { required },
      monthNumber: { required },
      price: { required },
      minBalance: { required },
      maxBalance: { required },
    },
    computed: {
      ...mapFields('package', ['name', 'monthNumber', 'price', 'minBalance', 'maxBalance']),
      ...mapFields('dialog', ['showDialogAddPackage']),
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Package name is required')
        return errors
      },
      monthNumberErrors () {
        const errors = []
        if (!this.$v.monthNumber.$dirty) return errors
        !this.$v.monthNumber.required && errors.push('Package month number is required')
        return errors
      },
      priceErrors () {
        const errors = []
        if (!this.$v.price.$dirty) return errors
        !this.$v.price.required && errors.push('Package price is required')
        return errors
      },
      minBalanceErrors () {
        const errors = []
        if (!this.$v.minBalance.$dirty) return errors
        !this.$v.minBalance.required && errors.push('Package min balance is required')
        return errors
      },
      maxBalanceErrors () {
        const errors = []
        if (!this.$v.maxBalance.$dirty) return errors
        !this.$v.maxBalance.required && errors.push('Package max balance is required')
        return errors
      },
    },
    methods: {
      ...mapActions('dialog', ['closeDialogAddPackage']),
      ...mapActions('package', ['addPackage']),
      submit (item) {
        this.$v.$touch()
        if (this.$v.$error) return
        this.addPackage(item)
      },
    },
  }
</script>

<style scoped>

</style>
