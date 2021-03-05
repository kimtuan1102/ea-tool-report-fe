<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
      <template v-for="(p, i) in items">
        <v-divider
          v-if="p.divider"
          :key="`divider-${i}`"
          class="mb-2 mt-2"
        />

        <app-bar-item
          v-else-if="(userProfile.roles && userProfile.roles.includes('admin')) || p.title !=='Reset'"
          :key="`item-${i}`"
          to="/"
        >
          <v-list-item-icon
            @click="clickAction(p)"
          >
            <v-icon>{{ p.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            @click="clickAction(p)"
            v-text="p.title"
          />
        </app-bar-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'ReportAction',
    data: () => ({
      items: [
        { title: 'Reset', icon: 'mdi-autorenew' },
        { title: 'Report', icon: 'mdi-file-excel' },
        { title: 'Send Message', icon: 'mdi-email-send-outline' },
      ],
    }),
    computed: {
      ...mapState('auth', ['userProfile']),
    },
    mounted () {
      this.getProfile()
    },
    methods: {
      ...mapActions('auth', ['logout', 'getProfile']),
      ...mapActions('report', ['resetReportData', 'reportExcels']),
      ...mapActions('dialog', ['openDialogSendMessageTelegram']),
      clickAction (item) {
        switch (item.title) {
          case 'Reset':
            this.resetReportData()
            break
          case 'Report':
            this.reportExcels()
            break
          case 'Send Message':
            this.openDialogSendMessageTelegram()
            break
          default:
            break
        }
      },
    },
  }
</script>
