// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import createCache from 'vuex-cache';


import VueApollo  from 'vue-apollo'
import { createProvider } from './vue-apollo'
// todo
// cssVars()
Vue.use(Vuex)

Vue.prototype.store = new Vuex.Store({
  plugins: [
    createCache({ timeout: 10000 })
  ],
  state: {
    _user: "",
    _role: "",
    _genreTypes:[],
    _publishCount: "",
  },
  getters: {
    user: (state) => state._user,
    role: (state) => state._role,
    genreTypes: (state) => state._genreTypes,
    publish: (state) => state._publishCount,
  },
  mutations: {
   UpdateUser(state,id){
    state._user = id;
    
   },
   UpdateRole(state,role){
    state._role = role;
    
   },
   UpdategenreTypese(state,genreTypes){
    state._genreTypes = genreTypes;
    
   },
   UpdatePubplish(state,publish){
    state._publishCount = publish;
    
   },
  },
});
Vue.use(BootstrapVue);
Vue.prototype.$createCookie = function(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
Vue.prototype.$CheckStatue = function(id){

}
Vue.prototype.$readCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
Vue.prototype.$eraseCookie = function (name) {
	this.$createCookie(name,"",-1);
}
Vue.prototype.$logout = function()
{
  this.store.commit('UpdateUser', "")
  this.$eraseCookie("userId");
  this.$eraseCookie("userRole");
  this.$eraseCookie("genreTypes");
  // this.$router.push('/login');
  window.location.href =  "/login";
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  apolloProvider: createProvider(),

  components: {
    App
  }
})
