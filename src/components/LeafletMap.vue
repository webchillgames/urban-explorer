<template>
  <div class="leaflet-map">
    <div ref="mapRef" class="leaflet-map__map"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import type { IPoint } from '@/interfaces'

import 'leaflet/dist/leaflet.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const zoom = ref(15)
    const mapRef = ref()
    const map = ref<L.Map>()

    const center = computed(() => {
      const sumX = props.items.reduce((a: number, c: number[]): number => {
        return a + c.coords[0]
      }, 0)

      const sumY = props.items.reduce((a: number, c: number[]): number => {
        return a + c.coords[1]
      }, 0)

      const latitude = sumX / props.items.length
      const long = sumY / props.items.length

      return { lat: latitude, lng: long }
    })

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
      return L.map(mapRef, options).setView(center.value, zoom.value)
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
  // height: 400px;
  // width: 100%;

  &__map {
    width: 100%;
    height: 100%;
  }
}
</style>
