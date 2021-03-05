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
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="messageTelegram"
                clearable
                solo
                label="Nội dung"
                value="Xin Chào"
                hint="Gửi tin nhắn tới những người đã được lọc"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-btn
                v-for="item of dynamicKeys"
                :key="item.id"
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + `{${item.key}}`"
              >
                {{item.text}}
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
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
            </v-col>
          </v-row>
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
    data: () => ({
      dynamicKeys: [
        { id: 1, key: 'accountId', text: 'ID' },
        { id: 2, key: 'initialBalance', text: 'Balance 0' },
        { id: 3, key: 'currentBalance', text: 'Balance 1' },
        { id: 4, key: 'percent', text: 'Phần trăm' },
        { id: 5, key: 'dollar', text: 'Dollar' },
        { id: 6, key: 'botOrder', text: 'Bot' },
        { id: 7, key: 'selfOrder', text: 'Tự đánh' },
        { id: 8, key: 'deposit', text: 'Deposit' },
        { id: 9, key: 'withdraw', text: 'Withdraw' },
        { id: 10, key: 'expireDateFormat', text: 'Hết hạn' },
        { id: 11, key: 'phone', text: 'SĐT' },
      ],
    }),
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
  ::v-deep .v-text-field__slot {
    margin-right: -46px !important;
  }

</style>
