<template>
  <div>
    <dialog-send-message-telegram />
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
    },
  }
</script>

<style scoped>

</style>
