<template>
  <v-dialog
    v-model="showDialogSendMessageTelegram"
    max-width="500"
  >
    <v-card>
      <v-card-title>
        Gửi tin nhắn

        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="closeDialogSendMessageTelegram"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text class="text-body-1 text-center">
        <v-form>
          <v-textarea
            name="input-7-1"
            solo
            label="Nội dung"
            value="Xin Chào"
            hint="Gửi tin nhắn tới những người đã được lọc"
            v-model="messageTelegram"
          />
          <v-btn
            class="mt-6"
            color="info"
            depressed
            default
            rounded
            @click="sendMessageToTelegram"
          >
            Gửi
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'DialogSendMessageTelegram',
    computed: {
      ...mapState('dialog', ['showDialogSendMessageTelegram']),
      ...mapFields('report', ['messageTelegram']),
    },
    methods: {
      ...mapActions('dialog', ['closeDialogSendMessageTelegram']),
      ...mapActions('report', ['sendMessageToTelegram']),
    },
  }
</script>

<style scoped>

</style>
