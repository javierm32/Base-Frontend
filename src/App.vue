<template>
  <div id="app">
    <div class="router-view-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('tryAutoLogin')
    this.$store.dispatch('fetchUser')
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


.router-view-container {
  width: 900px;
  margin: 0 auto;
}
</style>
