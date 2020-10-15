import Vue from 'vue'
import axios from 'axios'
import { make, set, dispatch } from 'vuex-pathify'
import router from '@/router'


const  state =  {
  items : [],
  likedItems : [],
  orders : [],
  drawer : null,
  categories : [],
  categoryPage : 1,
  globalLoader : false,
  filters : [],
  filtersSelected : [],
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
    let preferences = {
      hitsPerPage: 10,
      attributesToSnippet: "*:20",
      page: 0,
      facetFilters: []
     }
    preferences.facetFilters.push(["category:" + router.category])
    preferences.facetFilters.push(state.filtersSelected.map(i => "packType:" + i.text))
    let categoryItems = await this._vm.$algolia.search("",preferences)
    commit("SET_ITEMS", {category : router.category, curPage : 0, nbPages : categoryItems.nbPages, items : categoryItems.hits})
    commit("SET_GLOBAL_LOADER", false)
  },

  async loadMore({commit, state}, router) {
    commit("SET_GLOBAL_LOADER", true)
    let preferences = {
      hitsPerPage: 10,
      attributesToSnippet: "*:20",
      page: 0,
      facetFilters: []
     }
     preferences.facetFilters.push(["category:" + router.category])
     state.filtersSelected.forEach(i => {
       preferences.facetFilters.push(["packType:" + i.text])
     })
    preferences.page = preferences.page + 1
    let categoryItems = await this._vm.$algolia.search("",preferences)
    state.items.curPage = state.items.curPage + 1
    state.items.items = state.items.items.concat(categoryItems.hits)
    commit("SET_ITEMS", state.items)
    commit("SET_GLOBAL_LOADER", false)
  },

  async loadCategories({commit}) {
    let response = await this._vm.$algolia.search('', {facets: '*', hitsPerPage: 0})
    let category = Object.entries(response.facets.category).map(i => {
      return {text : i[0], count : i[1]}
    }) 

    commit("SET_CATEGORIES", category)
  },

  async loadFilters({commit, state}, router) {
    commit("SET_FILTERS", [])
    commit("SET_FILTERS_SELECTED", [])
    let params = {
      facets: '*', 
      hitsPerPage: 0,
      "facetFilters": [["category:" + router.category]]
    }
    let response = await this._vm.$algolia.search('', params)
    let filters = Object.entries(response.facets.packType).map(i => {
      return {text : i[0], count : i[1]}
    }) 
    commit("SET_FILTERS", filters)
  },
  filtersSeletedRemove({state}, index) {
    Vue.delete(state.filtersSelected, index)

  },
  async saveUser({commit,state}) {
    Vue.set(state.user, "edited", true)
    let snapshot = await this._vm.$firebase.firestore().collection('users')
    await snapshot.doc(state.user.uid).set(state.user)
  },
  async retrieveUser({commit,state}, currentUser) {
    let snapshot = await this._vm.$firebase.firestore().collection('users').doc(currentUser.uid).get()
    if(snapshot.exists) {
      state.user = snapshot.data()
    }
    else{
      let [name, lastName]  = currentUser.displayName.split(" ")
      state.user = {
        uid : currentUser.uid,
        email : currentUser.email || "",
        telephone : currentUser.phoneNumber ||"",
        name : name || "",
        lastName : lastName || "",
      }
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

  async loadLiked({commit}, uid) {
    let likedRef = this._vm.$db.collection('users').doc(uid).collection('liked')
    let liked = await likedRef.get()
    liked = liked.docs.map(i => i.data())
    commit("SET_LIKED_ITEMS", liked)
  },
  async likeItem({state}, item) {
    let likedRef = this._vm.$db.collection('users').doc(state.user.uid).collection('liked')
    let doc = await likedRef.doc(item.pzn).get()
    if(doc.exists) {
      await likedRef.doc(item.pzn).delete()
      let index = state.likedItems.findIndex(i => i.pzn == item.pzn)
      Vue.delete(state.likedItems, index)
    } else {
      let liked = await likedRef.doc(item.pzn).set(item)
      Vue.set(state.likedItems, state.likedItems.length, item)
    }
  },
  async logOut({commit,state}) {
    let response = await this._vm.$areYouSure("Выйти?")
    if(response) {
      let logout = await this._vm.$firebase.auth().signOut()
      commit("SET_USER", null)
      commit("SET_CART", [])
      commit("SET_ORDERS", [])
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

