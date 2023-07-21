declare global {
  const AFRAME: any;
}

export interface IPoint {
  coords: number[]
  id: string
}

export interface IItem {
  id: string
  coords: number[]
  model: string
  isCatched: boolean
  scale: string
  isShow: boolean
  rotation: string
  position: string
}

export interface IImage {
  id: number
  link: string
}

export interface IGame {
  task: string
  items: IItem[]
  title: string
  id: string
}

export interface ILevel {
  title: string
  id: number
}
