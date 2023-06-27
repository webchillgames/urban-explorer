import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    game: null
  }),
  actions: {
    setCurrentGame(v) {
      this.game = v
    }
  }
})
