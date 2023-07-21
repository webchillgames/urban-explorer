import type { IItem, IGame } from '@/interfaces'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    game: {
      id: '',
      task: '' as String,
      items: [] as IItem[],
      title: ''
    }
  }),
  getters: {
    calcLastItems: (state) => state.game.items.filter((v) => v.isCatched === false).length
  },
  actions: {
    setCurrentGame(v: IGame) {
      this.game.id = v.id
      this.game.items = v.items
      this.game.title = v.title
      this.game.task = v.task
    },
    setCatchStatus(id: string) {
      this.game.items.forEach((v) => {
        if (v.id === id) {
          v.isCatched = true
        }
      })
    },
    clearResults() {
      this.game.items.forEach((v) => {
        v.isCatched = false
      })
    }
  }
})
