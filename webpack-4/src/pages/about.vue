<template>
  <div>
    <h1>About</h1>
    <p class="blue">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Hello World'
    }
  }
}
</script>

<style lang="less" scoped>
  .blue {
    color: blue;
  }
</style>

