import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		idToken: null,
		userId: null,
		user: null,
		statusMessage: {
			message: null,
			isStatusMessageShow: false
		}
	},
	mutations: {
		authUser (state, userData) {
			state.idToken = userData.token
			state.userId = userData.userId
		},
		storeUser (state, user) {
			state.user = user
		},
		clearAuthData (state) {
			state.idToken = null
			state.userId = null
			state.user = null
		},
		showStatusMessage (state, messageData) {
			state.statusMessage.message = messageData.message
			state.statusMessage.isStatusMessageShow = messageData.status
		}
	},
	actions: {
    tryAutoLogin ({ commit }) {
     const token = localStorage.getItem('token')
     if (!token) {
      return
    }
    const expirationDate = localStorage.getItem('expiryDate')
    const now = new Date()
    if (now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId')
    commit('authUser', {
      token: token,
      userId: userId
    })
  },
  showMessage ({ commit, dispatch }, messageData) {
   const message = messageData.message
   const status = messageData.status
   commit('showStatusMessage', {
    message: message,
    status: status
  })
   setTimeout(function () {
    commit('showStatusMessage', {
     message: null,
     status: false
   })
  }, 3000)
 },
 login ({ commit, dispatch }, authData) {
   axios.post('http://localhost:8080/auth/login/', {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true
  })
   .then(res => {
    console.log(res)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userId', res.data.userId)
    const remainingMilliseconds = 60 * 60 * 1000
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds)
    localStorage.setItem('expiryDate', expiryDate.toISOString())
    commit('authUser', {
     token: res.data.token,
     userId: res.data.userId
   })
    router.replace('/')
  })
   .catch(err => console.log(err))
 },
 logout ({ commit }) {
   commit('clearAuthData')
   localStorage.removeItem('expiryDate')
   localStorage.removeItem('token')
   localStorage.removeItem('userId')
   router.replace('/login')
 },
 fetchUser ({ commit, state }) {
   if (!state.idToken) {
    return
  }
  axios.get('http://localhost:8080/user/user/' + state.userId, { headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getters.token
  }
})
  .then(res => {
    commit('storeUser', res.data.user)
  })
  .catch(err => console.log(err))
}
},
getters: {
  user (state) {
    return state.user
  },
  token (state) {
    return state.idToken
  },
  isAuthenticated (state) {
    return state.idToken !== null
  },
  message (state) {
    return state.statusMessage
  }
}
})
