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
              <v-btn
                color="primary"
                @click="resetReportData"
              >
                Reset
              </v-btn>
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reportData"
            >
              <template #item.action="{ item }">
                <v-icon
                  class="mx-1"
                  @click="openDialog(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <template #item.percent="{ item }">
                {{ Math.ceil((item['currentBalance']/item['initialBalance'])*100 - 100) }}
              </template>
              <template #item.$="{ item }">
                {{ doLaCalc(item) }}
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
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    v-model="accountId"
                    disabled
                    label="Account ID"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    v-model="initialBalance"
                    prefix="$"
                    color="purple"
                    type="number"
                    label="Initial Balance"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>

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

  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })

  export default {
    name: 'DashboardView',

    data: () => ({
      dialogEdit: false,
      accountId: '',
      initialBalance: '',
      charts: [{
        type: 'Bar',
        color: 'primary',
        title: 'Website Views',
        subtitle: 'Last Campaign Performance',
        time: 'updated 10 minutes ago',
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              },
            },
          }],
        ],
      }, {
        type: 'Line',
        color: 'success',
        title: 'Daily Sales',
        subtitle: '<i class="mdi mdi-arrow-up green--text"></i><span class="green--text">55%</span>&nbsp;increase in today\'s sales',
        time: 'updated 4 minutes ago',
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190],
          ],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      }, {
        type: 'Line',
        color: 'info',
        title: 'Completed Tasks',
        subtitle: 'Last Campaign Performance',
        time: 'campaign sent 26 minutes ago',
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38],
          ],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      }],
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
          value: '$',
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
          sortable: false,
          text: 'Action',
          value: 'action',
        },
      ],
    }),

    computed: {
      sales: get('sales/sales'),
      ...mapState('report', ['reportData']),
      totalSales () {
        return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
      },
    },
    methods: {
      ...mapActions('report', ['getAllReportData', 'updateInitialBalance', 'resetReportData']),
      openDialog (item) {
        this.accountId = item.accountId
        this.initialBalance = item.initialBalance
        this.dialogEdit = true
      },
      updateData () {
        const accountId = this.accountId
        const initialBalance = this.initialBalance
        this.updateInitialBalance({ accountId, initialBalance })
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
    },
    mounted () {
      this.getAllReportData()
    },
  }
</script>
