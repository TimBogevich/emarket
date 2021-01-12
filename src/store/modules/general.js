import Vue from 'vue'
import axios from 'axios'
import { make, set, dispatch } from 'vuex-pathify'
import router from '@/router'
import i18n from '../../i18n';
import * as Realm from "realm-web";

const state = {
  items: [],
  likedItems: [],
  popular: [],
  orders: [],
  drawer: null,
  categories: [],
  categoryPage: 1,
  filters: [],
  filtersSelected: [],
  cursors: [],
  cart: [],
  user: null,
  messages: [],
  locale : null,

}

const mutations = {
  ...make.mutations(state),
}

const getters = {

  countries({ state, actions }) {
    return [
      { text: i18n.t("countries.russia"), value: "russia", iso: "ru" },
      { text: i18n.t("countries.ukraine"), value: "ukrain", iso: "ua" },
      { text: i18n.t("countries.kasachstan"), value: "kasachstan", iso: "kz" },
      { text: i18n.t("countries.belarus"), value: "belarus", iso: "by" },
    ]
  },
  userDatIsValid(state) {
    try {
      return Boolean(state.user.address && state.user.city && state.user.country && state.user.lastName && state.user.name && state.user.telephone && state.user.zip)
    }
    catch (e) {
      return false
    }
  },
  cartLength(state) {
    let ln
    if (state.cart.length > 0) {
      ln = state.cart.reduce((acc, v) => {
        return acc += parseInt(v.selectCountSelected || 1)
      }, 0)
    }
    return ln || 0
  },
  cartTotalPrice(state) {
    let ln
    if (state.cart.length > 0) {
      ln = state.cart.reduce((acc, v) => {
        return acc += v.productPrice * (v.selectCountSelected || 1)
      }, 0)
    }
    return ln || 0
  }
}

const actions = {
  async loadItem({ commit, state }, router) {
    commit("SET_ITEMS", [])
    let filters = state.filtersSelected.map(i => i.text)
    filters = filters.length ? filters : ""
    let items = await this._vm.$mdbf.get_items(router.category, filters)
    commit("SET_ITEMS", { category: router.category, ...items })
  },

  async loadMore({ commit, state }, router) {
    let filters = state.filtersSelected.map(i => i.text)
    filters = filters.length ? filters : ""
    state.items.curPage = state.items.curPage + 1
    let items = await this._vm.$mdbf.get_items(router.category, filters, state.items.curPage)
    state.items.hits = state.items.hits.concat(items.hits)
    commit("SET_ITEMS", state.items)
  },

  async loadCategories({ commit }) {

    let categories = await this._vm.$mdbf.get_categories()
    categories = categories.map(i => {
      i.text = i._id
      delete i._id
      return i
    })
    commit("SET_CATEGORIES", categories)
  },

  async loadFilters({ commit, state }, router) {
    commit("SET_FILTERS", [])
    commit("SET_FILTERS_SELECTED", [])
    let filters = await this._vm.$mdbf.get_filters(router.category)
    filters = filters.map(i => {
      i.text = i._id
      delete i._id
      return i
    })
    commit("SET_FILTERS", filters)
  },
  filtersSeletedRemove({ state }, index) {
    Vue.delete(state.filtersSelected, index)

  },
  async saveUser({ commit, state }) {
    Vue.set(state.user, "edited", true)
    let snapshot = await this._vm.$firebase.firestore().collection('users')
    await snapshot.doc(state.user.uid).set(state.user)
  },
  async retrieveUser({ commit, state, dispatch }, uid) {
    let currentUser = this._vm.$firebase.auth().currentUser
    let snapshot = await this._vm.$firebase.firestore().collection('users').doc(uid).get()
    if (snapshot.exists) {
      let user = snapshot.data()
      commit("SET_USER", user)
    }
    else {
      let [name, lastName] = (currentUser.displayName || "").split(" ")
      await commit("SET_USER", {
        uid: currentUser.uid,
        photoURL: currentUser.photoURL || "",
        email: currentUser.email || "",
        telephone: currentUser.phoneNumber || "",
        name: name || "",
        lastName: lastName || "",
      })
      dispatch("saveUser")
    }
  },
  async retrieveCard({ commit, state, dispatch }, uid) {
    let localCart = Object.assign([], state.cart)
    let snapshot = await this._vm.$firebase.firestore().collection('users').doc(uid).collection('cart').get()
    let items = snapshot.docs.map(i => i.data())
    commit("SET_CART", items)
    localCart.forEach(async (i) => {
      await dispatch("toCart", i)
    })
  },
  async toCart({ commit, state }, item) {
    item.selectCountSelected = item.selectCountSelected || 1
    let cartItem = state.cart.find(i => i.pzn === item.pzn)
    if (cartItem) {
      Vue.set(cartItem, "selectCountSelected", cartItem.selectCountSelected + item.selectCountSelected)
    } else {
      Vue.set(state.cart, state.cart.length, item)
    }

    if (state.user) {
      let cart = this._vm.$db.collection('users').doc(state.user.uid).collection('cart').doc(item.pzn)
      let snapshot = await cart.get()
      let doc = snapshot.data()
      if (doc) {
        item.selectCountSelected = doc.selectCountSelected + item.selectCountSelected
      }

      await cart.set(item)
    }
  },
  async deleteFromCart({ commit, state }, { index, item }) {
    let response = await this._vm.$areYouSure(i18n.t("cart.delete") + " " + item.productName)
    if (response) {
      Vue.delete(state.cart, index)
      await this._vm.$db.collection('users').doc(state.user.uid).collection('cart').doc(item.pzn).delete()
    }
  },
  async makeOrder({ commit, state, dispatch, getters }) {

    let order = this._vm.$db.collection('users').doc(state.user.uid).collection('orders')
    let newDoc = order.doc()
    let doc = await newDoc.set({ date: Date.now(), status: 1, price: getters.cartTotalPrice, address: state.user.address, city: state.user.city, telephone: state.user.telephone, zip: state.user.zip, name: state.user.name, lastName: state.user.lastName })
    let items = order.doc(newDoc.id).collection('items')
    state.cart.forEach(i => items.doc().set(i))
    await this._vm.$db.collection('orders').doc().set({ id: newDoc.id, path: newDoc.path, date: Date.now(), price: getters.cartTotalPrice })

    commit("SET_CART", [])

    let cart = await this._vm.$db.collection('users').doc(state.user.uid).collection('cart').get()
    const batch = this._vm.$db.batch();
    cart.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await dispatch("loadOrders", state.user.uid)
  },

  async loadOrders({ commit }, uid) {
    let ordersRef = this._vm.$db.collection('users').doc(uid).collection('orders')
    let orders = await ordersRef.orderBy('date', 'desc').get()
    orders = orders.docs.map(i => {
      let obj = i.data()
      obj.id = i.id
      return obj
    })

    let result = orders.map(async i => {
      let docs = await ordersRef.doc(i.id).collection('items').get()
      docs = docs.docs.map(i => i.data())
      i.docs = docs
      return i
    })
    await Promise.all(result)
    commit("SET_ORDERS", orders)

  },

  async loadLiked({ commit }, uid) {
    let likedRef = this._vm.$db.collection('users').doc(uid).collection('liked')
    let liked = await likedRef.get()
    liked = liked.docs.map(i => i.data())
    commit("SET_LIKED_ITEMS", liked)
  },

  async uploadMessage({ state }, message) {
    let messagesRef = this._vm.$db.collection('users').doc(state.user.uid).collection('messages')
    await messagesRef.doc().set(message)

  },

  async loadMessages({ state, commit }, uid) {
    let messagesRef = await this._vm.$db.collection('users').doc(uid).collection('messages').get()
    let messages = messagesRef.docs.map(i => i.data())
    messages = messages.map(i => JSON.parse(i.message))
    commit("SET_MESSAGES", messages)
  },

  async loadPopular({ commit }) {
    let popularRef = this._vm.$db.collection('popular')
    let popular = await popularRef.get()
    popular = popular.docs.map(i => i.data())
    commit("SET_POPULAR", popular)
  },

  async likeItem({ state }, item) {
    let likedRef = this._vm.$db.collection('users').doc(state.user.uid).collection('liked')
    let doc = await likedRef.doc(item.pzn).get()
    if (doc.exists) {
      await likedRef.doc(item.pzn).delete()
      let index = state.likedItems.findIndex(i => i.pzn == item.pzn)
      Vue.delete(state.likedItems, index)
    } else {
      let liked = await likedRef.doc(item.pzn).set(item)
      Vue.set(state.likedItems, state.likedItems.length, item)
    }
  },
  async logOut({ commit, state }) {
    let response = await this._vm.$areYouSure(i18n.t("general.exit"))
    if (response) {
      let logout = await this._vm.$firebase.auth().signOut()
      commit("SET_USER", null)
      commit("SET_CART", [])
      commit("SET_ORDERS", [])
      commit("SET_MESSAGES", [])
    }
  },
}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

