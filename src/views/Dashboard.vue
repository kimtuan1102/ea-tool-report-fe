<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="filterType"
              :items="searchItems"
              label="Search"
              item-text="name"
              item-value="value"
              solo
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="12"
      >
        <material-card
          color="orange"
          full-header
        >
          <template #heading>
            <div
              class="pa-8 white--text"
              style="display: flex"
            >
              <div>
                <div class="text-h4 font-weight-light">
                  EA REPORT
                </div>
                <div class="text-caption">
                  Report of EA copy
                </div>
              </div>
              <v-spacer />
              <report-action />
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reportData"
            >
              <template #item.action="{ item }">
                <div style="display: flex">
                  <v-icon
                    class="mx-1"
                    @click="openDialog(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    class="mx-1"
                    @click="deleteReportByAccountId({accountId: item.accountId})"
                  >
                    mdi-trash-can-outline
                  </v-icon>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialogEdit"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          Edit Balance 0?

          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="dialogEdit = false"
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
            <v-text-field
              v-model="phone"
              color="purple"
              :error-messages="phoneErrors"
              required
              label="Phone number"
              @input="$v.phone.$touch()"
              @blur="$v.phone.$touch()"
            />
            <v-btn
              class="mt-6"
              color="info"
              depressed
              default
              rounded
              @click="updateData"
            >
              Update
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import ReportAction from '../layouts/default/widgets/ReportAction'
  import { mapFields } from 'vuex-map-fields'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })

  export default {
    name: 'DashboardView',
    components: { ReportAction },
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
      dialogEdit: false,
      accountId: '',
      initialBalance: '',
      telegram: '',
      deposit: '',
      withdraw: '',
      phone: '',
      expireDate: new Date().toISOString().substr(0, 10),
      menu1: false,
      searchItemSelected: '',
      headers: [
        {
          sortable: true,
          text: 'ID',
          value: 'accountId',
        },
        {
          sortable: true,
          text: 'Balance 0',
          value: 'initialBalance',
        },
        {
          sortable: true,
          text: 'Balance 1',
          value: 'currentBalance',
        },
        {
          sortable: true,
          text: '%',
          value: 'percent',
        },
        {
          sortable: true,
          text: '$',
          value: 'dollar',
        },
        {
          sortable: true,
          text: 'Bot',
          value: 'botOrder',
        },
        {
          sortable: true,
          text: 'Tự đánh',
          value: 'selfOrder',
        },
        {
          sortable: true,
          text: 'Deposit',
          value: 'deposit',
        },
        {
          sortable: true,
          text: 'Withdraw',
          value: 'withdraw',
        },
        {
          sortable: false,
          text: 'Telegram',
          value: 'telegram',
        },
        {
          sortable: false,
          text: 'Phone',
          value: 'phone',
        },
        {
          sortable: false,
          text: 'Action',
          value: 'action',
        },
      ],
      searchItems: [
        { id: 1, name: 'Tài khoản sắp hết hạn ( 7 ngày )', value: 'ExpireLessThanSevenDay' },
        { id: 2, name: 'Tài tự đánh 1 lần', value: 'SelfOrderOneTime' },
        { id: 3, name: 'Tài tự đánh 2 lần', value: 'SelfOrderTwoTime' },
        { id: 4, name: 'Tài tự đánh nhiều hơn 2 lần', value: 'SelfOrderMoreThanTwoTime' },
      ],
    }),

    computed: {
      sales: get('sales/sales'),
      ...mapState('report', ['reportData']),
      ...mapState('auth', ['userProfile']),
      ...mapFields('report', ['filterType']),
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
    methods: {
      ...mapActions('report', ['getAllReportData', 'updateReportFields', 'resetReportData', 'deleteReportByAccountId']),
      ...mapActions('auth', ['getProfile']),
      openDialog (item) {
        this.accountId = item.accountId
        this.initialBalance = item.initialBalance
        this.telegram = item.telegram
        this.deposit = item.deposit
        this.withdraw = item.withdraw
        this.expireDate = new Date(item.expireDate).toISOString().substr(0, 10)
        this.phone = item.phone
        this.dialogEdit = true
      },
      updateData () {
        const accountId = this.accountId
        const initialBalance = this.initialBalance
        const telegram = this.telegram
        const deposit = this.deposit
        const withdraw = this.withdraw
        const expireDate = this.expireDate
        const phone = this.phone
        this.$v.$touch()
        if (this.$v.$error) return
        this.updateReportFields({ accountId, initialBalance, telegram, deposit, withdraw, expireDate, phone })
        this.dialogEdit = false
      },
      doLaCalc (item) {
        const balance0 = item.initialBalance
        const balance1 = item.currentBalance
        let doLa = 0
        if (balance0 < 7000 && balance1 > balance0) {
          doLa = (balance1 - balance0 - 50) * 0.15
        } else if (balance0 >= 7000 && balance0 < 10000 && balance1 > balance0) {
          doLa = (balance1 - balance0 - 100) * 0.15
        } else if (balance0 >= 10000 && balance0 < 20000 && balance1 > balance0) {
          doLa = (balance1 - balance0 - 150) * 0.15
        } else if (balance0 >= 20000 && balance1 > balance0) {
          doLa = (balance1 - balance0 - 200) * 0.15
        }
        return Math.ceil(doLa)
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
    watch: {
      expireDate (val) {
        this.dateFormatted = this.formatDate(this.expireDate)
      },
      filterType () {
        this.getAllReportData()
      },
    },
    mounted () {
      this.getProfile()
      this.getAllReportData()
    },
  }
</script>
