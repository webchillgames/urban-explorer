declare global {
  const AFRAME: any;
}

export interface IPoint {
  coords: number[]
  id: number
}

export interface IItem {
  id: number
  coords: number[]
  model: string
  isCatched: boolean
}

export interface IImage {
  id: number
  link: string
}

export interface IGame {
  task: string
  images: IImage[]
  items: IItem[]
}
