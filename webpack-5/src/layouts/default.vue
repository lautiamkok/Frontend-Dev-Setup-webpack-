<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <main>
      <slot/>
    </main>
    <footer>
      <copyright />
    </footer>
  </div>
</template>

<script>
import Copyright from '@/components/copyright.vue'

export default {
  name: 'default',

  beforeCreate () {
    document.body.className = ''
  },

  components: {
    Copyright
  }
}
</script>
