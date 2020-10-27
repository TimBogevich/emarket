import Vue from 'vue'

import * as Realm from "realm-web";


const appConfig = {
  id: "application-0-jchjb",
  timeout: 10000, // timeout in number of milliseconds
};



var main = async function () {

  let app = Realm.App.getApp("application-0-jchjb")
  if(!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  }

  Vue.prototype.$mdbf = app.currentUser.functions

}

main();

