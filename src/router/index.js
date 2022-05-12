// Arquivo Javascript criado automaticamente ao criar o app vue com a funcionalidade do vue-router.
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Pedidos from '../views/Pedidos.vue'

/*
O array routes é o "endereço" para onde as tags <router-link to=""> enviará o usuário ao ser clicado. Neste exemplo foi criado o endereço 'home' e o endereço 'Pedidos'.
Cada item deste array é um endereço e cada endereço possui 3 dados: 
- path: que é o endereço propriamente dito, do arquivo. O endereço "/" é a view Home do projeto (Home.vue)
- name: é o nome da rota
- component: é o componente que será chamado no router-link. Este componente deve estar importado no topo do arquivo (como o que está comentado) ou deve ser feita uma função ara importá-lo. 
*/
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Pedidos',
    name: 'Pedidos',
    component: () => import(/* webpackChunkName: "Pedidos" */ '../views/Pedidos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
