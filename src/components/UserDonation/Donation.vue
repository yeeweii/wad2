<template>
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
  <section class = "bg-donate">
      <h2 class="text-pink-lighten-5 fw-bold text-center">Pharma-Save's Donation Application</h2>
      <div class='container-fluid'>
      <div class='row'>
          <div class='col-sm-12 col-lg-7'>
              <!--Address input-->
              <div class="mx-auto d-flex align-items-center justify-content-center text-center" style="flex-direction: column;">

                      <div class="card w-100 mt-5 ">
                          <div class="card-header project-name" id="header">
                              <h5 class="fw-bold">SEARCH NEAREST DISPENSARY</h5>
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
              <br />
              <div class="map-container" style="width: 100%; height: 300px;"> <!-- Adjust the height as needed -->
                  <GMapMap
                  :center="{lat: 1.3521, lng: 103.8198}"
                  :zoom="15"
                  map-type-id="terrain"
                  style="width: 100%; height: 500px"
                  ref="myMapRef"
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
                      <div class="px-3">
                        <h4 style="font-family: Arial, Helvetica, sans-serif;">{{selectedPlaceName}}</h4>
                        <p>{{selectedPlaceAddress}}</p>
                        <p><a :href="link">View on Google Maps</a></p>
                        <div class="justify-content-evenly">
                          <button class="btn btn-primary btn-sm" @click="getDirections('DRIVING')">Get Driving Directions</button>
                          <button class="btn btn-success btn-sm" @click="getDirections('WALKING')">Get Walking Directions</button>
                        </div>
                        <p>{{ distance }}</p>
                        <p> {{ time }}</p>
                      </div>
                  </GMapInfoWindow>
                  </GMapMap>
              </div>
              
          </div> <!-- col -->
          <div class='col-sm-12 col-lg-5 small-screen-padding'>
               <!--Alert if address not filled-->
              <div class = "mt-4 mx-5">
              <v-alert 
                  v-if = "AddressNotFilled" 
                  type="error"
                  text="Please fill up a valid address first!"
              >
              </v-alert>
              <v-alert 
                  v-else
                  type="success"
                  text="Please continue filling up this section!"
              >
              </v-alert>
              </div>


                  <!--Form-->
                  <div>
                      <form>
                  <v-container >
                      <v-autocomplete
                          v-model="institute"
                          :disabled="AddressNotFilled"
                          :items="dispensaries.map(dispensary => dispensary.name)"
                          label="Select Pharmacy"
                          :error-messages = "instituteError"
                          variant="solo-inverted"
                          class="mb-2"
                         
                      ></v-autocomplete>

                      <v-autocomplete 
                      v-model = "type"
                      :disabled="AddressNotFilled"
                      label="Type"
                      :error-messages = "typeError"
                      variant="solo-inverted"
                      class="mb-2"
                      > </v-autocomplete>

                      <v-autocomplete 
                      v-model = "category"
                      :disabled="AddressNotFilled"
                      label="Category"
                      :error-messages = "categoryError"
                      variant="solo-inverted"
                      class="mb-2"
                      > </v-autocomplete>

                      <v-text-field 
                      v-model = "quantity"
                      :disabled="AddressNotFilled"
                      label="Quantity"
                      :error-messages = "quantityError"
                      type="number"
                      variant="solo-inverted"
                      class="mb-2"
                      > </v-text-field>
                  </v-container>

                  <!-- CARD SECTION for image-->
                      <v-card 
                          class = "mx-auto"
                          max-width="500"
                      >
                          <v-card-title class = "text-center">
                              Upload image here
                          </v-card-title>
                          <v-card-text>
                              <v-container 
                              class = "image-upload-border">    
                              <img v-if="selectedImage" :src="selectedImage" class="displayImage" />               
                              </v-container>
                              <v-file-input 
                              
                                      :disabled="AddressNotFilled"
                                      v-model = "fileInput"
                                      label="Upload File"
                                      density="compact"
                                      prepend-icon="mdi-camera"
                                      class = "image-upload mx-auto mt-2"
                                      @change="fileUpload"
                                      ref="fileInput"
                                      :error-messages = "imageError"
                                      variant="solo-inverted"
                              >
                              </v-file-input>
                          </v-card-text>
                      </v-card>

                  <v-container class = "text-right">
                      <v-btn @click = "checkForm" class = mr-3 > submit </v-btn>
                      <v-btn @click = "clearForm" > Clear </v-btn>
                  </v-container>    

                  </form>
              </div> 
          </div> <!-- col -->
      </div> <!-- row -->
  </div> <!-- container -->
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
    distance: "",
    time: "",

    institute: '',
    type: '',
    category: '',
    quantity: '',
    location: '',
    // Error message
    instituteError: '',
    locationError: '',
    typeError: '',
    categoryError: '',
    quantityError: '',
    imageError: '',

    // Image upload 
    selectedImage: null,
    fileInput: '',

  }
},
  methods: {
      checkForm() {
      // Reset error messages
      this.instituteError = '';
      this.locationError = '';
      this.typeError = '';
      this.categoryError = '';
      this.quantityError = '';

      if (!this.institute) {
          this.instituteError = 'Please select an institution';
      }
      if (!this.location) {
          this.locationError = 'Please select a location (you must first select a institution first)';
      }
      if (!this.type) {
          this.typeError = 'Please select a type';
      }
      if (!this.category) {
          this.categoryError = 'Please select a category';
      }
      if (!this.quantity) {
          this.quantityError = 'Please select a quantity';
      }
      if (!this.fileInput) {
          this.imageError = 'Please upload an image';
      }
          
      },

      clearForm() {
      this.institute = '';
      this.location = '';
      this.type = '';
      this.category = '';
      this.quantity = '';
      this.locationSearch = '';

      // Reset the Errors as well
      this.instituteError = '';
      this.locationError = '';
      this.typeError = '';
      this.categoryError = '';
      this.quantityError = '';
      this.imageError = '';

      // reset image
      this.selectedImage = '';
      this.fileInput = '';
      },

      // file upload function
      fileUpload() {
      const fileInput = this.$refs.fileInput;

      if (fileInput && fileInput.files.length > 0) {
          const file = fileInput.files[0];

          if (file) {
            const reader = new FileReader();

        reader.onload = (image) => {
            this.selectedImage = image.target.result;
        };

            reader.readAsDataURL(file);
            } 
          else {
            this.selectedImage = '';
          }
      }
      else{
        this.selectedImage = '';
      }
      },


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

            //get link
            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
            this.link = googleMapsLink
          }
        });
      });
    },
    openMarker(id) {
      this.distance = "";
      this.time = "";
      this.infowindowMarkerId = id;
    },
    getDirections(travelMode) {
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
            this.time = `Estimated travel time: ${durationText}`;
            this.distance = `Estimated travel distance: ${distanceText}`
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
  computed: {
    AddressNotFilled(){
      if (this.locationSearch ===''){
        return true;
      }
      return this.dispensaries.length <= 0;
    },
  }
};
// TO DO:
// REMOVE IMAGE WHEN i press cancel on upload File
// remove access to pdf files


</script>

<style scoped>
 .small-screen-padding {
  margin-top: 200px; /* Adjust the margin as needed for small screens */
}

@media (min-width: 991px) {
  .small-screen-padding {
    margin-top: 0; /* Remove the margin for screens larger than sm */
  }
}
</style>