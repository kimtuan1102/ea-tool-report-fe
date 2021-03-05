<template>
  <v-dialog
    v-model="showDialogEditReport"
    max-width="500"
  >
    <v-card>
      <v-card-title>
        Edit Balance 0?

        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="closeDialogEditReport"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text class="text-body-1 text-center">
        <v-form>
          <v-text-field
            v-model="accountId"
            disabled
            label="Account ID"
          />
          <v-text-field
            v-model="initialBalance"
            prefix="$"
            color="purple"
            type="number"
            :error-messages="initialBalanceErrors"
            required
            label="Initial Balance"
            @input="$v.initialBalance.$touch()"
            @blur="$v.initialBalance.$touch()"
          />
          <v-text-field
            v-model="telegram"
            color="purple"
            :error-messages="telegramErrors"
            required
            label="Telegram"
            @input="$v.telegram.$touch()"
            @blur="$v.telegram.$touch()"
          />
          <v-text-field
            v-model="deposit"
            color="purple"
            :error-messages="depositErrors"
            required
            type="number"
            label="Deposit"
            @input="$v.deposit.$touch()"
            @blur="$v.deposit.$touch()"
          />
          <v-text-field
            v-model="withdraw"
            color="purple"
            type="number"
            :error-messages="withdrawErrors"
            required
            label="Withdraw"
            @input="$v.withdraw.$touch()"
            @blur="$v.withdraw.$touch()"
          />
          <v-text-field
            v-model="phone"
            color="purple"
            :error-messages="phoneErrors"
            required
            label="Phone number"
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          />
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Expire Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                v-bind="attrs"
                :disabled="!userProfile.roles.includes('admin')"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="expireDate"
              no-title
              @input="menu1 = false"
            />
          </v-menu>
          <v-btn
            class="mt-6"
            color="info"
            depressed
            default
            rounded
            @click="submit({accountId,initialBalance, telegram, deposit,withdraw,expireDate,phone })"
          >
            Update
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'
  import { mapActions, mapState } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import * as moment from 'moment'

  export default {
    name: 'DialogEditReport',
    mixins: [validationMixin],
    validations: {
      initialBalance: { required },
      telegram: { required },
      deposit: { required },
      withdraw: { required },
      expireDate: { required },
      phone: { required },
    },
    data: (vm) => ({
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
    }),
    computed: {
      ...mapFields('dialog', ['showDialogEditReport']),
      ...mapFields('report', ['accountId', 'initialBalance', 'telegram', 'deposit', 'withdraw', 'expireDate', 'phone']),
      ...mapState('auth', ['userProfile']),
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      initialBalanceErrors () {
        const errors = []
        if (!this.$v.initialBalance.$dirty) return errors
        !this.$v.initialBalance.required && errors.push('Initial Balance is required')
        return errors
      },
      telegramErrors () {
        const errors = []
        if (!this.$v.telegram.$dirty) return errors
        !this.$v.telegram.required && errors.push('Telegram is required')
        return errors
      },
      depositErrors () {
        const errors = []
        if (!this.$v.deposit.$dirty) return errors
        !this.$v.deposit.required && errors.push('Deposit is required')
        return errors
      },
      withdrawErrors () {
        const errors = []
        if (!this.$v.withdraw.$dirty) return errors
        !this.$v.withdraw.required && errors.push('Withdraw is required')
        return errors
      },
      expireDateErrors () {
        const errors = []
        if (!this.$v.expireDate.$dirty) return errors
        !this.$v.expireDate.required && errors.push('Expire date is required')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('Phone number is required')
        return errors
      },
    },
    watch: {
      expireDate (val) {
        this.dateFormatted = this.formatDate(this.expireDate)
      },
    },
    methods: {
      ...mapActions('dialog', ['closeDialogEditReport']),
      ...mapActions('report', ['updateReportFields']),
      formatDate (date) {
        return moment(date).format('DD/MM/YYYY')
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      submit (item) {
        this.$v.$touch()
        if (this.$v.$error) return
        this.updateReportFields(item)
      },
    },
  }
</script>

<style scoped>

</style>
