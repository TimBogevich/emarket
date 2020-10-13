import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/categiory/:category',
    name: 'categiory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/category.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "about" */ '../views/account.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/cart.vue')
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import(/* webpackChunkName: "about" */ '../views/delivery.vue')
  },
  {
    path: '/details/:pzn',
    name: 'details',
    component: () => import(/* webpackChunkName: "about" */ '../views/details.vue')
  },
  {
    path: '/about',
    name: 'details',
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import(/* webpackChunkName: "about" */ '../views/orders.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
