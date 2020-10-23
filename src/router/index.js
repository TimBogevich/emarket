import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/categiory/:category',
    name: 'categiory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "category" */ '../views/category.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/account.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart.vue')
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import(/* webpackChunkName: "delivery" */ '../views/delivery.vue')
  },
  {
    path: '/details/:pzn',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ '../views/details.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/orders.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import(/* webpackChunkName: "orders" */ '../views/contacts.vue')
  },
  {
    path: '/liked',
    name: 'liked',
    component: () => import(/* webpackChunkName: "orders" */ '../views/liked.vue')
  },
  {
    path: '/cardPayment',
    name: 'cardPayment',
    component: () => import(/* webpackChunkName: "orders" */ '../views/cardPayment.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
