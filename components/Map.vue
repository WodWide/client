<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        :zoom="12"
        :center="initialCoordinates"
        :options="{ zoomControl: false }"
      >
        <l-tile-layer
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="marker in markers"
          :key="marker.name"
          :lat-lng="marker.coordinates"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Map",
  data() {
    return {
      initialCoordinates: [40.59686595926241, 22.968233668582023],
      markers: [
        {
          name: "booster",
          coordinates: [40.56723498008876, 22.95709404224273],
        },
        {
          name: "join-the-revolution",
          coordinates: [40.572558722154845, 22.97598358457203],
        },
      ],
    };
  },
});
</script>
