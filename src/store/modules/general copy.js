import Vue from 'vue'
import axios from 'axios'
import { make, set, dispatch } from 'vuex-pathify'
import router from '@/router'

const  state =  {
  items : [
    {
      category:'vitamin',
      desc:'Magnesium Verla N Dragees\nTabletten magensaftresistent, 200 Stück, N3\nVerla-Pharm Arzneimittel GmbH & Co. KG\nArt.-Nr. (PZN): 4911945\n\n(287)',
      image:'https://images.medpex.de/medias/22704/KVXyStcx964EkgKzQmS0ja-30.jpg',
      plz:'4911945',
      productName:'Magnesium Verla N Dragees',
      productPrice:'10,90 €',
    },
    {
      category:'vitamin',
      desc:'Vitamin B-Komplex ratiopharm\nKapseln, 60 Stück\nratiopharm GmbH\nArt.-Nr. (PZN): 4132750\n\n(171)',
      image:'https://images.medpex.de/medias/77465/p1SS7DzcTYTH2cDxEFIVka-30.jpg',
      plz:'4132750',
      productName:'Vitamin B-Komplex ratiopharm',
      productPrice:'8,81 €',
    }
  ],
  categories : [
    {
      name : "vitamins"
    },
    {
      name : "cosmetics"
    },
  ],
  categoryPage : 1,
  globalLoader : false,
}

const mutations =  {
    ...make.mutations(state),
    }

const getters = {
}

const actions = {
  async loadItem({commit}, router) {
    commit("SET_GLOBAL_LOADER", true)
    let snapshot = await this._vm.$firebase.firestore().collection('pharma').where('items','==',router.category).limit(2).get()
    let items =  snapshot.docs.map(element => element.data());
    commit("SET_ITEMS", items)
    commit("SET_GLOBAL_LOADER", false)
  },

  async loadCategories({commit}) {
    let snapshot = await this._vm.$firebase.firestore().collection('pharma').get()
    let categories =  snapshot.docs.map(element => {
      return {
        name : element.id,
        doc : element.data()
      }
    });
    commit("SET_CATEGORIES", categories)
  }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    }

