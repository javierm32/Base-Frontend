<template>
	<div id="nav">
     	<router-link to="/">Home</router-link> |
     	<router-link to="/users">Users</router-link>
     	<a @click="onLogout" class="logout-button" href="">Cerrar sesión</a>
    </div>
</template>

<script>
	export default {
		methods: {
    		onLogout () {
      			this.$store.dispatch('logout')
    		}
  		}
	};
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.logout-button {
  float: right;
}
</style>