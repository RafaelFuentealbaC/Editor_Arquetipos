import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueDraggable from 'vue-draggable'
import 'vue-draggable/polyfills'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueDND from 'awe-dnd'
import VueDragSelector from "vue-drag-selector";
import JSONView from "vue-json-component";
import VueNestable from 'vue-nestable'



Vue.config.productionTip = false
Vue.use(VueRouter,VueAxios, axios,JSONView,VueNestable, VueDraggable,VueDND,VueDragSelector);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
