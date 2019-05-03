<template>
	<div class="about">
		<nav-bar></nav-bar>
		<h3>Usuarios</h3>
		<hr>
		<div class="w3-row addandsearch-container">
			<div class="w3-half">
				<button  @click.prevent="openModal" class="w3-button w3-blue" style="height:42px;font-weight:bold;">Agregar usuario</button>		
			</div>
			<div class="w3-half">
				<div style="height:42px;width:100%;">
					<form>
						<input 
						class="w3-input w3-border search" 
						type="text" 
						placeholder="Buscar por nombre"
						v-model="query">
						<button
						class="w3-button w3-blue search-container__button-query"
						@click.prevent="getCustomers(query)"
						><i class="fas fa-search"></i>
					</button>
				</form>
			</div>
		</div>
	</div>
	<div>
		<div class="w3-modal" style="padding-top:60px" v-if="modalIsShow">
			<div class="w3-modal-content">
				<div>
					<div class="new-user-container-form">
						<div class="w3-container w3-blue modal-header">
							<h3>Nuevo usuario</h3>
							<span @click.prevent="closeModal" class="w3-button w3-display-topright" style="font-weight:bold;font-size:27px;">&times;</span>
						</div>
						
						<div class="form-container">
							<div class="w3-cell-row name-surname-container">
								<div class="w3-cell">
									<div class="user-input-container name">
										<label class="w3-text-black"><b>Nombre</b></label>
										<input class="w3-input w3-border" v-model="userData.name" type="text">	
									</div>
								</div>
								<div class="w3-cell">
									<div class="user-input-container surname">
										<label class="w3-text-black"><b>Apellido</b></label>
										<input class="w3-input w3-border" v-model="userData.surname" type="text">	
									</div>
								</div>
							</div>
							<hr>

							<div class="user-input-container">
								<label class="w3-text-black"><b>Email</b></label>
								<input class="w3-input w3-border" v-model="userData.email" type="text">		
							</div>

							<div class="user-input-container">
								<label class="w3-text-black"><b>Confirmar Email</b></label>
								<input class="w3-input w3-border" v-model="userData.confirmEmail" type="text">		
							</div>
							<hr>
							<div class="user-input-container">
								<label class="w3-text-black"><b>Contraseña</b></label>
								<input class="w3-input w3-border" v-model="userData.password" type="password">
							</div>
							<div class="user-input-container">
								<label class="w3-text-black"><b>Confirmar contraseña</b></label>
								<input class="w3-input w3-border" v-model="userData.confirmPassword" type="password">
							</div>
							<hr>

							<div class="user-input-container">
								<label class="w3-text-black"><b>Teléfono</b></label>
								<input class="w3-input w3-border" v-model="userData.phone" type="text">
							</div>	
						</div>

						<div class="w3-light-grey modal-footer">
							<div class="buttons-wrapper">
								<button @click.prevent="closeModal" class="w3-button w3-blue-grey cancel-button" >Cancelar</button>
								<button @click.prevent="addCustomer" class="w3-button w3-blue add-user-button">Agregar usuario</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="table-container">
		<table class="w3-table w3-striped w3-bordered">
			<tr>
				<th>Id</th>
				<th>Email</th>
				<th>Name</th>
				<th>Surname</th>
				<th>Phone</th>
			</tr>
			<tr v-for="user in usersTableData.users">
				<router-link 
				tag="td" 
				class="id"
				:to="{ name: 'user-detail', params: { id: user._id } }">{{ user._id }}
			</router-link>
			<td>{{ user.email }}</td>
			<td>{{ user.name }}</td>
			<td>{{ user.surname }}</td>
			<td>{{ user.phone }}</td>
		</tr>
	</table>

	<div class="pagination-container">
		<p 
		class="previousPage"
		@click.prevent="previousPage(pageNumber)"
		v-show="pageNumber > 1"><i class="fas fa-chevron-left"></i></p>
		<!-- <p><i class="fas fa-chevron-left"></i></p> -->
		<p>Página: {{ pageNumber }}</p>
		<p>de</p>
		<p>{{ totalPages }}</p>
		<p 
		class="nextPage" 
		@click.prevent="nextPage(pageNumber)" 
		v-show="totalPages > pageNumber"> <i class="fas fa-chevron-right"></i> </p>
	</div>
</div>
<router-view/>
</div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/Nav.vue'	

export default {
	data () {
		return {
			modalIsShow: false,
			usersTableData: {
				users: [],
			},
			totalPages: 0,
			pageNumber: 1,
			query: '',
			userData: {
				name: '',
				surname: '',
				email: '',
				confirmEmail: '',
				password: '',
				confirmPassword: '',
				phone: ''
			}
		}
	},
	created () {
		this.getCustomers('')
	},
	methods: {
		openModal () {
			this.modalIsShow = true
		},
		closeModal () {
			this.modalIsShow = false
		},
		getCustomers (q, pageNumber) {
			var vm = this
			
			if (!pageNumber) {
				pageNumber = 1
			}

			axios.get('/user/users?query=' + q + '&pageNumber=' + pageNumber, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(res => {
				vm.usersTableData.users = res.data.users
				vm.totalPages = res.data.totalPages
				vm.pageNumber = res.data.pageNumber
				console.log(res)
			})
			.catch(err => console.log(err))
		},
		nextPage (pageNumber) {
			this.pageNumber++
			this.getCustomers(this.query, this.pageNumber)
		},
		previousPage (pageNumber) {
			this.pageNumber--
			this.getCustomers(this.query, this.pageNumber)
		},
		addCustomer () {
			var vm = this

			const formData = {
				name: this.userData.name,
				surname: this.userData.surname,
				email: this.userData.email,
				password: this.userData.password,
				phone: this.userData.phone
			}

			axios.put('user/signup', formData, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.getters.token
				}
			})
			.then(res => {
				vm.getCustomers('', 1)
			})
			.catch(err => console.log(err))

			this.userData.name = ''
			this.userData.surname = ''
			this.userData.email = ''
			this.userData.confirmEmail = ''
			this.userData.password = ''
			this.userData.confirmPassword = ''
			this.userData.phone = ''

			this.modalIsShow = false

			this.getCustomers('')
		}
	},
	components: {
    	'nav-bar': NavBar
  	}
};
</script>

<style scoped>
.addandsearch-container {
	margin-bottom: 32px;
}

.search-wrapper {
	height: 56px;
	background-color: red;
}

.search {
	width: 90%;
	display: inline;
	float: left;
	font-size: 16px;
	outline: none;
}

.search:focus {
	border: 1px solid #2196F3!important;
}

.search-container__button-query {
	width: 10%;
	float: right;
	font-size: 16px;
	height: 42px;
	}.search-wrapper {
		height: 56px;
		background-color: red;
	}

	.search {
		width: 90%;
		display: inline;
		float: left;
		font-size: 16px;
		outline: none;
	}

	.search:focus {
		border: 1px solid #2196F3!important;
	}

	.search-container__button-query {
		width: 10%;
		float: right;
		font-size: 16px;
		height: 42px;
	}

	/*** table ***/
	.pagination-container {
		padding: 16px 0;
	}

	.pagination-container p {
		display: inline;
		font-weight: bold;
		padding: 4px;
	}

	.id {
		text-decoration: underline;
		cursor: pointer;
		color: blue;
	}

	.previousPage {
		cursor: pointer;
	}

	.nextPage {
		cursor: pointer;
	}
	/*** table ***/

	/*** modal ***/
	.modal-header {
		text-align: center;
		font-weight: bold;
	}

	.w3-modal {
		display: block !important;
	}

	.w3-modal-content {
		width: 600px !important;
	}

	.name-surname-container {
		margin-top: 16px;
	}

	.w3-cell {
		width: 50%
	}

	.name {
		padding-right: 4px; 
		margin-bottom: 0 !important;
	}

	.surname {
		padding-left: 4px;
		margin-bottom: 0 !important;
	}

	.form-container {
		height: 370px;
		padding: 0 48px;
		overflow: scroll;
	}

	.user-input-container {
		margin: 16px 0;
	}

	.modal-footer {
		height: 72px;
		padding: 16px;
		font-weight: bold;
	}

	.buttons-wrapper {
		float: right;
	}

	.cancel-button {
		margin-right: 16px;
	}

	.add-user-button {

	}
	/*** modal ***/
	</style>
