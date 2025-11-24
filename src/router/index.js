import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '../pages/MoviesList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MoviesList
    }
  ]
})

export default router

