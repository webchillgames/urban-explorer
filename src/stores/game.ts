import type { IItem, IGame, IImage } from '@/interfaces'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    game: {
      images: [] as IImage[],
      task: '' as String,
      items: [] as IItem[]
    }
  }),
  getters: {
    calcLastItems: (state) => state.game.items.filter((v) => (v.isCatched === false)).length
  },
  actions: {
    setCurrentGame(v: IGame) {
      this.game = v
    },
    clearResults() {
      this.game.items.forEach((v) => {
        v.isCatched = false
      })
    }
  }
})
