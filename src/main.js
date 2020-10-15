import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'
import * as ModalDialogs from 'vue-modal-dialogs'
import algolia from './algoliaConf'



Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzV37z3vkfXB5dg2uev1hJA3A0jO_wqUY",
  authDomain: "apotheke-171c2.firebaseapp.com",
  databaseURL: "https://apotheke-171c2.firebaseio.com",
  projectId: "apotheke-171c2",
  storageBucket: "apotheke-171c2.appspot.com",
  messagingSenderId: "343449187921",
  appId: "1:343449187921:web:d64c7497aaa3c7fd2f6a70",
  measurementId: "G-8HC9YTEL6M"
};

import areYouSure from './components/areYouSure'
const dialogAreYouSure = ModalDialogs.create(areYouSure, 'content')

let  googleAuthProvider = new firebase.auth.GoogleAuthProvider()
let  facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

Vue.prototype.$db = db
Vue.prototype.$firebase = firebase
Vue.prototype.$googleAuthProvider = googleAuthProvider
Vue.prototype.$facebookAuthProvider = facebookAuthProvider
Vue.prototype.$areYouSure = dialogAreYouSure
Vue.prototype.$algolia = algolia


Vue.use(ModalDialogs) 
Vue.use(Vuetify)
Vue.use(require('vue-moment'));
const vuetifyOptions = {   
  icons: {
    iconfont: 'mdi'
  },
}

new Vue({
  router,
  store,
  render: h => h(App),
  i18n,
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')
