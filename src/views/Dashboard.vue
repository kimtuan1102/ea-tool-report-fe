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
            <v-text-field
              v-model="accountIdSearch"
              label="ID tài khoản"
              solo
              clearable
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="filterType"
              :items="searchItems"
              label="Tiêu chí"
              item-text="name"
              item-value="value"
              solo
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-btn
              height="48"
              style="text-transform: none"
              depressed
              color="primary"
              @click="filterReports"
            >
              <v-icon left>
                mdi-magnify
              </v-icon>
              Search
            </v-btn>
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
                    @click="openDialogEditReport(item)"
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
  </v-container>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import { mapActions, mapState } from 'vuex'
  import ReportAction from '../layouts/default/widgets/ReportAction'
  import { mapFields } from 'vuex-map-fields'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

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
          text: 'Hết hạn',
          value: 'expireDateFormat',
        },
        {
          sortable: false,
          text: 'Action',
          value: 'action',
        },
      ],
      searchItems: [
        { id: 1, name: 'Tất cả', value: 'All' },
        { id: 1, name: 'Tài khoản sắp hết hạn ( 7 ngày )', value: 'ExpireLessThanSevenDay' },
        { id: 2, name: 'Tài khoản tự đánh 1 lần', value: 'SelfOrderOneTime' },
        { id: 3, name: 'Tài khoản tự đánh 2 lần', value: 'SelfOrderTwoTime' },
        { id: 4, name: 'Tài khoản tự đánh nhiều hơn 2 lần', value: 'SelfOrderMoreThanTwoTime' },
      ],
    }),

    computed: {
      sales: get('sales/sales'),
      ...mapState('report', ['reportData']),
      ...mapState('auth', ['userProfile']),
      ...mapFields('report', ['filterType', 'accountIdSearch']),
    },
    watch: {
      filterType () {
        this.filterReports()
      },
    },
    mounted () {
      this.getProfile()
      this.filterReports()
    },
    methods: {
      ...mapActions('report', ['filterReports', 'updateReportFields', 'resetReportData', 'deleteReportByAccountId']),
      ...mapActions('auth', ['getProfile']),
      ...mapActions('dialog', ['openDialogEditReport']),
    },
  }
</script>
