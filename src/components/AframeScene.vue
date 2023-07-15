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
      gps-new-camera="simulateLatitude:25.067935;simulateLongitude: 55.138646"
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

    AFRAME.registerComponent('scene', {
      init() {
        // alert('началось')
        items.value.forEach((item: IItem) => {
          if (item.isShow) {
            const modelEl = document.createElement('a-gltf-model')
            const parentToRotate = document.createElement('a-entity')
            modelEl.setAttribute('model', '')
            modelEl.setAttribute('id', `${item.id}`)
            modelEl.setAttribute('src', `${item.model}/scene.gltf`)
            parentToRotate.setAttribute(
              'gps-new-entity-place',
              `latitude: ${item.coords[0]}; longitude: ${item.coords[1]};`
            )
            modelEl.classList.add('clickable')

            if (item.scale) {
              modelEl.setAttribute('scale', item.scale)
            } else {
              modelEl.setAttribute('scale', '1 1 1')
            }

            if (item.rotation) {
              console.log(item.id, item.rotation)
              modelEl.setAttribute('rotation-component', '')
              modelEl.setAttribute('rotation', item.rotation)
            } else {
              modelEl.setAttribute('rotation', '0 0 0')
              // modelEl.setAttribute('look-at', '#camera')
            }

            if (item.position) {
              modelEl.setAttribute('position', item.position)
            }
            // modelEl.setAttribute('animation-mixer', '')
            parentToRotate.appendChild(modelEl)
            this.el.appendChild(parentToRotate)
          }

          // alert('Подгрузилась')
        })
      }
    })

    AFRAME.registerComponent('user-raycaster', {
      dependencies: ['raycaster']
      // init() {
      //   this.el.addEventListener('raycaster-intersection', function (evt) {
      //     console.log('raycaster-intersection')
      //   })

      //   this.el.addEventListener('raycaster-intersected-cleared', (evt) => {
      //     this.raycaster = null
      //   })
      // },

      // tick() {
      //   if (!this.raycaster) {
      //     return
      //   } // Not intersecting.
      //   let intersection = this.raycaster.components.raycaster.getIntersection(this.el)
      //   if (!intersection) {
      //     return
      //   } // Not intersecting
      //   // intersecting
      //   console.log(intersection)
      // }
    })

    AFRAME.registerComponent('model', {
      init() {
        const scene = document.querySelector('a-scene')
        this.el.addEventListener('raycaster-intersected', (evt: any) => {
          const id = evt.target.getAttribute('id')
          console.log(6666666);
          
          // evt.target.setAttribute('animation', 'property: scale; to: 0; loop: false; dur: 1000')

          if (!reminder.value.length) {
            setTimeout(() => {
              ctx.emit('finish')
            }, 2000)
          }

          return items.value.forEach((item) => {
            if (item.id === Number(id)) {
              if (item.isCatched) {
                return
              } else {
                item.isCatched = true
                const el = document.getElementById(`${item.id}`)

                if (scene && el) {
                  setTimeout(() => {

                    ctx.emit('catchItem', reminder.value.length)
                    scene.removeChild(el)
                  }, 2000)
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
        // const svg = document.createElement('a-plane')
        // svg.setAttribute('geometry', 'primitive: plane; width: 1; height: 1')
        // svg.setAttribute('material', 'src: url(/ilnur.jpg)')

        raycaster.setAttribute('user-raycaster', '')
        raycaster.setAttribute('raycaster', 'objects: .clickable')
        raycaster.setAttribute('cursor', 'fuse: true;')
        // raycaster.setAttribute('material', 'color: orange; shader: flat')
        raycaster.setAttribute('position', '0 0 -2')

        // raycaster.appendChild(svg)
        // raycaster.setAttribute('geometry', 'primitive: ring;radiusInner: 0.16; radiusOuter: 0.24;')
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
