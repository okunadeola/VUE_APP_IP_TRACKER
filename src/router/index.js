import { createRouter, createWebHistory } from 'vue-router'

import Map from '../components/Map';


const routes = [
  {
    path: "/",
    component: Map,
    name: "Map",
  }
];




const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
