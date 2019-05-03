import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('./views/Users.vue'),
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }

  },
  {
    path: '/user/:id',
    name: 'user-detail',
    component: () => import('./views/User-detail.vue'),
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/user/:id/edit',
    name: 'user-edit',
    component: () => import('./views/User-edit.vue'),
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  }
  ]
})
