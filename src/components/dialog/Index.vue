<template>
  <div>
    <dialog-send-message-telegram />
    <dialog-edit-report />
    <dialog-add-package />
    <dialog-extend-package />
    <dialog-edit-package />
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
      DialogAddPackage: () => import(
        /* webpackChunkName: "dialog-add-package" */
        './DialogAddPackage'
        ),
      DialogEditPackage: () => import(
        /* webpackChunkName: "dialog-extend-package" */
        './DialogEditPackage'
        ),
      DialogExtendPackage: () => import(
        /* webpackChunkName: "dialog-extend-package" */
        './DialogExtendPackage'
        ),
    },
  }
</script>

<style scoped>

</style>
