import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mdb from "./mongoConf"
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'
import * as ModalDialogs from 'vue-modal-dialogs'
import algolia from './algoliaConf'
import VuexActionTracker from "vuex-action-tracker";
import ProductZoomer from 'vue-product-zoomer2'
import HeadLoader from "vue-ext-files-head-loader";
import firebase from "./firebaseConf"

Vue.config.productionTip = false
import FlagIcon from 'vue-flag-icon'


import areYouSure from './components/areYouSure'
import login from './components/login'
import cardPayment from './components/cardPayment'
const dialogAreYouSure = ModalDialogs.create({component: areYouSure,wrapper: 'areYouSure', props : ['content']})
const dialogLogin = ModalDialogs.create({component: login, wrapper: 'login', props : ['content']})
const dialogCardPayment = ModalDialogs.create({component: cardPayment, wrapper: 'cardPayment', props : ['content']})


Vue.prototype.$areYouSure = dialogAreYouSure
Vue.prototype.$dialogLogin = dialogLogin
Vue.prototype.$dialogCardPayment = dialogCardPayment
Vue.prototype.$algolia = algolia


Vue.use(FlagIcon);
Vue.use(HeadLoader);
Vue.use(ProductZoomer)
Vue.use(ModalDialogs) 
Vue.use(Vuetify)
Vue.use(require('vue-moment'));
const vuetifyOptions = {   
  icons: {
    iconfont: 'mdi'
  },
}
Vue.use(new VuexActionTracker(), store);


new Vue({
  router,
  store,
  render: h => h(App),
  i18n,
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')
