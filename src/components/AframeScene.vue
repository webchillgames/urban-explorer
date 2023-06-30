<template>
  <a-scene
    scene
    vr-mode-ui="enabled: false"
    arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
    renderer="antialias: true; alpha: true"
  >
    <a-camera
      user-camera
      id="camera"
      gps-new-camera
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
        items.value.forEach((item: IItem) => {
          const modelEl = document.createElement('a-gltf-model')
          modelEl.setAttribute('model', '')
          modelEl.setAttribute('id', `${item.id}`)
          modelEl.setAttribute('src', item.model)
          modelEl.setAttribute(
            'gps-new-entity-place',
            `latitude: ${item.coords[0]}; longitude: ${item.coords[1]};`
          )
          modelEl.classList.add('clickable')
          modelEl.setAttribute('look-at', '#camera')
          modelEl.setAttribute('scale', '2 2 2')
          modelEl.setAttribute('animation-mixer', '')

          this.el.appendChild(modelEl)
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
          evt.target.setAttribute('animation', 'property: scale; to: 0; loop: false; dur: 1000')

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
