import Vue from 'vue'
import Vuex from 'vuex'
import general from './modules/general'
import pathify from 'vuex-pathify'
import createPersistedState from "vuex-persistedstate";


pathify.options.mapping = 'standard'
pathify.options.deep = 2

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    pathify.plugin,
    createPersistedState({
      paths: ["general.locale"]
    })
  ],
  modules: {
    general,
  },

})