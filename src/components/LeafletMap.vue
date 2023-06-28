<template>
  <div class="leaflet-map">
    <div ref="mapRef" class="leaflet-map__map"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, type PropType } from 'vue'
import type { IItem } from '@/interfaces'

import 'leaflet/dist/leaflet.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<IItem[]>,
      required: true
    }
  },
  setup(props) {
    const zoom = ref(15)
    const mapRef = ref()
    const map = ref<L.Map>()

    function setCenter() {
      let xSum = 0
      let ySum = 0
      const quantity = props.items.length

      props.items.forEach((v: IItem) => {
        xSum = xSum + v.coords[0]
        ySum = ySum + v.coords[1]
      })

      return { lat: xSum / quantity, lng: ySum / quantity }
    }

    const markers = computed((): L.Marker[] => {
      const options = {
        title: 'pickup point',
        riseOnHover: true,
        clickable: true,
        interactive: true
      }
      return props.items.map((v) => L.marker({ lat: v.coords[0], lng: v.coords[1] }, options))
    })

    function createMapContainer(mapRef: HTMLElement) {
      const options = {
        trackResize: true,
        preferCanvas: true,
        zoomAnimation: false
      }
      return L.map(mapRef, options).setView(setCenter(), zoom.value)
    }

    function setTileLayer(mapDiv: L.Map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(mapDiv)
    }

    function addMarkersToMap() {
      if (map.value && markers.value) {
        markers.value.forEach((v) => v.addTo(map.value as L.Map))
      }
    }

    // const options = {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // }

    // const userLat = ref(null)
    // const userLong = ref(null)

    // function success(pos) {
    //   const crd = pos.coords

    //   // console.log('Your current position is:')

    //   userLat.value = crd.latitude
    //   userLong.value = crd.longitude

    //   // console.log(`Latitude : ${crd.latitude}`)
    //   // console.log(`Longitude: ${crd.longitude}`)
    //   // console.log(`More or less ${crd.accuracy} meters.`)
    // }

    // function error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`)
    // }

    // navigator.geolocation.getCurrentPosition(success, error, options)

    onMounted(() => {
      map.value = createMapContainer(mapRef.value)
      setTileLayer(map.value)
      addMarkersToMap()
    })

    return { mapRef }
  }
})
</script>

<style lang="scss">
.leaflet-map {
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 400px;

  &__map {
    width: 100%;
    height: 100%;
  }
}
</style>
