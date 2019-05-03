<template>
	<div>
		<nav-bar></nav-bar>
		<div class="w3-cell-row">
			<div class="w3-cell">
				<h3>{{user.name}} {{user.surname}}</h3>
				<p>Id: {{ $route.params.id }}</p>
				<p>Email: {{ user.email }}</p>
			</div>
			<div class="w3-cell">
				<router-link
				tag="a"
				class="edit-button"
				:to="{ name: 'user-edit', params: {id: id }}"
				>Editar</router-link>
				<a @click.prevent="deleteUser" class="delete-button">Eliminar usuario</a>
			</div>
		</div>
		<hr>
		<div class="w3-cell-row">
			<div class="w3-cell">
				<p>Nombre: {{ user.name }}</p>
				<p>Apellido: {{ user.surname }}</p>
				<p>Correo electrónico: {{ user.email }}</p>
				<p>Teléfono: {{ user.phone }}</p>
			</div>
			<div class="w3-cell">
				
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import NavBar from '../components/Nav.vue'

export default {
	data () {
		return {
			id: this.$route.params.id,
			user: {}
		}
	},
	created () {
		axios.get('/user/user/' + this.id, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.$store.getters.token
			}
		})
		.then(res => {
			this.user = res.data.user
			console.log(res)
		})
		.catch(err => console.log(err))
	},
	methods: {
		deleteUser () {
			const vm = this

			axios.delete('/user/user/' + this.id, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(res => {
				console.log(res)
				router.replace('/users')
			})
			.catch(err => console.log(err))
		}
	},
	components: {
    	'nav-bar': NavBar
  	}
};
</script>

<style>
.edit-button {
	padding: 0 16px;
	color: #2094EF;
}

.delete-button {
	color: #F44336;
	text-decoration: underline;
	cursor: pointer;
}
</style>