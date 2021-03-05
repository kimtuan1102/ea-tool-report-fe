<template>
  <div>
    <dialog-send-message-telegram />
    <dialog-edit-report />
  </div>
</template>

<script>
  export default {
    name: 'Index',
    components: {
      DialogSendMessageTelegram: () => import(
        /* webpackChunkName: "dialog-send-message-telegram" */
        './DialogSendMessageTelegram'
        ),
      DialogEditReport: () => import(
        /* webpackChunkName: "dialog-edit-report" */
        './DialogEditReport'
      ),
    },
  }
</script>

<style scoped>

</style>
