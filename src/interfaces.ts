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
  images: IImage[]
  items: IItem[]
  title: string
  id: number

}

export interface ILevel {
  title: string
  id: number
}
