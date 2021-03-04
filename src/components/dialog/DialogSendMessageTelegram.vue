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
                name="input-7-1"
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
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{accountId}'"
              >
                ID
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{initialBalance}'"
              >
                Balance 0
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{currentBalance}'"
              >
                Balance 1
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{percent}'"
              >
                Phần trăm
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{dollar}'"
              >
                Dollar
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{botOrder}'"
              >
                Bot
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{selfOrder}'"
              >
                Tự đánh
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{deposit}'"
              >
                Deposit
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{withdraw}'"
              >
                Withdraw
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{expireDateFormat}'"
              >
                Hết hạn
              </v-btn>
              <v-btn
                class="mx-1 my-1"
                color="#d3d3d3"
                depressed
                default
                rounded
                style="text-transform: none"
                @click="messageTelegram = messageTelegram + '{phone}'"
              >
                SDT
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
