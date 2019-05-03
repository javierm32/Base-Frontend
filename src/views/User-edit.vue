<template>
	<div>
		<nav-bar></nav-bar>
		<div>
			<h3>{{ user.name }} {{ user.surname }}</h3>
			<p>Id: {{ $route.params.id }}</p>
			<p>Email: {{ user.email }}</p>
		</div>
		<hr>
		<div>
			<div class="user-input-container name">
				<label class="w3-text-black"><b>Nombre</b></label>
				<input class="w3-input w3-border" v-model="formData.name" type="text">	
			</div>
			<div class="user-input-container surname">
				<label class="w3-text-black"><b>Apellido</b></label>
				<input class="w3-input w3-border" v-model="formData.surname" type="text">	
			</div>
			<div class="user-input-container">
				<label class="w3-text-black"><b>Contraseña</b></label>
				<input class="w3-input w3-border" v-model="formData.password" type="password">
			</div>
			<div class="user-input-container">
				<label class="w3-text-black"><b>Confirmar contraseña</b></label>
				<input class="w3-input w3-border" v-model="formData.confirmPassword" type="password">
			</div>
			<div class="user-input-container">
				<label class="w3-text-black"><b>Teléfono</b></label>
				<input class="w3-input w3-border" v-model="formData.phone" type="text">
			</div>
		</div>	
		<hr>
		<router-link
		@click.prevent="edit"  
		tag="button"
		class="w3-button w3-blue-grey"
		:to="{ name: 'user-detail', params: { id: id } }"
		>Cancelar</router-link>
		<!-- <button class="w3-button w3-blue-grey">Cancelar</button> -->
		<button 
		@click.prevent="edit" 
		class="w3-button w3-blue">Guardar</button>
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
			user: {},
			formData: {
				name: '',
				surname: '',
				password: '',
				confirmPassword: '',
				phone: ''
			}
		}
	},
	created () {
		this.getUserData()
	},
	methods: {
		getUserData () {
			axios.get('/user/user/' + this.id, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(res => {
				this.user = res.data.user
				this.formData.name = res.data.user.name
				this.formData.surname = res.data.user.surname
				this.formData.phone = res.data.user.phone
			})
			.catch(err => console.log(err))
		},
		edit () {
			axios.put('/user/user/' + this.id, this.formData, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(res => {
				console.log(res)
				router.replace('/user/' + this.id)
				this.getUserData()
			})
			.catch(err => console.log(err))
		},
		delete () {
			axios.delete('/user/user/' + this.id, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => console.log(err))

			router.replace('/user/' + this.id)
		}
	},
	components: {
    	'nav-bar': NavBar
  	}
};
</script>

<style>
.user-input-container {
	margin: 16px;
}
</style>