<template>
  <v-app>
    <default-bar v-if="isShowAppBarAndDrawer" />

    <default-drawer v-if="isShowAppBarAndDrawer" />

    <default-view />

    <default-footer v-if="isShowAppBarAndDrawer" />
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
    },
    computed: {
      isShowAppBarAndDrawer () {
        return this.$route.name !== 'Login'
      },
    },
  }
</script>
