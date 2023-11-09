<template>
<section class=" p-5 bg-dark">
            <div class="mx-auto d-flex align-items-center justify-content-center text-center" style="flex-direction: column;">
                <h2 class="mb-5 mt-0 col-sm-6">Find Your Closest Pharmacy for Donation!</h2>
                <div class="col-12 col-sm-6 -center">
                    <div class="card w-100 mt-5 ">
                        <div class="card-header bg-dark project-name" id="header">
                            <h5 class="text-white fw-bold">SEARCH NEAREST DISPENSARY</h5>
                        </div>
                        <div class="card-body search-bg p-4">
                            <form>
                                <div class="form-group">
                                    <label for="location_search">ADDRESS SEARCH: </label>
                                    <input type="address" class="form-control mt-3" id="location_search" v-model="locationSearch" aria-describedby="Address_Search" placeholder="Enter Address/Postal Code">
                                </div>
                                <div class="d-flex flex-row-reverse">
                                    <button type="submit" class="btn btn-primary btn-sm mt-4" @click.prevent="fetchNearbyDispensaries()">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <GMapMap
                  :center="{lat: 1.3521, lng: 103.8198}"
                  :zoom="15"
                  map-type-id="terrain"
                  style="width: 100vw; height: 100vh"
                  ref="myMapRef"
                  :clickable="false"
                >
                <GMapMarker 
                v-if="userMarkerLocation"
                :position="userMarkerLocation.position"
                :clickable="userMarkerLocation.clickable"
                :icon="userMarkerLocation.icon"/>
                <GMapMarker
                  :key="index"
                  v-for="(dispensary, index) in dispensaries"
                  :position="dispensary.geometry.location"
                  :clickable="true"
                  @click="showDispensaryDetails(dispensary)"
                  :id="dispensary.place_id"
                  />
                  <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="infowindowMarkerId != null"
                    style="width=300 ; height=100" :position="infoCoordinates">
                    <div>
                      <h4 style="font-family: Arial, Helvetica, sans-serif;">{{selectedPlaceName}}</h4>
                      <p>{{selectedPlaceAddress}}</p>
                      <p><a :href="link">View on Google Maps</a></p>
                      <p></p>
                      <button class="btn btn-primary btn-sm" @click="getDirections('DRIVING')">Get Driving Directions</button>
                      <button class="btn btn-success btn-sm" @click="getDirections('WALKING')">Get Walking Directions</button>
                    </div>
                  </GMapInfoWindow>
                </GMapMap>
            </div>
        </section>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      center: { lat: 1.3521, lng: 103.8198 },
      locationSearch: "",
      dispensaries: [],
      infoCoordinates: null,
      selectedPlaceName: "",
      selectedPlaceAddress: "",
      link: "",
      service: null,
      infowindowMarkerId: null,
      userMarkerLocation: null,
      directionsRenderer: null,
    };
  },
  methods: {
    async initMap() {
      const map = await this.$refs.myMapRef.$mapPromise;
      this.service = new google.maps.places.PlacesService(map);
    },
    async fetchNearbyDispensaries() {
      const address = this.locationSearch;
      const geocoder = new google.maps.Geocoder();

      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            reject('Geocode was not successful for the following reason: ' + status);
          }
        });
      });

      const userLocation = results[0].geometry.location;
      this.userMarkerLocation = {
        position: userLocation,
        clickable: true,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
      console.log('Latitude:', userLocation.lat());
      console.log('Longitude:', userLocation.lng());
      const map = await this.$refs.myMapRef.$mapPromise;
      map.setCenter(userLocation);
      this.service = new google.maps.places.PlacesService(map);

      const nearbyResults = await new Promise((resolve) => {
        this.service.nearbySearch({
          location: userLocation,
          radius: 2000,
          type: 'pharmacy',
        }, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          }
        });
      });

      // Create markers for nearby pharmacies
      console.log(nearbyResults);
      this.dispensaries = nearbyResults;
    },
     showDispensaryDetails(dispensary) {
      this.infowindowMarkerId = dispensary.place_id;
      const request = {
        placeId: dispensary.place_id,
        fields: ['name', 'place_id', 'formatted_address', 'geometry'],
      };

      const place =  new Promise((resolve) => {
        this.service.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
            this.selectedPlaceAddress = place.formatted_address;
            this.selectedPlaceName = place.name;
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            this.infoCoordinates = { lat: latitude, lng: longitude };
            console.log(this.infoCoordinates);

            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
            this.link = googleMapsLink
          }
        });
      });
    },
    openMarker(id) {
      this.infowindowMarkerId = id;
    },
    getDirections(travelMode) {

      if (!this.userMarkerLocation || !this.infoCoordinates) {
        return;
      }
      const directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      directionsService.route(
        {
          origin: this.userMarkerLocation.position,
          destination: this.infoCoordinates,
          travelMode: travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            this.directionsRenderer.setDirections(response);
            const route = response.routes[0];
            console.log(route);
            

            //create array of coordiantes
            let routeCoordinates = [];
            // routeCoordinates.push({ lat : route.bounds.mb.hi, lng: route.bounds.Oa.hi})
            // routeCoordinates.push({ lat : route.bounds.mb.lo, lng: route.bounds.Oa.lo })
             routeCoordinates = route.overview_path.map(point => {
              return { lat: point.lat(), lng: point.lng() };
            });
            console.log(routeCoordinates)



            const leg = route.legs[0];
            // const overviewPolyline = route.overview_polyline;
            // const decodedCoordinates = polyline.decode(overviewPolyline);
            // const path = decodedCoordinates.map(coord => {
            //   return { lat: coord[0], lng: coord[1] };
            // });
            const routePath = new google.maps.Polyline({
              path: routeCoordinates,
              geodesic: true,
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            });

            // const routePath = new google.maps.Polyline(routeCoordinates , {color: 'red'}).addto(this.$refs.myMapRef.$map)
            // this.$refs.myMapRef.$map.fitBounds(polyline.getBounds());
        // Set the Polyline on the map
          routePath.setMap(this.$refs.myMapRef.$map);

            const durationText = leg.duration.text; // Estimated time
            const distanceText = leg.distance.text; // Estimated distance
            window.alert(`Estimated time: ${durationText}\nEstimated distance: ${distanceText}`);
          }
          else {
            window.alert("Directions request failed due to " + status);
          }
        }
      )

    },
    async created() {
      // Call the initMap function to initialize the map and services
      this.initMap();
    },
  },
};


</script>