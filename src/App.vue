<template>
  <div>
    <loading />
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </div>
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'
  import Loading from './components/Loading'

  export default {
    name: 'App',
    components: { Loading },
    metaInfo: {
      title: 'App',
      titleTemplate: '%s | EA Report',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  }
</script>
<style scoped lang="scss">
  .wrapper-scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
