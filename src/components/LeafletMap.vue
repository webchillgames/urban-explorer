<template>
  <div class="leaflet-map">
    <div ref="mapRef" class="leaflet-map__map"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, type PropType, watch } from 'vue'
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

    const userLat = ref(0)
    const userLong = ref(0)

    const pin = L.icon({
      iconUrl: import.meta.env.BASE_URL + 'pin-item.png',
      iconSize: [28, 55],
      iconAnchor: [14, 54]
      // popupAnchor: [-3, -76],
      // shadowUrl: 'my-icon-shadow.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    })
    const userPin = L.icon({
      iconUrl: import.meta.env.BASE_URL + 'pin.png',
      iconSize: [28, 55],
      iconAnchor: [14, 54]
      // popupAnchor: [-3, -76],
      // shadowUrl: 'my-icon-shadow.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    })

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
        interactive: true,
        icon: pin
      }
      return props.items.filter(v=> v.isShow === true).map((v) => L.marker({ lat: v.coords[0], lng: v.coords[1] }, options))
    })

    watch(userLong, () => {
      changeUserPinPosition()
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
        maxZoom: 20
      }).addTo(mapDiv)
    }

    function addMarkersToMap() {
      if (map.value && markers.value) {
        markers.value.forEach((v) => v.addTo(map.value as L.Map))
      }
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function error() {
      // alert('ошибка геолакации')
      // console.log('ошибка геолакации')
    }

    function success(pos: GeolocationPosition) {
      const crd = pos.coords
      userLat.value = crd.latitude
      userLong.value = crd.longitude
    }

    navigator.geolocation.watchPosition(success, error, options)

    const userMarker = computed((): L.Marker => {
      const options = {
        title: 'user point',
        riseOnHover: true,
        clickable: false,
        interactive: true,
        icon: userPin
      }
      return L.marker({ lat: userLat.value, lng: userLong.value }, options)
      
    })

    const userMarkerId = userMarker.value

    function setUserMarkerToMap() {
      if (map.value) {
        map.value.addLayer(userMarkerId)
        console.log('ну типо должен');
        
      }
    }

    function changeUserPinPosition() {
      if (map.value && map.value.hasLayer(userMarkerId)) {
        userMarkerId.setLatLng({ lat: userLat.value, lng: userLong.value })
      }
    }

    onMounted(() => {
      map.value = createMapContainer(mapRef.value)
      navigator.geolocation.getCurrentPosition(success, error, options)
      setTileLayer(map.value)
      addMarkersToMap()
      setUserMarkerToMap()
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
  overflow: hidden;

  &__map {
    border-radius: 8px;
    width: 100%;
    height: 100%;
  }
}
</style>
