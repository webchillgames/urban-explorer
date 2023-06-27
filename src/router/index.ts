import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'

import GameMap from '@/pages/GameMap.vue'
import GameTask from '@/pages/GameTask.vue'
import GamesList from '@/pages/GamesList.vue'
import GamePlay from '@/pages/GamePlay.vue'
import GameMenu from '@/pages/GameMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/games',
      component: GamesList
    },
    {
      path: '/game/:id/',
      component: GameView,

      children: [
        {
          path: 'menu',
          component: GameMenu,
          children: [
            { path: 'task', component: GameTask },
            { path: 'map', component: GameMap }
          ]
        },
        { path: 'play', component: GamePlay }
      ]
    }
  ]
})

export default router
