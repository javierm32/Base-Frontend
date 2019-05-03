import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)
axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.headers.get['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.token
// axios.defaults.headers.get['Accepts'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
