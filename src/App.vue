<template>
  <div id="app">
    <QA />
  </div>
</template>

<script>
import QA from './components/QA.vue'

export default {
  name: 'App',
  components: {
    QA
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
