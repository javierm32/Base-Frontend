<template>
	<div>
		<div class="login-container">
			<div class="login-container__logo">
				<!-- <img class="login-container__img" src="./../assets/epsilon_black.png"> -->
			</div>
			<form class="w3-container">
				<div class="input-item">
					<label class="w3-text"><b>Usuario</b></label>
					<input 
					class="w3-input w3-border" 
					type="text"
					v-model="email"
					>
				</div>
				<div class="input-item">
					<label class="w3-text"><b>Contraseña</b></label>
					<input 
					class="w3-input w3-border" 
					type="password"
					v-model="password"
					>
				</div>
				<div class="input-item">
					<button 
					class="w3-btn w3-black"
					@click.prevent="onSubmit"
					>Iniciar sesión</button>
				</div>
			</form>	
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		onSubmit () {
			const formData = {
				email: this.email,
				password: this.password
			}
			console.log(formData)
			this.$store.dispatch('login', { email: formData.email, password: formData.password })
  	}
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
    this.$store.dispatch('fetchUser')
  }
};
</script>

<style scoped>
.input-item {
	padding-bottom: 24px;
}

.login-container {
	border: 3px solid #333;
	width: 35%;
	margin: auto;
	margin-top: 48px;
}

.login-container__logo {
	padding: 24px 0;
}

.login-container__img {
	width: 70%;
	display: block;
	margin: auto;
}

.w3-btn {
	width: 100%;
}

.recover-password-container {
	text-align: center;
	padding: 24px;
	color: blue;
}
</style>