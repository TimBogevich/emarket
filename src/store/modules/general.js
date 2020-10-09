import Vue from 'vue'
import axios from 'axios'
import { make, set, dispatch } from 'vuex-pathify'
import router from '@/router'

const  state =  {
  items : [],
  categories : [],
  categoryPage : 1,
  globalLoader : false,
  cursors : [],
  cart : []
}

const mutations =  {
    ...make.mutations(state),
    }

const getters = {
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
    let snapshot = await this._vm.$firebase.firestore().collection('items').where('category','==',router.category).orderBy('pzn')
    let cursor = await snapshot.limit(2).get()
    let items =  cursor.docs.map(element => element.data());
    let categoryItems = state.items.find(i=> i.category === router.category)
    if(!categoryItems){
      Vue.set(state.items, state.items.length, {category : router.category, items : items} )
    }
    commit("SET_GLOBAL_LOADER", false)
  },
  async loadMore({commit, state}, router) {
    commit("SET_GLOBAL_LOADER", true)
    let snapshot = await this._vm.$firebase.firestore().collection('items').where('category','==',router.category).orderBy('pzn')
    let categoryItems = state.items.find(i=> i.category === router.category)
    let lastDocument = categoryItems.items[categoryItems.items.length - 1]
    let cursor = await snapshot.startAfter(lastDocument.pzn).limit(2).get()
    let items =  cursor.docs.map(element => element.data());
    debugger
    items.forEach(i => {
      Vue.set(categoryItems.items, categoryItems.items.length, i )
    })
    commit("SET_GLOBAL_LOADER", false)
  },

  async loadCategories({commit}) {
    let snapshot = await this._vm.$firebase.firestore().collection('categories').get()
    let categories =  snapshot.docs.map(element => {
      return {
        name : element.id,
        doc : element.data()
      }
    });
    commit("SET_CATEGORIES", categories)
  },
  deleteFromCart({commit,state}, index) {
    Vue.delete(state.cart, index)
  }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    }

