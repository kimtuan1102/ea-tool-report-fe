<template>
  <v-app>
    <default-bar v-if="isShowAppBarAndDrawer" />
    <default-drawer v-if="isShowAppBarAndDrawer" />
    <default-view />
    <default-dialog />
    <default-loading />
    <default-footer v-if="isShowAppBarAndDrawer" />
    <vue-confirm-dialog></vue-confirm-dialog>
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
      ),
      DefaultDrawer: () => import(
        /* webpackChunkName: "default-drawer" */
        './Drawer'
      ),
      DefaultFooter: () => import(
        /* webpackChunkName: "default-footer" */
        './Footer'
      ),
      DefaultSettings: () => import(
        /* webpackChunkName: "default-settings" */
        './Settings'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
      DefaultDialog: () => import(
        /* webpackChunkName: "default-dialog" */
        './Dialog'
        ),
      DefaultLoading: () => import(
        './Loading'
        ),
    },
    computed: {
      isShowAppBarAndDrawer () {
        return this.$route.name !== 'Login'
      },
    },
  }
</script>
