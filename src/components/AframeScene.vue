<template>
  <a-scene
    scene
    vr-mode-ui="enabled: false"
    arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
    renderer="antialias: true; alpha: true"
  >
    <!-- <a-camera
      user-camera
      id="camera"
      gps-new-camera
      rotation-reader
      look-controls-enabled
      look-controls
      reverse-mouse-drag
    ></a-camera> -->
    <!-- 
  -->

    <!-- камера для тестов  -->
    <!-- 
    <a-camera
      user-camera
      id="camera"
      gps-new-camera="simulateLatitude:-8.552636;simulateLongitude: 115.274889"
      rotation-reader
      look-controls-enabled
      look-controls
      reverse-mouse-drag
    ></a-camera> 
  -->
  </a-scene>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type PropType, watch } from 'vue'

import type { IItem } from '@/interfaces'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

export default defineComponent({
  emits: ['catchItem', 'finish', 'intersectionCleared'],
  // props: {
  // game: {
  //   type: Object as PropType<IGame>,
  //   required: true
  // },
  // },
  setup(props, ctx) {
    const gameStore = useGameStore()
    const { game } = storeToRefs(gameStore)
    console.log(game.value)

    const items = computed(() => game.value.items)
    const camera = computed(() => game.value.camera)

    const reminder = computed(() => items.value.filter((v: IItem) => v.isCatched === false))
    const itemsLoaded = ref(0)

    watch(itemsLoaded, (v) => {
      if (v === items.value.length) {
        console.log('по идее все подгрузились')
        const models = document.querySelectorAll('.clickable')
        console.log('нашло вот столько', models.length)
      }
    })

    function createModelElement(item: IItem) {
      const modelEl = document.createElement('a-gltf-model')
      const modelWrapper = document.createElement('a-entity')
      modelEl.setAttribute('model', '')
      modelEl.setAttribute('id', `${item.id}`)
      modelEl.setAttribute('src', `${item.model}/scene.gltf`)
      modelEl.classList.add('clickable')
      modelWrapper.setAttribute(
        'gps-new-entity-place',
        `latitude: ${item.coords[0]}; longitude: ${item.coords[1]};`
      )

      if (item.scale) {
        modelEl.setAttribute('scale', item.scale)
      } else {
        modelEl.setAttribute('scale', '1 1 1')
      }

      if (item.rotation) {
        modelEl.setAttribute('rotation-component', '')
        modelEl.setAttribute('rotation', item.rotation)
      } else {
        // modelEl.setAttribute('rotation', '0 0 0')
        modelEl.setAttribute('look-at', '#camera')
      }

      if (item.position) {
        modelEl.setAttribute('position', item.position)
      } else {
        modelEl.setAttribute('position', '0 0 0')
      }

      modelWrapper.appendChild(modelEl)
      itemsLoaded.value = itemsLoaded.value + 1

      return modelWrapper
    }

    AFRAME.registerComponent('scene', {
      init() {
        const cameraEl = document.createElement('a-camera')
        cameraEl.setAttribute('user-camera', '')
        cameraEl.setAttribute('id', 'camera')
        cameraEl.setAttribute('rotation-reader', '')
        cameraEl.setAttribute('look-controls-enabled', '')
        cameraEl.setAttribute('look-controls', '')

        if (camera.value.length) {
          console.log('camera.value[0]', camera.value[0])

          cameraEl.setAttribute(
            'gps-new-camera',
            `simulateLatitude:${camera.value[0]};simulateLongitude: ${camera.value[1]}`
          )
        } else {
          cameraEl.setAttribute('gps-new-camera', '')
        }
        this.el.appendChild(cameraEl)

        items.value.forEach((item: IItem) => {
          if (item.isShow) {
            this.el.appendChild(createModelElement(item))
          }
        })
        // ТЕСТ
        // const camera = document.querySelector('a-camera')
        // if (camera) {
        //   console.log(camera.getAttribute('gps-new-camera'))
        // }
      }
    })

    AFRAME.registerComponent('user-raycaster', {
      dependencies: ['raycaster'],
      init: function () {
        this.el.addEventListener('raycaster-intersection', function () {
          console.log('Player hit something!')
        })

        this.el.addEventListener('raycaster-intersection-cleared', function () {
          setTimeout(() => {
            ctx.emit('intersectionCleared')
          }, 2000)
        })
      }
    })

    AFRAME.registerComponent('model', {
      init() {
        this.el.addEventListener('raycaster-intersected', (evt: any) => {
          const id = evt.target.getAttribute('id')
          console.log('raycaster-intersected')

          if (!reminder.value.length) {
            setTimeout(() => {
              ctx.emit('finish')
            }, 2000)
          }

          return items.value.forEach((item) => {
            if (item.id === id) {
              if (item.isCatched) {
                return
              } else {
                ctx.emit('catchItem', item.id)
              }
            }
          })
        })
      }
    })

    AFRAME.registerComponent('user-camera', {
      init() {
        const raycaster = document.createElement('a-entity')
        raycaster.setAttribute('user-raycaster', '')
        raycaster.setAttribute('raycaster', 'objects: .clickable; far: 5;')
        raycaster.setAttribute('cursor', 'fuse: true;')
        this.el.appendChild(raycaster)

        // this.el.addEventListener('gps-camera-update-positon', (evt) => {
        // })
      }
    })

    return {}
  }
})
</script>
