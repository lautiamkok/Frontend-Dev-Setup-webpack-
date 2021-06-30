<template>
  <div>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const layoutDefault = 'default'

export default {
  name: 'App',

  computed: {
    layout () {
      return 'layout-' + (this.$route.meta.layout || layoutDefault)
    }
  }
}
</script>

<style lang="less">
  // Import global style here if not using webpack in the configuration.
  // @import '~Styles/css/main.css';
</style>
