import {createRouter, createWebHashHistory} from "vue-router";

import Index from './pages/Index.vue';
import Times from './pages/Times.vue';
import Jogadores from './pages/Jogadores.vue';
import Partidas from './pages/Partidas.vue';

const routes = [
  {
    path: '/',
    component: Index,
    name: 'index'
  },
  {
    path: '/times',
    component: Times,
    name: 'times'
  },
  {
    path: '/:time_id/jogadores',
    component: Jogadores,
    name: 'jogadores'
  },
  {
    path: '/partidas',
    component: Partidas,
    name: 'partidas'
  }
]

const rotas = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})


export default rotas
