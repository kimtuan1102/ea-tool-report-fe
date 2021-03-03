<template>
  <section
    v-if="showLoading"
    class="mask-loading"
  >
    <section />
    <div class="loader">
      <atom-spinner
        :animation-duration="1000"
        :size="60"
        :color="'#ffffff'"
      />
    </div>
  </section>
</template>

<script>
  import { AtomSpinner } from 'epic-spinners'
  import { mapState } from 'vuex'
  export default {
    name: 'Loading',
    components: { AtomSpinner },
    computed: {
      ...mapState('loading', ['showLoading']),
    },
  }
</script>

<style scoped lang="scss">
  .mask-loading {
    display: flex;
  }
  .mask-loading, .mask-loading section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
  .mask-loading section {
    background-color: #000000;
    opacity: 0.4;
  }
  .loader {
    position: relative;
    margin: auto auto;
    z-index: 1000;
  }
</style>
