import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
//import speaker from '../node_modules/speaker';
//import Decoder from '../node_modules/minimp3';
import fs from 'fs';
import ytdl from 'ytdl-core';
console.log(fs)
Vue.config.productionTip = false
//Vue.prototype.$speaker = speaker;
//Vue.prototype.$decoder = Decoder;
Vue.prototype.$fs = fs;
Vue.prototype.$ytdl = ytdl;
Vue.prototype.$url = "http://192.168.178.90:3000";

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
