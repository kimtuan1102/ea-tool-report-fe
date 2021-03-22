// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import store from '@/store'
import {
  layout,
  route,
} from '@/util/routes'
import AppService from '../services/app.service'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard', null, '/', { requiresAuth: true }),
      route('Settings', null, '/settings', { requiresAuth: true }),
      route('Login', null, '/login'),
    ]),
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.token) {
      router.push('/login').catch(() => {})
    }
  }
  next()
})

export default router
