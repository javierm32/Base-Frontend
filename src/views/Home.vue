<template>
  <div>
  	<nav-bar></nav-bar>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h3>Bienvenido</h3>
  </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav.vue'

export default {
  components: {
    'nav-bar': NavBar
  }
};
</script>

<style>
	.home {
		text-align: center;
	}
</style>
