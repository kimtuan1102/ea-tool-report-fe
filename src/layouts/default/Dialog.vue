<template>
  <default-dialog />
</template>

<script>
  export default {
    name: 'Dialog',
    components: {
      DefaultDialog: () => import(
          /* webpackChunkName: "default-dialog" */
          '../../components/dialog/Index'
          ),
    },
  }
</script>

<style scoped>

</style>
