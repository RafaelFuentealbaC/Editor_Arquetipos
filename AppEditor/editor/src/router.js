import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Nuevo from './views/Nuevo.vue';
import Vista from './views/Vista.vue';
import Cargar from './views/Cargar.vue';
import Descargar from './views/Descargar.vue';
import Importar from './views/Importar.vue';
import Exportar from './views/Exportar.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/nuevo',
      name: 'nuevo',
      component: Nuevo
    },
    {
      path: '/cargar',
      name: 'cargar',
      component: Cargar
    },
    {
      path: '/descargar',
      name: 'descargar',
      component: Descargar
    },
    {
      path: '/vista',
      name: 'vista',
      component: Vista
    },
    {
      path: '/importar',
      name: 'importar',
      component: Importar
    },
    {
      path: '/exportar',
      name: 'exportar',
      component: Exportar
    }
  ]
})
