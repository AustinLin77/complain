
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import $ from 'jquery'
import api from './api.js'
Vue.config.productionTip = false;
import dateFns from 'date-fns';
Vue.prototype.dateFns = dateFns;
// Vue.prototype.path = "http://172.30.128.39:8080/swdAPP/weixin/complain/";
Vue.prototype.path = "http://appinter.sunwoda.com/weixin/complain/";
Vue.prototype.api = api;
Vue.use(YDUI);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
