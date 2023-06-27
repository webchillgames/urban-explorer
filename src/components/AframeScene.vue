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
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const items = computed(() => props.items)
    
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const userLat = ref(null)
    const userLong = ref(null)

    function success(pos) {
      const crd = pos.coords

      // console.log('Your current position is:')

      userLat.value = crd.latitude
      userLong.value = crd.longitude

      // console.log(`Latitude : ${crd.latitude}`)
      // console.log(`Longitude: ${crd.longitude}`)
      // console.log(`More or less ${crd.accuracy} meters.`)
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)

    const reminder = computed(() => items.value.filter((v) => v.isCatched === false))

    AFRAME.registerComponent('scene', {
      init() {
        items.value.forEach((item) => {
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
        this.el.addEventListener('raycaster-intersected', (evt) => {
          const id = evt.target.getAttribute('id')

          if (!reminder.value.length) {
            alert('Finish!')
          }

          return items.value.forEach((item) => {
            if (item.id === Number(id)) {
              if (item.isCatched) {
                return
                // alert('Already caught')
              } else {
                item.isCatched = true
                const el = document.getElementById(`${item.id}`)

                if (scene && el) {
                  scene.removeChild(el)
                }
                alert(`You did it! Left: ${reminder.value.length} items`)
              }
            }
          })
        })
      }
    })

    AFRAME.registerComponent('user-camera', {
      init() {
        const raycaster = document.createElement('a-entity')
        const svg = document.createElement('a-plane')
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
      // tick() {

      // }
    })

    return {}
  }
})
</script>

<style lang="scss">
.aframe-scene {
  &__score {
  }
}
</style>
