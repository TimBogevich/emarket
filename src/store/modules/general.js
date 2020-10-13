import Vue from 'vue'
import axios from 'axios'
import { make, set, dispatch } from 'vuex-pathify'
import router from '@/router'

let algoliaPreferences = {
  hitsPerPage: 10,
  attributesToSnippet: "*:20",
  page: 0,
  facetFilters: null
 }

const  state =  {
  items : [],
  orders : [],
  drawer : null,
  categories : [],
  categoryPage : 1,
  globalLoader : false,
  cursors : [],
  cart : [],
  user : null,
  coutries : [
    {text : "Россия", value : "russia", iso : "ru"},
    {text : "Украина", value : "ukrain", iso : "ua"},
    {text : "Казахстан", value : "kasachstan", iso : "kz"},
    {text : "Беларусь", value : "belarus", iso : "by"},
  ]
}

const mutations =  {
    ...make.mutations(state),
    }

const getters = {
  userDatIsValid(state){
    try {
      return Boolean(state.user.address && state.user.city && state.user.country && state.user.lastName && state.user.name && state.user.telephone && state.user.zip)
    }
    catch(e){
      return false
    }
  },
  cartLength(state) {
    let ln
    if (state.cart.length>0) {
      ln = state.cart.reduce((acc, v) => {
        return acc += (v.selectCountSelected || 1)
      },0)
    }
    return ln || 0
  },
  cartTotalPrice(state) {
    let ln
    if (state.cart.length>0) {
      ln = state.cart.reduce((acc, v) => {
        return acc += v.productPrice * (v.selectCountSelected || 1)
      },0)
    }
    return ln || 0
  }
}

const actions = {
  async loadItem({commit,state}, router) {
    commit("SET_GLOBAL_LOADER", true)
    let category = state.items.find(i=> i.category === router.category)
    if(!category){
      let preferences = Object.assign({}, algoliaPreferences)
      preferences.facetFilters = "category:" + router.category
      let categoryItems = await this._vm.$algolia.search("",preferences)
      Vue.set(state.items, state.items.length, {category : router.category, curPage : 0, nbPages : categoryItems.nbPages, items : categoryItems.hits} )
      commit("SET_ITEMS", state.items)
      commit("SET_GLOBAL_LOADER", false)
    }
  },

  async loadMore({commit, state}, router) {
    commit("SET_GLOBAL_LOADER", true)
    let category = state.items.find(i=> i.category === router.category)
    if (category && category.curPage < category.nbPages) {
      let preferences = Object.assign({}, algoliaPreferences)
      preferences.facetFilters = "category:" + router.category
      preferences.page = preferences.page + 1
      let categoryItems = await this._vm.$algolia.search("",preferences)
      category.curPage = category.curPage + 1
      category.items = category.items.concat(categoryItems.hits)
      commit("SET_ITEMS", state.items)
    }
    commit("SET_GLOBAL_LOADER", false)
  },

  async loadCategories({commit}) {
    let response = await this._vm.$algolia.search('', {facets: '*', hitsPerPage: 0})
    let cat = Object.keys(response.facets.category).map((i, index) => {
      return {text : i}
    })
    commit("SET_CATEGORIES", cat)
  },
  async saveUser({commit,state}) {
    let snapshot = await this._vm.$firebase.firestore().collection('users')
    await snapshot.doc(state.user.uid).set(state.user)
  },
  async retrieveUser({commit,state}, uid) {
    let snapshot = await this._vm.$firebase.firestore().collection('users').doc(uid).get()
    if(snapshot.exists) {
      state.user = snapshot.data()
    }
    else{
      state.user = {uid}
    }
  },
  async retrieveCard({commit,state, dispatch}, uid) {
    let localCart = Object.assign([], state.cart)
    let snapshot = await this._vm.$firebase.firestore().collection('users').doc(uid).collection('cart').get()
    let items = snapshot.docs.map(i => i.data())
    commit("SET_CART", items)
    localCart.forEach(async (i) => {
      await dispatch("toCart", i)
    })
  },
  async toCart({commit, state}, item) {
    item.selectCountSelected = item.selectCountSelected || 1
    let cartItem = state.cart.find(i=> i.pzn === item.pzn)
    if(cartItem) {
      Vue.set(cartItem, "selectCountSelected", cartItem.selectCountSelected + item.selectCountSelected)
    } else {
      Vue.set(state.cart, state.cart.length, item)
    }

    if(state.user) {
      let cart = this._vm.$db.collection('users').doc(state.user.uid).collection('cart').doc(item.pzn)
      let snapshot = await cart.get()
      let doc = snapshot.data()
      if(doc) {
        item.selectCountSelected = doc.selectCountSelected + item.selectCountSelected
      }

      await cart.set(item)
    }
  },
  async deleteFromCart({commit,state}, {index, item}) {
    let response = await this._vm.$areYouSure(`Будет удалена позиция ${item.productName}`)
    if(response) {
      Vue.delete(state.cart, index)
      await this._vm.$db.collection('users').doc(state.user.uid).collection('cart').doc(item.pzn).delete()
    }
  },
  async makeOrder({commit,state, dispatch, getters}) {
    let order = this._vm.$db.collection('users').doc(state.user.uid).collection('orders')
    let newDoc = order.doc()
    let doc = await newDoc.set({date : Date.now() , status : 1, price : getters.cartTotalPrice})
    let items = order.doc(newDoc.id).collection('items')
    state.cart.forEach(i => items.doc().set(i))
    commit("SET_CART", [])

    await this._vm.$db.collection('orders').doc().set({id : newDoc.id, path : newDoc.path, date : Date.now(), price : getters.cartTotalPrice})

    let cart = await this._vm.$db.collection('users').doc(state.user.uid).collection('cart').get()
    const batch = this._vm.$db.batch();
    cart.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await dispatch("loadOrders")
  },

  async loadOrders({commit}, uid) {
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
  async logOut({commit,state}) {
    let response = await this._vm.$areYouSure("Выйти?")
    if(response) {
      let logout = await this._vm.$firebase.auth().signOut()
      commit("SET_USER", null)
      commit("SET_CART", [])
    }
  }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    }

