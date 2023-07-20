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

    <!-- камера для тестов  -->

    <a-camera
      user-camera
      id="camera"
      gps-new-camera="simulateLatitude:-6.935598;simulateLongitude:  107.681367"
      rotation-reader
      look-controls-enabled
      look-controls
      reverse-mouse-drag
    ></a-camera>
  </a-scene>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import type { IItem } from '@/interfaces'

export default defineComponent({
  emits: ['catchItem', 'finish'],
  props: {
    items: {
      type: Array as PropType<IItem[]>,
      required: true
    }
  },
  setup(props, ctx) {
    const items = computed(() => props.items)
    const reminder = computed(() => items.value.filter((v: IItem) => v.isCatched === false))

    function createModelElement(item: IItem) {
      console.log('Прогрузилась моделька')

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
        modelEl.setAttribute('rotation', '0 0 0')
        modelEl.setAttribute('look-at', '#camera')
      }

      if (item.position) {
        modelEl.setAttribute('position', item.position)
      } else {
        modelEl.setAttribute('position', '0 0 0')
      }

      modelWrapper.appendChild(modelEl)

      return modelWrapper
    }

    AFRAME.registerComponent('scene', {
      init() {
        items.value.forEach((item: IItem) => {
          if (item.isShow) {
            this.el.appendChild(createModelElement(item))
          }
        })
      }
    })

    AFRAME.registerComponent('user-raycaster', {
      dependencies: ['raycaster'],
      init: function () {
        this.el.addEventListener('raycaster-intersection', function () {
          console.log('Player hit something!')
        })
      }
    })

    AFRAME.registerComponent('model', {
      init() {
        const scene = document.querySelector('a-scene')
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
                console.log('catched')

                item.isCatched = true
                const el = document.getElementById(`${item.id}`)
                ctx.emit('catchItem', reminder.value.length)

                if (scene && el) {
                  ctx.emit('catchItem', reminder.value.length)
                  scene?.removeChild(el)
                  console.log(el)

                  // scene.removeChild(el)
                  // setTimeout(() => {
                  //   ctx.emit('catchItem', reminder.value.length)
                  //   scene.removeChild(el)
                  // }, 1000)
                }
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
        raycaster.setAttribute('raycaster', 'objects: .clickable')
        raycaster.setAttribute('cursor', 'fuse: true;')
        this.el.appendChild(raycaster)

        // this.el.addEventListener('gps-camera-update-positon', (evt) => {
        //   alert(JSON.stringify(evt))
        //   alert(666)
        //   alert(this.el.distance)
        // })
      }
    })

    return {}
  }
})
</script>
